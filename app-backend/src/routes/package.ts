import { Router } from "express";
import { authenticateJWT } from "../utils/auth-middleware";
import { upload } from "../utils/upload";
import { deleteFileFromUrl, extractFilePath } from "../utils/file";
import prisma from "../utils/prisma";
import { deleteRecord } from "../utils/delete-request";
import { errorHandler } from "../utils/error-handler";
import { validatePackagePostRequest } from "../validation";
import validationErrorHandler from "../utils/validation-error-handler";

const router = Router();
const uploadMiddleware = upload("package");

router.get("/", async (req, res, next) => {
   try {
      const banner = await prisma.package.findMany({
         orderBy: { createdAt: "desc" },
         select: {
            id: true,
            image: true,
            alt: true,
            title: true,
            description: true,
            long_description: true,
            price: true,
         },
      });

      res.status(200).json({
         data: banner,
      });
   } catch (error) {
      errorHandler(error as Error, req, res);
      next(error);
   }
});

router.post(
   "/",
   authenticateJWT,
   uploadMiddleware.single("image"),
   async (req, res, next) => {
      const data = req.body;
      try {
         if (req.file) {
            const filePath = extractFilePath(req.file);
            const reqBody = {
               image: filePath,
               alt: data.imageAlt,
               title: data.title,
               description: data.description,
               long_description: data.longDescription,
               price: data.price,
            };
            const response = validatePackagePostRequest(reqBody);
            validationErrorHandler(response, res);
            const createdPackage = await prisma.package.create({
               data: reqBody,
            });
            res.status(200).json({ data: createdPackage });
         }
      } catch (error) {
         errorHandler(error as Error, req, res);
         next(error);
      }
   }
);

router.put(
   "/",
   authenticateJWT,
   uploadMiddleware.single("image"),
   async (req, res, next) => {
      try {
         const data = req.body;

         const reqBody: ReqBody = {
            title: data.title,
            alt: data.imageAlt,
            description: data.description,
            long_description: data.longDescription,
            price: data.price,
         };

         if (req.file) {
            //update without saving image
            reqBody["image"] = extractFilePath(req.file);
            deleteFileFromUrl(data.existingImage);
         }

         // console.log(validated.value);
         const updatedPackage = await prisma.package.update({
            where: { id: data.id },
            data: reqBody,
         });
         res.status(200).json({ data: updatedPackage });
      } catch (error) {
         errorHandler(error as Error, req, res);
         next(error);
      }
   }
);

router.delete("/", authenticateJWT, async (req, res, next) => {
   deleteRecord(req, res, next, "package");
});

export default router;
