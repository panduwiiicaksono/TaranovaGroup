/// <reference types="node" />
import { Hono } from "hono";
import { cors } from "hono/cors";
import { adminContent, publicContent } from "./routes/content.ts";
import { adminEnquiry, publicEnquiry } from "./routes/enquiry.ts";
import { upload } from "./routes/upload.ts";

export const app = new Hono().basePath("/api");

app.use("*", cors({
  origin: (process.env.CORS_ORIGINS ?? "http://localhost:3000")
    .split(",")
    .map((o) => o.trim().replace(/\/+$/, ""))
    .filter(Boolean),
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}));

app.get("/health", (c) => c.json({ ok: true }));
app.route("/content", publicContent);
app.route("/enquiry", publicEnquiry);
app.route("/admin/content", adminContent);
app.route("/admin/enquiries", adminEnquiry);
app.route("/admin/upload", upload);
app.onError((e, c) => { console.error(e); return c.json({ error: "server error" }, 500); });

export default app;
