import { baseUrl } from "./settings/api.js";
import { getToken } from "./utils/storage.js";
import logoutButton from "./products/logout.js";
import { getUsername } from "./utils/storage.js";
const loading = document.querySelector(".loading");

const username = getUsername();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const info = document.querySelector("#info");
const description = document.querySelector("#description");
const ingredients = document.querySelector("#ingredients");
const price = document.querySelector("#price");
const isFeatured = document.querySelector("#isFeatured");
const image = document.querySelector("#image");
const message = document.querySelector("#message");

message.style.display = "none";

if (username) {
  form.addEventListener("submit", submitForm);
  function submitForm(event) {
    event.preventDefault();

    const titleValue = title.value.trim();
    const infoValue = info.value.trim();
    const descriptionValue = description.value.trim();
    const ingredientsValue = ingredients.value.trim();
    const priceValue = parseFloat(price.value);
    const isFeaturedValue = isFeatured.value.trim();
    const imageValue = image.value.trim();

    // remove modal
    function removeMessage() {
      message.innerHTML = "";
      message.style.display = "none";
    }

    message.addEventListener("click", removeMessage);

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
    addProduct(
      titleValue,
      infoValue,
      descriptionValue,
      ingredientsValue,
      priceValue,
      isFeaturedValue,
      imageValue
    );
    message.style.display = "block";
    message.innerHTML = `<h2>Processing, please wait...</h2> 
    <i class="fas fa-plus"></i>`;
  }

  async function addProduct(
    title,
    info,
    description,
    ingredients,
    price,
    isFeatured,
    image
  ) {
    const uploadUrl = baseUrl + "upload";
    const token = getToken();
    const productUrl = baseUrl + "products";

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
              method: "POST",
              body: data,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            };
            try {
              fetch(productUrl, options).then(response => {
                message.style.display = "block";
                message.innerHTML = `<h2>Product added</h2> 
                <i class="fas fa-plus"></i>`;

                function reload() {
                  setTimeout(function () {
                    location.reload();
                  }, 3000);
                }
                reload();
              });
            } catch (error) {
              console.log(error);
              message.style.display = "block";
              message.innerHTML = `<h2>Upload failed</h2> 
              <i class="fas fa-plus"></i>`;
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
} else {
  document.location.href = "/admin.html";
}

logoutButton();
