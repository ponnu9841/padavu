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
import Experts from "./routes/experts";
import Products from "./routes/products";
import Blogs from "./routes/blogs";
import About from "./routes/about";
import Mission from "./routes/mission";
import Vision from "./routes/vision";
import PagesBanner from "./routes/pages-banner";
import Seo from "./routes/seo";
import Contact from "./routes/contact";
import Vlog from "./routes/vlog"

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 8000;
const allowedOrgins = process.env.ALLOWED_ORIGINS?.split(",") || [];
app.use(
   cors({
      origin: function (origin, callback) {
         const allowedOrigins = allowedOrgins;
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

// Middleware to parse URL-encoded bodies
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

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
app.use("/api/experts", Experts);
app.use("/api/products", Products);
app.use("/api/blogs", Blogs);
app.use("/api/about", About);
app.use("/api/mission", Mission);
app.use("/api/vision", Vision);
app.use("/api/pagesBanner", PagesBanner);
app.use("/api/seoTags", Seo);
app.use("/api/contact", Contact);
app.use("/api/vlog", Vlog);

app.listen(PORT, () =>
   console.log(`🚀 Server is running at http://localhost:${PORT}`)
);

module.exports = app;
