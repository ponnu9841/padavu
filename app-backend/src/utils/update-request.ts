import { NextFunction, Request, Response } from "express";
import { deleteFileFromUrl, extractFilePath } from "./file";
import prisma from "./prisma";

interface ReqBody {
   [key: string]: any;
}

export const updateRecord = async (
   req: Request,
   res: Response,
   next: NextFunction,
   modelName: keyof typeof prisma,
   fields: string[] = [],
   includeImage = true
) => {
   try {
      const data = req.body;
      const reqBody: ReqBody = {};

      // Include selected fields only
      for (const field of fields) {
         if (data[field] !== undefined) {
            reqBody[field] = data[field];
         }
      }

      // Handle image update if enabled
      if (includeImage && req.file) {
         reqBody["image"] = extractFilePath(req.file);
         if (data.existingImage) deleteFileFromUrl(data.existingImage);
      }

      const updated = await (prisma[modelName] as any).update({
         where: { id: data.id },
         data: reqBody,
      });

      res.status(200).json({ data: updated });
   } catch (error) {
      console.error("Error updating record:", error);
      res.status(500).json({ message: "Failed to update record" });
      next(error);
   }
};
