import { baseUrl } from "../settings/api.js";
import { getToken } from "../utils/storage.js";

export function deleteButton(id) {
  const container = document.querySelector(".deleteContainer");
  container.innerHTML = `<button type="button" class="delete">Delete </button>`;

  const button = document.querySelector("button.delete");
  button.onclick = async function () {
    console.log(id);

    const doDelete = confirm("are you sure?");
    console.log(doDelete);

    if (doDelete) {
      const url = baseUrl + "products/" + id;

      const token = getToken();

      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);
        location.href = "/";
      } catch (error) {
        console.log(error);
      }
    }
  };
}