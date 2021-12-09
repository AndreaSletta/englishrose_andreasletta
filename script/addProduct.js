import { baseUrl } from "./settings/api.js";
import { getToken } from "./utils/storage.js";

const form = document.querySelector("form");
const title = document.querySelector("#title");
const info = document.querySelector("#info");
const description = document.querySelector("#description");
const ingredients = document.querySelector("#ingredients");
const price = document.querySelector("#price");
const isFeatured = document.querySelector("#isFeatured");
const image = document.querySelector("#image");
const message = document.querySelector("#message");

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
  // const imageValue = image.files[0];

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

  fetch(image)
    .then(response => response.blob())
    .then(function (myBlob) {
      const formData = new FormData();
      formData.append("files", myBlob);
      console.log(formData);

      fetch(uploadUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // <- Don't forget Authorization header if you are using it.
        },
        body: formData,
      })
        .then(response => response.json())
        .then(result => {
          console.log(result);

          const imageId = result[0].id;
          console.log(imageId);

          //Insert here
          const data = JSON.stringify({
            title: title,
            info: info,
            description: description,
            ingredients: ingredients,
            price: price,
            featured: isFeatured,
            image: imageId,
          });

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
/*
const imageForm = document.querySelector("#form");

const imageInput = document.querySelector("#form>input");

console.log(imageInput);

imageForm.addEventListener("submit", submitForm);

//function submitForm(event) {
//  event.preventDefault();

//const imageValue = imageInput.files[0];
//console.log(imageValue.name);
// addProduct(imageValue);
//  uploadByUrl();
//}
const uploadByUrl = async () => {
  const url = baseUrl + "upload";
  const token = getToken();

  let imageURL =
    "https://images.unsplash.com/photo-1611095785020-1ba3dd228ea7?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"; // <- image url
  fetch(imageURL)
    .then(response => response.blob())
    .then(function (myBlob) {
      const formData = new FormData();
      formData.append("files", myBlob);
      console.log(formData);
      fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // <- Don't forget Authorization header if you are using it.
        },
        body: formData,
      })
        .then(response => {
          const result = response.json();
          console.log("result", result);
          const imageId = response.data[0].id;
          console.log(imageId);

          //Insert here
          const data = JSON.stringify({
            title: title,
            info: info,
            description: description,
            ingredients: ingredients,
            price: price,
            featured: isFeatured,
            image: imageId,
          });
        })
        .catch(function (err) {
          console.log("error:");
          console.log(err);
        });
    });
};

async function addProduct(imageInput) {
  const url = baseUrl + "upload";

  console.log(url);

  const data = JSON.stringify({
    imageInput: imageInput,
  });

  console.log(imageInput);

  const token = getToken();

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();

    const images = json;
    console.log(images);
  } catch (error) {
    console.log(error);
  }
}*/
