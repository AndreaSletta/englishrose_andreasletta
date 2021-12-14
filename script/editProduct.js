import { baseUrl } from "./settings/api.js";

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
      <div class="card col-10">
      <a href="edit.html?id=${product.id}" class="btn">
      <img src="${product.image[0].url}" class="card-img-top" alt="${product.image[0].alternativeText}">
      <div class="card-body">
    <h5 class="card-title">${product.title}</h5>
  </div>  </a></div>`;
    });
  } catch (error) {
    console.log(error);
  }
}
getProducts();
