export function getCartProducts() {
  const products = localStorage.getCartProducts("products");

  if (!products) {
    return [];
  } else {
    return JSON.parse(products);
  }
}
