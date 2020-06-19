let message = "Testing Deno...";
console.log(message);

import { serve } from "https://deno.land/std/http/server.ts";

let textForFile = "This text should be stored in a file using Deno Runtime API";
let encoder = new TextEncoder();
let data = encoder.encode(textForFile);

let result = await Deno.writeFile("file.txt", data);
console.log("File has been made!");

console.log("Now onto starting a server...");

const server = serve({ port: 3000 });
console.log("Starting server");
for await (const req of server) {
  req.respond({ body: "Hello World\n" });
}
