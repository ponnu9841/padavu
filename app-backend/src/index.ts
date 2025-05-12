import express, { Request, Response, type Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Deploy from "./routes/deploy"
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT ?? 8000;
app.use(bodyParser.json());
app.use(
   cors({
      origin: function (origin, callback) {
         const allowedOrigins = [
            "http://localhost:3000",
         ];
         if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
         } else {
            callback(new Error("Not allowed by CORS"));
         }
      },
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: [
         "Content-Type",
         "Authorization",
         "X-Requested-With",
         "Accept",
      ],
      credentials: true,
   })
);
app.options("*", cors());

// Middleware to parse JSON bodies
app.use(express.static("public"));
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
   res.send("Hello World!");
});

app.use("/deploy", Deploy)

app.listen(PORT, () => console.log(`🚀 Server is running at http://localhost:${PORT}`));

module.exports = app;
