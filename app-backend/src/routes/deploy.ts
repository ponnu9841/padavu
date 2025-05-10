import { execFile, spawn } from "child_process";
import { Router } from "express";
import path from "path";

const router = Router();

router.get("/", async (req, res, next) => {
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

      // Tell client to expect SSE
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      });

      // Spawn the script
      const deploy = spawn(scriptPath, { env: envVars });

      // Helper to send SSE
      function sendEvent(data: string) {
        // SSE format: `data: <message>\n\n`
        res.write(`data: ${data.replace(/\n/g, "\ndata: ")}\n\n`);
      }

      // execFile(scriptPath, { env: envVars }, (error, stdout, stderr) => {
      //    if (error) {
      //       console.error("❌ Deployment failed:", stderr);
      //       return res.status(500).json({ error: stderr });
      //    }

      //    console.log("✅ Deployment output:\n", stdout);
      //    return res.status(200).json({
      //       message: "Deployment successful",
      //       output: stdout,
      //    });
      // });

       deploy.stdout.on("data", (chunk: Buffer) => {
        sendEvent(chunk.toString());
      });

      deploy.stderr.on("data", (chunk: Buffer) => {
        sendEvent(`ERROR: ${chunk.toString()}`);
      });

      deploy.on("close", (code: number) => {
        sendEvent(`Script exited with code ${code}`);
        // close the SSE stream
        res.write("event: end\ndata: Deploy complete\n\n");
        res.end();
      });

      deploy.on("error", (err) => {
        sendEvent(`Spawn error: ${err.message}`);
        res.end();
      });


   } catch (error) {
    console.log(error)
    next(error)
   }
});

export default router;
