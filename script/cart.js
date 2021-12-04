import { getCartProducts } from "./utils/cartFunction.js";

const inCart = getCartProducts();

const cartContainer = document.querySelector(".cart-container");

inCart.forEach(product => {
  console.log(product);
  console.log(product.price);

  cartContainer.innerHTML += `
  <table class="table table-striped">
 
  <tbody>
    <tr>
    <a href="product.html?id=${product.id}">
      <th scope="row">
      <img class="img-thumbnail" src="${product.image_url}" alt="${product.image}">
      </th>
      </a>
      <td>${product.title}</td>
      <td>${product.featured}</td>
      <td>${product.price}</td>
    </tr>
  </tbody>
</table>
<p class="total"></p>`;
});
