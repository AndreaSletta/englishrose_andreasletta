import { baseUrl } from "./settings/api.js";

import { getCartProducts } from "./utils/productsFunction.js";

const shopContainer = document.querySelector(".shop-container");

async function getProducts() {
  const url = baseUrl + "products";

  try {
    const response = await fetch(url);
    const json = await response.json();

    console.log(json);

    const productList = json;

    productList.forEach(product => {
      /* Add products to shop.html */
      shopContainer.innerHTML += `
      <div class="card col-12">
  <img src="${product.image[0].url}" class="card-img-top" alt="${product.image[0].alternativeText}">
  <div class="card-body">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-text">$ ${product.price}</p>
    <a href="product.html?id=${product.id}" class="btn btn-primary">Shop now</a>
    <i class="fas fa-cart-plus add-to-cart"></i>
  </div>
</div>`;
    });
  } catch (error) {
    console.log(error);
  }
}
getProducts();
