import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Deploy from "./routes/deploy";
import User from "./routes/user";
import Banner from "./routes/banner";
import Package from "./routes/package";
import Client from "./routes/client";
import Work from "./routes/work";
import Testimonial from "./routes/testimonial";

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 8000;
app.use(
   cors({
      origin: function (origin, callback) {
         const allowedOrigins = ["http://localhost:3000"];
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

// Middleware to parse JSON bodies
app.use(express.static("public"));
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
   res.send("Hello World!");
});

app.use("/api/deploy", Deploy);
app.use("/api/user", User);
app.use("/api/banners", Banner);
app.use("/api/packages", Package);
app.use("/api/clients", Client);
app.use("/api/works", Work);
app.use("/api/testimonials", Testimonial);

app.listen(PORT, () =>
   console.log(`🚀 Server is running at http://localhost:${PORT}`)
);

module.exports = app;
