import { Router } from "express";
import { authenticateJWT } from "../utils/auth-middleware";
import { upload } from "../utils/upload";
import { deleteFileFromUrl, extractFilePath } from "../utils/file";
import prisma from "../utils/prisma";
import { deleteRecord } from "../utils/delete-request";
import { errorHandler } from "../utils/error-handler";

const router = Router();
const uploadMiddleware = upload("vision");

router.get("/", async (req, res, next) => {
   try {
      const banner = await prisma.vision.findFirst({
         orderBy: { createdAt: "desc" },
         select: {
            id: true,
            image: true,
            alt: true,
            description: true,
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
               description: data.description,
            };
            const banner = await prisma.vision.create({
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
            description: data.description,
         };

         if (req.file) {
            reqBody["image"] = extractFilePath(req.file);
            deleteFileFromUrl(data.existingImage);
         }

         // console.log(validated.value);
         const service = await prisma.vision.update({
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
   deleteRecord(req, res, next, "vision");
});

export default router;
