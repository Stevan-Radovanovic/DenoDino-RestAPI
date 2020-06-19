import { Router } from "https://deno.land/x/oak/mod.ts";
import { Dinosaur } from "./dinosaur.ts";

const router = new Router();

let dinos: Dinosaur[] = [];

router.get("/dinosaurs", (ctx) => {
  ctx.response.body = { dinoArray: dinos };
});

router.post("/dinosaurs", async (ctx) => {
  const data = await ctx.request.body();
  dinos.push(
    {
      id: new Date().toISOString(),
      name: data.value.name,
      species: data.value.species,
    },
  );
  ctx.response.body = { message: "Added new Dino" };
});

router.put("/dinosaurs/:dinoId", async (ctx) => {
  const data = await ctx.request.body();
  const did = ctx.params.dinoId;
  const index = dinos.findIndex((dino) => {
    dino.id === did;
  });
  dinos[index] = {
    id: dinos[index].id,
    species: dinos[index].species,
    name: data.value.name,
  };
  ctx.response.body = { message: "Updated a Dino" };
});

router.delete("/dinosaurs/:dinoId", async (ctx) => {
  const did = ctx.params.dinoId;
  dinos = dinos.filter((dino) => {
    dino.id !== did;
  });
  ctx.response.body = { message: "Deleted a Dino" };
});

export default router;
