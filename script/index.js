const main = document.querySelector("main");

const loading = document.querySelector(".loading");

main.style.display = "none";

import { addJumbotron } from "./products/jumbotron.js";

addJumbotron();

import { addCarousel } from "./products/carousel.js";

addCarousel();

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
