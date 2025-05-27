import { Router } from "express";
import { authenticateJWT } from "../utils/auth-middleware";
import { upload } from "../utils/upload";
import { deleteFileFromUrl, extractFilePath } from "../utils/file";
import prisma from "../utils/prisma";
import { deleteRecord } from "../utils/delete-request";
import { errorHandler } from "../utils/error-handler";

const router = Router();
const uploadMiddleware = upload("experts");

router.get("/", async (req, res, next) => {
   try {
      const testimonials = await prisma.experts.findMany({
         orderBy: { createdAt: "desc" },
         select: {
            id: true,
            title: true,
            image: true,
            alt: true,
            description: true,
         },
      });
      res.status(200).json({
         data: testimonials,
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
      try {
         const filePath = req.file && extractFilePath(req.file);
         const data = req.body;
         const reqBody = {
            image: filePath,
            alt: data.alt || "",
            title: data.title,
            description: data.description || "",
         };
         const experts = await prisma.experts.create({
            data: reqBody,
         });

         res.status(200).json({ data: experts });
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
            alt: data.alt || "",
            title: data.title,
            description: data.description || "",
         };
         if (req.file) {
            reqBody["image"] = extractFilePath(req.file);
            deleteFileFromUrl(data.existingImage);
         }

         const experts = await prisma.experts.update({
            where: { id: data.id },
            data: reqBody,
         });
         res.status(200).json({ data: experts });
      } catch (error) {
         errorHandler(error as Error, req, res);
         next(error);
      }
   }
);

router.delete("/", authenticateJWT, async (req, res, next) => {
   deleteRecord(req, res, next, "experts", false);
});

export default router;
