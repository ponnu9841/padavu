"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const deploy_1 = __importDefault(require("./routes/deploy"));
const app = (0, express_1.default)();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8000;
app.use(body_parser_1.default.json());
// app.use(
//    cors({
//       origin: function (origin, callback) {
//          const allowedOrigins = [
//             "http://localhost:3000",
//          ];
//          if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//             callback(null, true);
//          } else {
//             callback(new Error("Not allowed by CORS"));
//          }
//       },
//       methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//       allowedHeaders: [
//          "Content-Type",
//          "Authorization",
//          "X-Requested-With",
//          "Accept",
//       ],
//       credentials: true,
//    })
// );
// app.options("*", cors());
// Middleware to parse JSON bodies
// app.use(express.static("public"));
app.use(express_1.default.json());
// Middleware to parse URL-encoded bodies
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/health", (req, res) => {
    res.send("Hello World!");
});
app.use("/deploy", deploy_1.default);
app.listen(PORT, () => console.log(`🚀 Server is running at http://localhost:${PORT}`));
module.exports = app;
