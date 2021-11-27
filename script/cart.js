import { getCartProducts } from "./utils/productsFunction";

const container = document.querySelector(".shop-container");

const products = getCartProducts();

clearButton();

if (products.length === 0) {
  container.innerHTML = `<div class="col-12 col-md-6">
  <div class="p-3 mx-3 border bg-light article">
  <h2> No products yet`;
}

products.forEach(product => {
  container.innerHTML += `<div class="col-12 col-md-6">
    <div class="p-3 mx-3 border bg-light article">
    <i class="fa fa-heart" ></i>  
    <h2> ${product.title} </h2>
 
    `;
});
