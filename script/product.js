import { baseUrl } from "./settings/api.js";

import { getCartProducts } from "./utils/cartFunction.js";

const products = getCartProducts();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const productURL = baseUrl + "products/" + id;

const productContainer = document.querySelector(".product-container");

const title = document.querySelector(".title");

// get singel product

async function getProduct() {
  try {
    const response = await fetch(productURL);

    const json = await response.json();

    const product = json;

    document.title = `English rose - ${product.title.slice(0, 15)}`;

    title.innerHTML += `${product.title}`;

    productContainer.innerHTML = `
<div class="row">
  <div class="col-12">
  <img src="${product.image[0].url}" class="img-fluid" alt="${product.image[0].alternativeText}">
  </div>
</div>
<div class="row">
  <div class="col-12 p-0">
    <div class="container bg-primary">
      <h1 class="py-3 text-center">${product.title}</h1>
    </div>
  </div>
  <div class="row col-12">
    <div class="col-12">
    <p>${product.info}</p>
    <p>$ ${product.price}</p>
    </div>
    <div class="col">
      <button type="button" class="btn btn-primary shadow  add-to-cart">
        Add to cart <i class="fas fa-plus ps-2"></i>
      </button>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-12">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Description</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Info</a>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">${product.description}</div>
        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">${product.info}</div>
      </div>
    </div>
  </div>
</div>
`;

    // add to cart

    const addToCartBtn = document.querySelector(".add-to-cart");

    function renderContent() {
      const favButton = addToCartBtn;

      favButton.addEventListener("click", handleClick);

      function handleClick() {
        const id = this.dataset.id;
        const title = this.dataset.title;

        const currentProducts = getCartProducts();

        const article = {
          id: product.id,
          title: product.title,
        };

        currentProducts.push(article);
        console.log(currentProducts);
        localStorage.setItem("cart", JSON.stringify(currentProducts));
      }
    }
    renderContent();
  } catch (error) {
    console.log(error);
  }
}
getProduct();
