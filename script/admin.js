import { getUsername } from "./utils/storage.js";

import { baseUrl } from "./settings/api.js";

import { saveToken, saveUser } from "./utils/storage.js";

import logoutButton from "./products/logout.js";

const loginContainer = document.querySelector(".login");

const navbarToggler = document.querySelector(".navbar-toggler");

const loginForm = document.querySelector("form");
const email = document.querySelector("#inputEmail");
const password = document.querySelector("#inputPassword");
const message = document.querySelector(".message-container");

const username = getUsername();

const welcomeContainer = document.querySelector("#welcome-container");

welcomeContainer.style.display = "none";
navbarToggler.style.display = "none";
message.style.display = "none";

loginForm.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  doLogin(emailValue, passwordValue);
}

function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

async function doLogin(email, password) {
  const url = baseUrl + "auth/local";

  const data = JSON.stringify({ identifier: email, password: password });
  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();

    message.innerHTML = "";

    console.log(json);

    if (json.user) {
      message.innerHTML = `<h5 class="border border-secondary p-3 my-3">Welcome ${json.user.username}!`;
      message.style.display = "block";
      saveToken(json.jwt);
      saveUser(json.user);

      loginContainer.style.display = "none";

      welcomeContainer.style.display = "flex";
      navbarToggler.style.display = "flex";
      const currentUsername = getUsername();
      welcomeContainer.innerHTML += `<div>
            <h1 class="text-center welcome-message"> "Welcome ${currentUsername}!"</h1>
            <p>What would you like to do?</p>
            <button class="btn btn-light shadow">
              <a href="addProduct.html">Add Product</a>
            </button>
            <button class="btn btn-light shadow">
              <a href="editProductAll.html"> Edit or delete product</a>
            </button>
          </div>`;
    }

    if (json.error) {
      message.innerHTML = `<h5 class=" border border-danger  p-3 my-3">Wrong email or password</h5>`;
      message.style.display = "block";
    }
  } catch (error) {
    console.log(error);
  }
}

if (username) {
  loginContainer.style.display = "none";
  welcomeContainer.style.display = "flex";
  navbarToggler.style.display = "flex";

  const currentUsername = getUsername();

  welcomeContainer.innerHTML += `<div>
            <h1 class="text-center welcome-message"> "Welcome ${currentUsername}!"</h1>
            <p>What would you like to do?</p>
            <button class="btn btn-light">
              <a href="addProduct.html">Add Product</a>
            </button>
            <button class="btn btn-light">
              <a href="editProductAll.html"> Edit or delete product</a>
            </button>
          </div>`;
  console.log(currentUsername);
}

logoutButton();
