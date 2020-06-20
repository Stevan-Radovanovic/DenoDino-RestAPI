import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getDinosaurs,
  deleteDinosaur,
  postDinosaur,
  updateDinosaur,
} from "../controllers/controller_dinosaur.ts";

const router = new Router();

router.get("/dinosaurs", getDinosaurs);
router.post("/dinosaurs", postDinosaur);
router.put("/dinosaurs/:dinoId", updateDinosaur);
router.delete("/dinosaurs/:dinoId", deleteDinosaur);

export default router;
