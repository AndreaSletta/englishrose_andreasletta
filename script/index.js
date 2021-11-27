import { baseUrl } from "./settings/api.js";

import { getCartProducts } from "./utils/productsFunction.js";

const carouselContainer = document.querySelector(".feature-container");

async function getProducts() {
  const url = baseUrl + "products";

  try {
    const response = await fetch(url);
    const json = await response.json();

    console.log(json);

    const product = json;

    for (var i = 0; i < product.length; i++) {
      const isFeatured = product[i].featured;

      if (isFeatured == true) {
        console.log(product[i]);

        /* Add products to index.html carousel */

        carouselContainer.innerHTML += `<div class="carousel-item">
        <div class="card col-12">
        <img src="${product[i].image[0].url}" class="card-img-top" alt="${product[i].image[0].alternativeText}">
        <div class="card-body">
          <h5 class="card-title">${product[i].title}</h5>
          <p class="card-text">$ ${product[i].price}</p>
          <a href="product.html?id=${product[i].id}" class="btn btn-primary">Shop now</a>
          <i class="fas fa-cart-plus add-to-cart"></i>
        </div>
      </div>
        </div>`;

        const allFeatured = document.querySelectorAll(".carousel-item");
        const firstFeatured = allFeatured[0];

        firstFeatured.classList.add("active");
      }
    }
  } catch (error) {
    console.log(error);
  }
}
getProducts();
