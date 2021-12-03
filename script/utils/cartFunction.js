export function getCartProducts() {
  const cartProducts = JSON.parse(localStorage.getItem("cart"));

  if (!cartProducts) {
    return [];
  } else if (cartProducts[0].id == undefined) {
    return [];
  } else {
    return cartProducts;
  }
}
