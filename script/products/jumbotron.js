// Add image to herobanner
import { baseUrl } from "../settings/api.js";

const loading = document.querySelector(".loading");

export function addJumbotron() {
  const jumbotron = document.querySelector(".jumbotron");

  async function getHeroImage() {
    const url = baseUrl + "upload/files";

    try {
      const response = await fetch(url);
      const json = await response.json();

      const images = json;
      loading.style.display = "none";
      for (var i = 0; i < images.length; i++) {
        if (images[i].name === "herobanner.gif") {
          jumbotron.innerHTML += `
          
          <div class="container">
          <h1>
            Enhance your <br />
            <span class="text-red">inner </span> beauty
          </h1>
          <button type="button" class="btn shadow">
            <a href="shop.html">Shop now</a>
          </button>
        </div>
          <img
        src="${images[i].url}" 
            class="img-fluid" id="jumbotron"
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
