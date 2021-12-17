export function getCartProducts() {
  const cartProducts = JSON.parse(localStorage.getItem("cart"));

  if (!cartProducts) {
    return [];
  } else if (cartProducts.length === 0) {
    return [];
  } else {
    return cartProducts;
  }
}
