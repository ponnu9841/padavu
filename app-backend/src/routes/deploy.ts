import { execFile } from "child_process";
import { Router } from "express";
import path from "path";

const router = Router();

router.post("/", async (req, res, next) => {
   try {
      const projectPath = process.env.PROJECT_PATH;
      const appName = process.env.APP_NAME;

      if (!projectPath || !appName) {
         return res
            .status(400)
            .json({ error: "Missing projectPath or appName" });
      }

      const scriptPath = path.join(__dirname, "../../../../deploy.sh");

      const envVars = {
         ...process.env,
         PROJECT_PATH: projectPath,
         APP_NAME: appName,
      };

      execFile(scriptPath, { env: envVars }, (error, stdout, stderr) => {
         if (error) {
            console.error("❌ Deployment failed:", stderr);
            return res.status(500).json({ error: stderr });
         }

         console.log("✅ Deployment output:\n", stdout);
         return res.status(200).json({
            message: "Deployment successful",
            output: stdout,
         });
      });
   } catch (error) {
    console.log(error)
    next(error)
   }
});

export default router;
