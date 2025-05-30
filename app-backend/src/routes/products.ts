import { Router } from "express";
import { authenticateJWT } from "../utils/auth-middleware";
import { upload } from "../utils/upload";
import { deleteFileFromUrl, extractFilePath } from "../utils/file";
import prisma from "../utils/prisma";
import { deleteRecord } from "../utils/delete-request";
import { errorHandler } from "../utils/error-handler";

const columns = {
   id: true,
   image: true,
   title: true,
   alt: true,
   description: true,
};

const router = Router();
const uploadMiddleware = upload("products");

router.get("/", async (req, res, next) => {
   try {
      const data = await prisma.product.findMany({
         orderBy: { createdAt: "desc" },
         select: columns,
      });
      res.status(200).json({
         data,
      });
   } catch (error) {
      errorHandler(error as Error, req, res);
      next(error);
   }
});

router.get("/:id", async (req, res, next) => {
   try {
      const data = await prisma.product.findUnique({
         where: { id: req.params.id },
         select: columns,
      });
      res.status(200).json({
         data,
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
            image: filePath || "",
            title: data.title,
            alt: data.alt || "",
            description: data.description,
         };
         const testimonial = await prisma.product.create({
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
            title: data.title,
            alt: data.alt || "",
            description: data.description,
         };
         if (req.file) {
            reqBody["image"] = extractFilePath(req.file);
            deleteFileFromUrl(data.existingImage);
         }

         const testimonial = await prisma.product.update({
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
   deleteRecord(req, res, next, "product", false);
});

export default router;
