"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.post("/", async (req, res, next) => {
    try {
        const projectPath = process.env.PROJECT_PATH;
        const appName = process.env.APP_NAME;
        if (!projectPath || !appName) {
            return res
                .status(400)
                .json({ error: "Missing projectPath or appName" });
        }
        const scriptPath = path_1.default.join(__dirname, "../../", "deploy.sh");
        const envVars = Object.assign(Object.assign({}, process.env), { PROJECT_PATH: projectPath, APP_NAME: appName });
        (0, child_process_1.execFile)(scriptPath, { env: envVars }, (error, stdout, stderr) => {
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
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.default = router;
