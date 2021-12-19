import { baseUrl } from "./settings/api.js";
import logoutButton from "./products/logout.js";
import { getUsername } from "./utils/storage.js";
const loading = document.querySelector(".loading");

const username = getUsername();

const shopContainer = document.querySelector(".shop-container");

if (username) {
  async function getProducts() {
    const url = baseUrl + "products";

    try {
      const response = await fetch(url);
      const json = await response.json();

      console.log(json);

      const productList = json;
      loading.style.display = "none";

      productList.forEach(product => {
        shopContainer.innerHTML += `
        <div class="card hoverscale shadow">
        <a href="editProduct.html?id=${product.id}" class="btn">
        <img src="${product.image[0].url}" class="card-img-top" alt="${product.image[0].alternativeText}">
        <div class="card-body ">
      <h5 class="card-title">${product.title}</h5>
      <p class="card-text">$ ${product.price} EUR</p>
    </div> </a> </div>`;
      });
    } catch (error) {
      console.log(error);
    }
  }
  getProducts();
} else {
  document.location.href = "/admin.html";
}

logoutButton();
