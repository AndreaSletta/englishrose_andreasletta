import { getCartProducts } from "./utils/cartFunction.js";

const inCart = getCartProducts();

const cartContainer = document.querySelector(".cart-container");

const loading = document.querySelector(".loading");
console.log(inCart);

if (inCart.length === 0) {
  console.log("empty");
  loading.style.display = "none";
  cartContainer.innerHTML = `
  <div class="container-fluid">
  <h2>The cart is empty</h2>  <button type="button" class="btn btn-primary">
  <a class="nav-link text-dark" href="shop.html">Back to shop</a>
</button><div>
  `;
} else {
  inCart.forEach(product => {
    console.log(product);
    console.log(product.price);

    loading.style.display = "none";

    cartContainer.innerHTML += `<div>
  <table class="table table-striped">
 
  <tbody>
    <tr>
    
      <th scope="row">
      <a href="product.html?id=${product.id}">
      <img class="img-thumbnail" src="${product.image_url}" alt="${product.image}">
     </a> 
     </th>
      <td>${product.title}</td>
      <td>${product.featured}</td>
      <td>${product.price}</td>
    </tr>
  </tbody>
</table>
<p class="total"></p>
</div>
`;
  });
  cartContainer.innerHTML += `<button type="button" class="btn btn-primary">
    Proceed to checkout
    </button>`;
}
