import { baseUrl } from "../settings/api.js";

const carouselContainer = document.querySelector(".feature-container");

const loading = document.querySelector(".loadingCarousel");

export function addCarousel() {
  async function getProducts() {
    const url = baseUrl + "products";

    try {
      const response = await fetch(url);
      const json = await response.json();

      const product = json;

      loading.style.display = "none";

      var featuredArray = [];

      /* Add featured products to array */
      for (var i = 0; i < product.length; i++) {
        const isFeatured = product[i].featured;

        if (isFeatured == true) {
          featuredArray.push(product[i]);
        }
      }

      /* Add products to index.html carousel */

      if (window.innerWidth < 766.97) {
        for (var i = 0; i < featuredArray.length; i += 1) {
          carouselContainer.innerHTML += `
          <div class="carousel-item">
          <div class="row justify-content-around">
         <div class="card hoverscale shadow col-8">
         <a href="product.html?id=${featuredArray[i].id}">
        <img src="${featuredArray[i].image[0].url}" class="card-img-top" alt="${featuredArray[i].image[0].alternativeText}">
        <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title text-dark ">${featuredArray[i].title}</h5>
          <button class="btn btn-secondary ">Shop now</button>
        </div></a>
      </div>
      </div>
        </div>`;
        }
      }

      if (window.innerWidth > 767.98 && window.innerWidth < 991.98) {
        for (var i = 0; i < featuredArray.length - 2; i += 2) {
          carouselContainer.innerHTML += `
      <div class="carousel-item">
      <div class="row justify-content-around">
     <div class="card hoverscale shadow col-5">
     <a href="product.html?id=${featuredArray[i].id}">
     <img src="${featuredArray[i].image[0].url}" class="card-img-top" alt="${
            featuredArray[i].image[0].alternativeText
          }">
          <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title text-dark ">${featuredArray[i].title}</h5>
          <button class="btn btn-secondary ">Shop now</button>
        </div></a>
  </div>
  <div class="card hoverscale shadow col-5">
  <a href="product.html?id=${featuredArray[i + 1].id}">
  <img src="${featuredArray[i + 1].image[0].url}" class="card-img-top" alt="${
            featuredArray[i + 1].image[0].alternativeText
          }">
          <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title text-dark ">${featuredArray[i + 1].title}</h5>
          <button class="btn btn-secondary ">Shop now</button>
        </div></a>
  </div>
  </div>
    </div>`;
        }
      }

      if (window.innerWidth > 922) {
        for (var i = 0; i < featuredArray.length - 3; i += 3) {
          carouselContainer.innerHTML += `
      <div class="carousel-item">
      <div class="row justify-content-around">
     <div class="card hoverscale shadow col-3">
     <a href="product.html?id=${featuredArray[i].id}">
     <img src="${featuredArray[i].image[0].url}" class="card-img-top" alt="${
            featuredArray[i].image[0].alternativeText
          }">
          <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title text-dark ">${featuredArray[i + 1].title}</h5>
          <button class="btn btn-secondary ">Shop now</button>
        </div></a>
  </div>
  
  <div class="card hoverscale shadow col-3">
     <a href="product.html?id=${featuredArray[i + 1].id}">
     <img src="${
       featuredArray[i + 1].image[0].url
     }" class="card-img-top" alt="${
            featuredArray[i + 1].image[0].alternativeText
          }">
          <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title text-dark ">${featuredArray[i + 1].title}</h5>
          <button class="btn btn-secondary ">Shop now</button>
        </div></a>
  </div>
  

  
  <div class="card hoverscale shadow col-3">
  <a href="product.html?id=${featuredArray[i + 2].id}">
  <img src="${featuredArray[i + 2].image[0].url}" class="card-img-top" alt="${
            featuredArray[i + 2].image[0].alternativeText
          }">
          <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title text-dark ">${featuredArray[i + 2].title}</h5>
          <button class="btn btn-secondary ">Shop now</button>
        </div></a>
</div>
  

  </div>
    </div>`;
        }
      }

      const allFeatured = document.querySelectorAll(".carousel-item");
      const firstFeatured = allFeatured[0];

      firstFeatured.classList.add("active");
    } catch (error) {
      console.log(error);
    }
  }
  getProducts();
}
