export function getProducts() {
  const products = localStorage.getProduct("products");

  if (!products) {
    return [];
  } else {
    return JSON.parse(products);
  }
}
