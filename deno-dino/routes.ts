import { Router } from "https://deno.land/x/oak/mod.ts";
import { Dinosaur } from "./dinosaur.ts";

const router = new Router();

let dinos: Dinosaur[] = [];

router.get("/dinosaurs", (ctx) => {});

router.post("/dinosaurs", (ctx) => {});

router.post("/dinosaurs/:dinoId", (ctx) => {});

router.post("/dinosaurs/:dinoId", (ctx) => {});

export default router;
