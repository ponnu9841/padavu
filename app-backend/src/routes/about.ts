import { Router } from "express";
import { authenticateJWT } from "../utils/auth-middleware";
import { upload } from "../utils/upload";
import { deleteFileFromUrl, extractFilePath } from "../utils/file";
import prisma from "../utils/prisma";
import { deleteRecord } from "../utils/delete-request";
import { errorHandler } from "../utils/error-handler";

const router = Router();
const uploadMiddleware = upload("about");

router.get("/", async (req, res, next) => {
   try {
      const banner = await prisma.about.findFirst({
         orderBy: { createdAt: "desc" },
         select: {
            id: true,
            image: true,
            alt: true,
            short_description: true,
            long_description: true,
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
               alt: data.alt,
               short_description: data.shortDescription,
               long_description: data.longDescription,
            };
            const banner = await prisma.about.create({
               data: reqBody,
            });
            res.status(200).json({ data: banner });
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
            alt: data.alt,
            short_description: data.shortDescription,
            long_description: data.longDescription,
         };

         if (req.file) {
            reqBody["image"] = extractFilePath(req.file);
            deleteFileFromUrl(data.existingImage);
         }

         // console.log(validated.value);
         const service = await prisma.about.update({
            where: { id: data.id },
            data: reqBody,
         });
         res.status(200).json({ data: service });
      } catch (error) {
         errorHandler(error as Error, req, res);
         next(error);
      }
   }
);

router.delete("/", authenticateJWT, async (req, res, next) => {
   deleteRecord(req, res, next, "about");
});

export default router;
