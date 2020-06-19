import { Application } from "https://deno.land/x/oak/mod.ts";

let message = "Testing Deno...";
console.log(message);

let textForFile = "This text should be stored in a file using Deno Runtime API";
let encoder = new TextEncoder();
let data = encoder.encode(textForFile);

let result = await Deno.writeFile("file.txt", data);
console.log("File has been made!");

console.log("Now onto starting a server...");
console.log("Starting server...");

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Deno Server Started!";
});

await app.listen({ port: 8000 });
