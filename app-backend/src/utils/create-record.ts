import { NextFunction, Request, Response } from "express";
import { extractFilePath } from "./file";
import prisma from "./prisma";

interface ReqBody {
   [key: string]: any;
}

export const createRecord = async (
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

      // Handle image if enabled
      if (includeImage && req.file) {
         reqBody["image"] = extractFilePath(req.file);
      }

      const created = await (prisma[modelName] as any).create({
         data: reqBody,
      });

      res.status(200).json({ data: created });
   } catch (error) {
      console.error("Error creating record:", error);
      res.status(500).json({ message: "Failed to create record" });
      next(error);
   }
};
