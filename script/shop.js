import { addToShop } from "./products/addToShop.js";
addToShop();

const main = document.querySelector("main");

const loading = document.querySelector(".loading");

main.style.display = "none";

const delay = ms => new Promise(res => setTimeout(res, ms));

if (
  document.readyState === "complete" ||
  document.readyState === "loaded" ||
  document.readyState === "interactive"
) {
  await delay(1000);

  main.style.display = "block";

  loading.style.display = "none";
}
