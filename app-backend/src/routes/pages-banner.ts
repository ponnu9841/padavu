import { Router } from "express";
import { authenticateJWT } from "../utils/auth-middleware";
import { upload } from "../utils/upload";
import { deleteFileFromUrl, extractFilePath } from "../utils/file";
import prisma from "../utils/prisma";
import { deleteRecord } from "../utils/delete-request";
import { errorHandler } from "../utils/error-handler";

const router = Router();
const uploadMiddleware = upload("pagesBanner");

router.get("/", async (req, res, next) => {
   try {
      const teams = await prisma.pagesBanner.findMany({
         select: {
            id: true,
            image: true,
            alt: true,
            title: true,
            page: true,
         },
      });
      res.status(200).json({ data: teams });
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
         if (!req.file) {
            res.status(400).json({ error: "No file to upload" });
            return;
         }
         const filePath = extractFilePath(req.file);
         const reqBody = {
            image: filePath,
            alt: data.alt,
            title: data.title,
            page: data.page,
         };
         const partner = await prisma.pagesBanner.create({
            data: reqBody,
         });
         res.status(200).json({ data: partner });
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
         const reqBody: { [key: string]: any } = {
            alt: data.alt || "",
            title: data.title || "",
            page: data.page,
         };

         if (req.file) {
            //update without saving image
            reqBody["image"] = extractFilePath(req.file);
            const pagesBanner = await prisma.pagesBanner.findUnique({
               where: { id: data.id },
            });
            deleteFileFromUrl(pagesBanner?.image as string);
         }

         // console.log(validated.value);
         const pagesBanner = await prisma.pagesBanner.update({
            where: { id: data.id },
            data: reqBody,
         });
         res.status(200).json({ data: pagesBanner });
      } catch (error) {
         errorHandler(error as Error, req, res);
         next(error);
      }
   }
);

router.delete("/", authenticateJWT, async (req, res, next) => {
   deleteRecord(req, res, next, "pagesBanner");
});

export default router;
