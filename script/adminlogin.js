import { baseUrl } from "./settings/api.js";

import { saveToken, saveUser } from "./utils/storage.js";

const loginForm = document.querySelector("form");
const email = document.querySelector("#exampleInputEmail1");
const password = document.querySelector("#exampleInputPassword1");
const message = document.querySelector(".message-container");

const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");

emailError.style.display = "none";
passwordError.style.display = "none";
message.style.display = "none";

loginForm.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (validateEmail(emailValue) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (checkLength(passwordValue, 0) === true) {
    passwordError.style.display = "none";
  } else {
    passwordError.style.display = "block";
  }

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
      message.innerHTML = `<h1 class="bg-success p-3 my-3">Welcome ${json.user.username}!`;
      message.style.display = "block";
      saveToken(json.jwt);
      saveUser(json.user);

      // location.href = "https://sp2-andreaslettalarsen.netlify.app/" + "admin";
    }

    if (json.error) {
      message.innerHTML = `<h1 class="bg-warning  p-3 my-3">Wrong email or password`;
      message.style.display = "block";
    }
  } catch (error) {
    console.log(error);
  }
}
