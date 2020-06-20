import { getDb } from "../database.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

export const getDinosaurs = async (ctx: any) => {
  const dinosaurs = await getDb().collection("dinosaurs").find();
  const mappedDinosaurs = dinosaurs.map(
    (dino: { _id: ObjectId; name: string; species: string }) => {
      return { id: dino._id.$oid, name: dino.name, species: dino.species };
    },
  );
  ctx.response.body = { dinoArray: mappedDinosaurs };
};

export const postDinosaur = async (ctx: any) => {
  const data = await ctx.request.body();
  const dino = {
    name: data.value.name,
    species: data.value.species,
  };
  await getDb().collection("dinosaurs").insertOne(dino);
  ctx.response.body = { message: `Added new Dino ${dino.name}` };
};

export const updateDinosaur = async (ctx: any) => {
  const data = await ctx.request.body();
  const did = ctx.params.dinoId!;
  await getDb().collection("dinosaurs").updateOne(
    { _id: ObjectId(did) },
    { $set: { name: data.value.name } },
  );
  ctx.response.body = { message: "Updated a Dino's name!" };
};

export const deleteDinosaur = async (ctx: any) => {
  const did = ctx.params.dinoId!;
  await getDb().collection("dinosaurs").deleteOne(
    { _id: ObjectId(did) },
  );
  ctx.response.body = { message: "Deleted a Dino" };
};
