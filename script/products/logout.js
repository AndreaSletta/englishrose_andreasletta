import { clearStorage } from "../utils/storage.js";
import { getUsername } from "../utils/storage.js";

const username = getUsername();

export default function logoutButton() {
  const button = document.querySelector("#sign-out");

  if (username) {
    button.onclick = function () {
      const doLogout = confirm("Are you sure you want to logout?");
      if (doLogout) {
        clearStorage();
        location.href = "/admin.html";
      }
    };
  }
}
