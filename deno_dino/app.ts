import { Application } from "https://deno.land/x/oak/mod.ts";

import dino_routes from "./routes/routes_dinosaur.ts";
import { connect } from "./database.ts";

const app = new Application();
connect();

app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE",
  );
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  await next();
});

app.use(dino_routes.routes());
app.use(dino_routes.allowedMethods());

console.log("Deno-Dino starting");
await app.listen({ port: 3000 });
