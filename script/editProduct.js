import { baseUrl } from "./settings/api.js";
import { getToken } from "./utils/storage.js";
import { deleteButton } from "./products/deleteButton.js";
import logoutButton from "./products/logout.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

import { getUsername } from "./utils/storage.js";

const username = getUsername();

if (username) {
  const productURL = baseUrl + "products/" + id;

  const form = document.querySelector("form");
  const productId = document.querySelector("#id");
  const title = document.querySelector("#title");
  const info = document.querySelector("#info");
  const description = document.querySelector("#description");
  const ingredients = document.querySelector("#ingredients");
  const price = document.querySelector("#price");
  const isFeatured = document.querySelector("#isFeatured");
  const image = document.querySelector("#image");
  const message = document.querySelector("#message");

  const breadcrumbTitle = document.querySelector(".title");

  message.style.display = "none";

  var oldUrl;
  var oldId;

  (async function () {
    // remove modal
    function removeMessage() {
      message.innerHTML = "";
      message.style.display = "none";
    }

    message.addEventListener("click", removeMessage);

    try {
      const response = await fetch(productURL);

      const json = await response.json();

      const product = json;

      breadcrumbTitle.innerHTML += `${product.title}`;

      deleteButton(json.id);

      productId.value = product.id;
      title.value = product.title;
      info.value = product.info;
      description.value = product.description;
      ingredients.value = product.ingredients;
      price.value = product.price;
      isFeatured.value = product.featured;
      image.value = product.image[0].url;

      oldUrl = product.image[0].url;
      oldId = product.image[0].id;
    } catch (error) {
      console.log(error);
    }
  })();

  form.addEventListener("submit", submitForm);

  function submitForm(event) {
    event.preventDefault();
    message.innerHTML = "";

    const productIdValue = productId.value.trim();
    const titleValue = title.value.trim();
    const infoValue = info.value.trim();
    const descriptionValue = description.value.trim();
    const ingredientsValue = ingredients.value.trim();
    const priceValue = parseFloat(price.value);
    const isFeaturedValue = isFeatured.value.trim();
    const imageValue = image.value.trim();

    if (
      titleValue.length === 0 ||
      infoValue.length === 0 ||
      descriptionValue.length === 0 ||
      ingredientsValue.length === 0 ||
      priceValue.length === 0 ||
      isNaN(priceValue) ||
      isFeaturedValue.length === 0 ||
      imageValue.length === 0
    ) {
      message.style.display = "block";
      return (message.innerHTML = `<h2>Invalid input</h2> 
      <i class="fas fa-plus"></i>`);
    }

    editProduct(
      titleValue,
      infoValue,
      descriptionValue,
      ingredientsValue,
      priceValue,
      isFeaturedValue,
      imageValue,
      oldUrl
    );
    message.style.display = "block";
    message.innerHTML = `<h2>Change processing, please wait...</h2> 
    <i class="fas fa-plus"></i>`;
  }

  async function editProduct(
    title,
    info,
    description,
    ingredients,
    price,
    isFeatured,
    image,
    oldUrl
  ) {
    const url = baseUrl + "products/" + id;

    const uploadUrl = baseUrl + "upload";
    const productUrl = baseUrl + "products";

    const token = getToken();

    if (oldUrl == image) {
      const data = JSON.stringify({
        title: title,
        info: info,
        description: description,
        ingredients: ingredients,
        price: price,
        featured: isFeatured,
        image: oldId,
      });

      const options = {
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();
        message.style.display = "block";
        message.innerHTML = `<h2>Product edited</h2> 
        <i class="fas fa-plus"></i>`;
      } catch (error) {
        console.log(error);
        message.style.display = "block";
        message.innerHTML = `<h2>Upload failed</h2> 
        <i class="fas fa-plus"></i>`;
      }
    } else {
      fetch(image)
        .then(response => response.blob())
        .then(function (myBlob) {
          const formData = new FormData();
          formData.append("files", myBlob);

          //Upload the image to strapi
          fetch(uploadUrl, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          })
            .then(response => response.json())
            .then(result => {
              const imageId = result[0].id;

              const data = JSON.stringify({
                title: title,
                info: info,
                description: description,
                ingredients: ingredients,
                price: price,
                featured: isFeatured,
                image: imageId,
              });

              // Upload new product
              const options = {
                method: "PUT",
                body: data,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              };
              try {
                fetch(url, options).then(response => {
                  message.style.display = "block";
                  message.innerHTML = `<h2>Product edited</h2> 
                  <i class="fas fa-plus"></i>`;
                });
              } catch (error) {
                console.log(error);
              }
            })
            .catch(function (err) {
              console.log(err);
              message.style.display = "block";
              message.innerHTML = `<h2>Upload failed</h2> 
              <i class="fas fa-plus"></i>`;
            });
        });
    }
  }
} else {
  document.location.href = "/admin.html";
}

logoutButton();
