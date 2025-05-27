import { Router } from "express";
import { authenticateJWT } from "../utils/auth-middleware";
import { upload } from "../utils/upload";
import { deleteFileFromUrl, extractFilePath } from "../utils/file";
import prisma from "../utils/prisma";
// import {
//    validateServicePostRequest,
//    validateServicePutRequest,
// } from "../validation/service";
import { deleteRecord } from "../utils/delete-request";
import { errorHandler } from "../utils/error-handler";
import {
   createPaginatedResponse,
   getPaginationParams,
} from "../utils/pagination";

const router = Router();
const uploadMiddleware = upload("work");

router.get("/", async (req, res, next) => {
   try {
      const { skip, take } = getPaginationParams(req);
      const page = parseInt(req.query.page as string) || 1;
      const limit = take;

      const gallery = await prisma.work.findMany({
         skip,
         take,
         orderBy: { createdAt: "desc" },
         select: {
            id: true,
            image: true,
            alt: true,
            title: true,
            description: true,
         },
      });
      const totalCount = await prisma.work.count();
      res.status(200).json(
         createPaginatedResponse(gallery, totalCount, page, limit)
      );
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
         if (!req.file) {
            res.status(400).json({ error: "No file to upload" });
            return;
         }
         const filePath = req.file && extractFilePath(req.file);
         const data = req.body;
         const reqBody = {
            image: filePath,
            alt: data.alt,
            title: data.title,
            description: data.description,
         };
         const gallery = await prisma.work.create({
            data: reqBody,
         });

         res.status(200).json({ data: gallery });
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
            title: data.title || "",
            description: data.description,
         };

         if (req.file) {
            //update without saving image
            reqBody["image"] = extractFilePath(req.file);
            deleteFileFromUrl(data.existingImage);
         }

         // console.log(validated.value);
         const gallery = await prisma.work.update({
            where: { id: data.id },
            data: reqBody,
         });
         res.status(200).json({ data: gallery });
      } catch (error) {
         errorHandler(error as Error, req, res);
         next(error);
      }
   }
);

router.delete("/", authenticateJWT, async (req, res, next) => {
   deleteRecord(req, res, next, "work", false);
});

export default router;
