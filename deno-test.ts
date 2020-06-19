let message = "Testing Deno...";
console.log(message);

let textForFile = "This text should be stored in a file using Deno Runtime API";
let encoder = new TextEncoder();
let data = encoder.encode(textForFile);

let result = await Deno.writeFile("file.txt", data);
console.log("File has been made");
