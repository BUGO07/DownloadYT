#!/usr/bin/env node
import { qualityType, urlType } from "downloadyt";
import prompts from "prompts";
import { downlaod } from "./download";

function validateURL(url: urlType) {
  return /[a-zA-Z0-9-_]{11}$/.test(url);
}

async function main() {
  const { url } = await prompts({
    type: "text",
    name: "url",
    message: "Enter YouTube URL\n",
    validate: (value: urlType) =>
      validateURL(value) ? true : `Please specify YouTube URL`,
  });
  const { quality } = await prompts({
    type: "text",
    name: "quality",
    message:
      "Enter Desired Video Quality\n(highest | lowest | highestaudio | lowestaudio | highestvideo | lowsetvideo)\n",
    validate: (value: string) => {
      return [
        "highest",
        "lowest",
        "highestaudio",
        "lowestaudio",
        "highestvideo",
        "lowsetvideo",
      ].includes(value)
        ? true
        : `Please specify desired video quality.`;
    },
  });
  console.time("Downloaded in");
  const path = await downlaod(url, quality);
  console.timeEnd("Downloaded in");
  console.log(`Downloaded to ${path}`);
}

process.on("SIGINT", function () {
  console.log("Exiting...");
  process.exit(1);
});

main();
