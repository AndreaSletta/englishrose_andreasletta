import { baseUrl } from "./settings/api.js";

import { getCartProducts } from "./utils/cartFunction.js";

import { addCarousel } from "./products/carousel.js";
addCarousel();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const productURL = baseUrl + "products/" + id;

const title = document.querySelector(".title");

const productTitle = document.querySelector("#product-title");

const productImage = document.querySelector("#product-image");

const productInfo = document.querySelector("#info");

const productPrice = document.querySelector("#price");

const descriptionTab = document.querySelector("#description-tab");
const descriptionText = document.querySelector("#description");

const ingredientsTab = document.querySelector("#ingredients-tab");
const ingredientsText = document.querySelector("#ingredients");

const main = document.querySelector("main");

const loading = document.querySelector(".loading");

main.style.display = "none";

const delay = ms => new Promise(res => setTimeout(res, ms));

if (
  document.readyState === "complete" ||
  document.readyState === "loaded" ||
  document.readyState === "interactive"
) {
  await delay(1000);

  main.style.display = "block";

  loading.style.display = "none";
}

async function getProduct() {
  try {
    const response = await fetch(productURL);

    const json = await response.json();

    const product = json;

    document.title = `English rose - ${product.title.slice(0, 15)}`;

    title.innerHTML += `${product.title}`;

    productTitle.innerHTML += `${product.title}`;

    productImage.innerHTML += `<img src="${product.image[0].url}" class="img-fluid shadow " alt="${product.image[0].alternativeText}">`;

    productInfo.innerHTML += `${product.info}`;

    productPrice.innerHTML += `${product.price}`;

    descriptionText.innerHTML += `${product.description}`;

    ingredientsText.innerHTML += `${product.ingredients}`;

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
          image: product.image[0],
          image_url: product.image[0].url,
          price: product.price,
          featured: product.featured,
        };

        currentProducts.push(article);
        console.log(currentProducts);
        localStorage.setItem("cart", JSON.stringify(currentProducts));
      }
    }
    renderContent();

    //Tabs

    descriptionText.style.display = "block";

    descriptionTab.onclick = function showDescription() {
      descriptionText.style.display = "block";
      ingredientsText.style.display = "none";
      descriptionTab.setAttribute("aria-selected", true);
      ingredientsTab.setAttribute("aria-selected", false);
    };

    ingredientsTab.onclick = function showIngredients() {
      ingredientsText.style.display = "block";
      descriptionText.style.display = "none";
      ingredientsTab.setAttribute("aria-selected", true);
      descriptionTab.setAttribute("aria-selected", false);
    };
  } catch (error) {
    console.log(error);
  }
}
getProduct();
