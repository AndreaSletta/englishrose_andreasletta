import { baseUrl } from "./settings/api.js";

import { sort } from "./products/sort.js";

const loading = document.querySelector(".loading");

const shopContainer = document.querySelector(".shop-container");
const search = document.querySelector(".search");

async function getProducts() {
  const url = baseUrl + "products";

  try {
    const response = await fetch(url);
    const json = await response.json();

    let productList = json;
    loading.style.display = "none";

    function renderContent() {
      shopContainer.innerHTML = "";
      productList.forEach(product => {
        // Add products to shop.html
        shopContainer.innerHTML += `
      <div class="card hoverscale shadow">
      <a href="product.html?id=${product.id}" class="btn">
      <img src="${product.image[0].url}" class="card-img-top" alt="${product.image[0].alternativeText}">
      <div class="card-body ">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-text">$ ${product.price} EUR</p>
  </div> </a> </div>`;
      });
    }
    renderContent();

    // Search

    search.onkeyup = function () {
      const searchValue = event.target.value.trim().toLowerCase();
      const filteredProducts = json.filter(function (product) {
        if (
          product.title.toLowerCase().includes(searchValue) ||
          product.description.toLowerCase().includes(searchValue)
        ) {
          return true;
        }
      });

      productList = filteredProducts;

      renderContent();
    };
    sort(productList);
  } catch (error) {
    console.log(error);
  }
}
getProducts();
