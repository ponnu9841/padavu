import { Router } from "express";
import { authenticateJWT } from "../utils/auth-middleware";
import prisma from "../utils/prisma";
import { deleteRecord } from "../utils/delete-request";
import { errorHandler } from "../utils/error-handler";
import { createRecord } from "../utils/create-record";
import { updateRecord } from "../utils/update-request";
import {
  createPaginatedResponse,
  getPaginationParams,
} from "../utils/pagination";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { skip, take } = getPaginationParams(req);
    const page = parseInt(req.query.page as string) || 1;
    const limit = take;

    const vlogs = await prisma.vlog.findMany({
      skip,
      take,
      orderBy: { createdAt: "desc" },
    });
    // Get total count for pagination metadata
    const totalCount = await prisma.blog.count();
    res
      .status(200)
      .json(createPaginatedResponse(vlogs, totalCount, page, limit));
  } catch (error) {
    errorHandler(error as Error, req, res);
  }
});

router.post("/", authenticateJWT, async (req, res, next) => {
  const reqParams = ["url"];
  await createRecord(req, res, next, "vlog", reqParams);
});

router.put("/", authenticateJWT, async (req, res, next) => {
  const reqParams = ["url"];
  await updateRecord(req, res, next, "vlog", reqParams);
});

router.delete("/", authenticateJWT, async (req, res, next) => {
  deleteRecord(req, res, next, "vlog", false);
});

export default router;
