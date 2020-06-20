import { Router } from "https://deno.land/x/oak/mod.ts";
import { Dinosaur } from "./dinosaur.ts";
import { getDb } from "./database.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

const router = new Router();

let dinos: Dinosaur[] = [];

router.get("/dinosaurs", async (ctx) => {
  const dinosaurs = await getDb().collection("dinosaurs").find();
  const mappedDinosaurs = dinosaurs.map(
    (dino: { _id: ObjectId; name: string; species: string }) => {
      return { id: dino._id.$oid, name: dino.name, species: dino.species };
    },
  );
  ctx.response.body = { dinoArray: mappedDinosaurs };
});

router.post("/dinosaurs", async (ctx) => {
  const data = await ctx.request.body();
  const dino = {
    name: data.value.name,
    species: data.value.species,
  };
  await getDb().collection("dinosaurs").insertOne(dino);
  ctx.response.body = { message: `Added new Dino ${dino.name}` };
});

router.put("/dinosaurs/:dinoId", async (ctx) => {
  const data = await ctx.request.body();
  const did = ctx.params.dinoId!;
  await getDb().collection("dinosaurs").updateOne(
    { _id: ObjectId(did) },
    { $set: { name: data.value.name } },
  );
  ctx.response.body = { message: "Updated a Dino's name!" };
});

router.delete("/dinosaurs/:dinoId", async (ctx) => {
  const did = ctx.params.dinoId!;
  await getDb().collection("dinosaurs").deleteOne(
    { _id: ObjectId(did) },
  );
  ctx.response.body = { message: "Deleted a Dino" };
});

export default router;
