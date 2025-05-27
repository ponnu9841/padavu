import { Router } from "express";
import { authenticateJWT } from "../utils/auth-middleware";
import { upload } from "../utils/upload";
import { deleteFileFromUrl, extractFilePath } from "../utils/file";
import prisma from "../utils/prisma";
import { deleteRecord } from "../utils/delete-request";
import { errorHandler } from "../utils/error-handler";
import { updateRecord } from "../utils/update-request";

const router = Router();
const uploadMiddleware = upload("banner");

router.get("/", async (req, res, next) => {
   try {
      const banner = await prisma.banner.findMany({
         orderBy: { createdAt: "desc" },
         select: {
            id: true,
            image: true,
            alt: true,
            title: true,
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
               title: data.title,
               description: data.description,
            };
            const banner = await prisma.banner.create({
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

// router.put(
//    "/",
//    authenticateJWT,
//    uploadMiddleware.single("image"),
//    async (req, res, next) => {
//       try {
//          const data = req.body;
//          const reqBody: ReqBody = {
//             alt: data.alt,
//             title: data.title,
//             description: data.description,
//          };

//          if (req.file) {
//             reqBody["image"] = extractFilePath(req.file);
//             deleteFileFromUrl(data.existingImage);
//          }

//          // console.log(validated.value);
//          const service = await prisma.banner.update({
//             where: { id: data.id },
//             data: reqBody,
//          });
//          res.status(200).json({ data: service });
//       } catch (error) {
//          errorHandler(error as Error, req, res);
//          next(error);
//       }
//    }
// );

router.put(
   "/",
   authenticateJWT,
   uploadMiddleware.single("image"),
   async (req, res, next) => {
      const reqParams = ["alt", "title", "description"];
      await updateRecord(req, res, next, "banner", reqParams);
   }
);

router.delete("/", authenticateJWT, async (req, res, next) => {
   deleteRecord(req, res, next, "banner");
});

export default router;
