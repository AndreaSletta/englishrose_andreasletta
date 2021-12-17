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
    loading.style.display = "none";

    cartContainer.innerHTML += `<div class="cart-item">
  <table class="table table-striped">
 
  <tbody>
    <tr class="row">
      <th scope="row" class="col-4">
      <a href="product.html?id=${product.id}">
      <img class="img-thumbnail hoverscale" src="${product.image_url}" alt="${product.image}">
     </a> 
     </th>
      <td class="col-4 ">
      <div class="row ">
      <div class="col"> <h5>${product.title}</h5></div>
      <div class="col ">
      <div class="number">
        <i class="fas fa-minus minus"></i>
	      <input type="text" value="1"/>
        <i class="fas fa-plus plus"></i>
      </div> 
      </div>
      </div>
      </td>
      
        <td class="col-4 ">
          <div class="row ">
            <div class="col">
              <i class="fas fa-plus plus remove-item" data-id=${product.id} data-title="${product.title}" data-image="${product.image}"data-image-url="${product.image_url}" data-title="${product.title}" data-title="${product.featured}"    data-price="${product.price}"></i>  
            </div> 
          <div class="col">        
              <p>
                $${product.price} EUR
              </p>         
          </div>
        </div> 
      </td>
    
    </tr>
    
  </tbody>
</table>

</div>
`;
  });
  cartContainer.innerHTML += `
  <p class="total">"empty"</p>
  <button type="button" class="btn btn-primary">
    Proceed to checkout
    </button>`;
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
