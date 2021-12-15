// Add image to herobanner
import { baseUrl } from "../settings/api.js";

export function addJumbotron() {
  const jumbotron = document.querySelector(".jumbotron");

  async function getHeroImage() {
    const url = baseUrl + "upload/files";

    try {
      const response = await fetch(url);
      const json = await response.json();

      const images = json;

      for (var i = 0; i < images.length; i++) {
        if (images[i].name === "herobanner.gif") {
          console.log(images[i]);
          jumbotron.innerHTML += `<img
        src="${images[i].url}" 
            class="img-fluid"
            alt="Makup items spread around"
          />`;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  getHeroImage();
}
