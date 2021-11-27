import { baseUrl } from "./settings/api.js";

import { getProducts } from "./utils/productsFunction.js";

const shopContainer = document.querySelector(".shop-container");

async function getList() {
  const url = baseUrl + "products";

  try {
    const response = await fetch(url);
    const json = await response.json();

    console.log(json);

    const productList = json;

    productList.forEach(product => {
      shopContainer.innerHTML += `
      <div class="card col-12">
  <img src="${product.image[0].url}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-text">$ ${product.price}</p>
    <a href="#" class="btn btn-primary">Shop now</a>
  </div>
</div>`;
    });
  } catch (error) {
    console.log(error);
  }
}
getList();
