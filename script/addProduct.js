import { baseUrl } from "./settings/api.js";
import { getToken } from "./utils/storage.js";
import logoutButton from "./products/logout.js";
import { getUsername } from "./utils/storage.js";

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

if (username) {
  form.addEventListener("submit", submitForm);
  function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";
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
      return (message.innerHTML = `<h2>Error`);
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

    // fetch image from provided url
    fetch(image)
      //Convert image to binary
      .then(response => response.blob())
      .then(function (myBlob) {
        //Add image data to formdata
        const formData = new FormData();
        formData.append("files", myBlob);
        console.log(formData);

        //Upload the image to strapi
        fetch(uploadUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // <- Don't forget Authorization header if you are using it.
          },
          body: formData,
        })
          //Await upload confirmation
          .then(response => response.json())
          .then(result => {
            console.log(result);

            //Save strapi id of new image
            const imageId = result[0].id;
            console.log(imageId);

            //Create new item and link to newly created image
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
                console.log(response);
              });

              //const json = await response.json();
              //console.log(json);
              //console.log(imageUrl);
            } catch (error) {
              console.log(error);
            }
          })
          .catch(function (err) {
            console.log("error:");
            console.log(err);
          });
      });
  }
} else {
  document.location.href = "/admin.html";
}

logoutButton();
