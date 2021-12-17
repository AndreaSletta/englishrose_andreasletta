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
  var sum = 0;

  inCart.forEach(product => {
    console.log(product.price);
    sum += product.price;

    loading.style.display = "none";

    cartContainer.innerHTML += `<div class="cart-item py-3">
  <table class="table table-striped">
 
  <tbody>
    <tr class="row">
      <th scope="row" class="col-4 col-md-3">
      <a href="product.html?id=${product.id}">
      <img class="img-thumbnail hoverscale" src="${product.image_url}" alt="${product.image}">
     </a> 
     </th>
      <td class="col-3 col-md-2">
      <h5>${product.title}</h5>
      </td>
      <td class="col-5 col-md-2 ">  
              <p>
                $${product.price} EUR
              </p>                
      </td>
    </tr>
    <i class="fas fa-plus plus remove-item" data-id=${product.id} data-title="${product.title}" data-image="${product.image}"data-image-url="${product.image_url}" data-title="${product.title}" data-title="${product.featured}"    data-price="${product.price}"></i>  
  </tbody>
</table>

</div>
`;
  });

  cartContainer.innerHTML += `
  <p class="total"></p>
  <button type="button" class="btn btn-light shadow">
    Proceed to checkout
    </button>`;

  const priceTotal = document.querySelector(".total");

  priceTotal.innerHTML = "Total: $" + sum + " EUR";
}

// remove from array

const favButtons = document.querySelectorAll(".remove-item");

favButtons.forEach(button => {
  button.addEventListener("click", handleClick);
});

function handleClick() {
  const id = parseInt(this.dataset.id);

  const currentProducts = getCartProducts();

  const newProducts = currentProducts.filter(product => product.id !== id);
  saveProducts(newProducts);
}

function saveProducts(products) {
  localStorage.setItem("cart", JSON.stringify(products));
  location.reload();
}
