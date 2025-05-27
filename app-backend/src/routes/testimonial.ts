import { Router } from "express";
import { authenticateJWT } from "../utils/auth-middleware";
import { upload } from "../utils/upload";
import { deleteFileFromUrl, extractFilePath } from "../utils/file";
import prisma from "../utils/prisma";
import { deleteRecord } from "../utils/delete-request";
import { errorHandler } from "../utils/error-handler";

const router = Router();
const uploadMiddleware = upload("testimonial");

router.get("/", async (req, res, next) => {
   try {
      const testimonials = await prisma.testimonial.findMany({
         orderBy: { createdAt: "desc" },
         select: {
            id: true,
            name: true,
            image: true,
            alt: true,
            designation: true,
            testimonial: true,
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
         const reqBody: {
            name: string;
            alt: string;
            designation: string;
            testimonial: string;
            image?: string;
         } = {
            name: data.name,
            alt: data.alt || "",
            designation: data.designation || "",
            testimonial: data.testimonial,
            image: filePath || "",
         };
         const testimonial = await prisma.testimonial.create({
            data: reqBody,
         });

         res.status(200).json({ data: testimonial });
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
            name: data.name,
            alt: data.alt || "",
            designation: data.designation || "",
            testimonial: data.testimonial,
         };
         if (req.file) {
            reqBody["image"] = extractFilePath(req.file);
            deleteFileFromUrl(data.existingImage);
         }

         const testimonial = await prisma.testimonial.update({
            where: { id: data.id },
            data: reqBody,
         });
         res.status(200).json({ data: testimonial });
      } catch (error) {
         errorHandler(error as Error, req, res);
         next(error);
      }
   }
);

router.delete("/", authenticateJWT, async (req, res, next) => {
   deleteRecord(req, res, next, "testimonial", false);
});

export default router;
