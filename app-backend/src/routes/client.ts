import { Router } from "express";
import { authenticateJWT } from "../utils/auth-middleware";
import { upload } from "../utils/upload";
import { deleteFileFromUrl, extractFilePath } from "../utils/file";
import prisma from "../utils/prisma";
import { deleteRecord } from "../utils/delete-request";
import { errorHandler } from "../utils/error-handler";
import {
   createPaginatedResponse,
   getPaginationParams,
} from "../utils/pagination";

const router = Router();
const uploadMiddleware = upload("client");

router.get("/", async (req, res, next) => {
   try {
      const { skip, take } = getPaginationParams(req);
      const page = parseInt(req.query.page as string) || 1;
      const limit = take;

      const clients = await prisma.client.findMany({
         skip,
         take,
         orderBy: { createdAt: "desc" },
         select: {
            id: true,
            image: true,
            alt: true,
         },
      });
      const totalCount = await prisma.client.count();
      res.status(200).json(
         createPaginatedResponse(clients, totalCount, page, limit)
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
      const data = req.body;
      try {
         if (req.file) {
            const filePath = extractFilePath(req.file);
            const reqBody = {
               image: filePath,
               alt: data.alt,
            };
            const partner = await prisma.client.create({
               data: reqBody,
            });
            res.status(200).json({ data: partner });
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
         const reqBody: { [key: string]: any } = {
            alt: data.alt || "",
         };

         if (req.file) {
            //update without saving image
            reqBody["image"] = extractFilePath(req.file);
            const partner = await prisma.client.findUnique({
               where: { id: data.id },
            });
            deleteFileFromUrl(partner?.image as string);
         }

         // console.log(validated.value);
         const partner = await prisma.client.update({
            where: { id: data.id },
            data: reqBody,
         });
         res.status(200).json({ data: partner });
      } catch (error) {
         errorHandler(error as Error, req, res);
         next(error);
      }
   }
);

router.delete("/", authenticateJWT, async (req, res, next) => {
   deleteRecord(req, res, next, "client");
});

export default router;
