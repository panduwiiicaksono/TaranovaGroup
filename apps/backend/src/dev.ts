import { serve } from "@hono/node-server";
import { app } from "./index.ts";
const port = Number(process.env.PORT ?? 4000);
serve({ fetch: app.fetch, port });
console.log(`API http://localhost:${port}/api/health`);
