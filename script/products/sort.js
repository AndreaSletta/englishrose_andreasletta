const shopContainer = document.querySelector(".shop-container");

const sortBtnTitle = document.querySelector("#dropdownMenuButton");
const defaultBtn = document.querySelector("#default");
const featuredBtn = document.querySelector("#featured");

export function sort(event) {
  let productList = event;

  defaultBtn.style.display = "none";

  //Sort by featured

  featuredBtn.onclick = function showFeatured() {
    var containerArray = [];

    for (var i = 0; i < productList.length; i++) {
      const isFeatured = productList[i].featured;

      if (isFeatured == true) {
        containerArray.push(productList[i]);
      }
    }

    shopContainer.innerHTML = "";

    containerArray.forEach(product => {
      shopContainer.innerHTML += `
      <div class="card hoverscale shadow">
      <a href="product.html?id=${product.id}" class="btn">
      <img src="${product.image[0].url}" class="card-img-top" alt="${
        product.image[0].alternativeText
      }">
      <div class="card-body">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-text text-dark">${product.description.slice(0, 30)}...</p>
    <p class="card-text">$ ${product.price}</p>
  </div> </a> </div>`;
    });
    featuredBtn.style.display = "none";
    sortBtnTitle.innerHTML = "Featured";

    defaultBtn.style.display = "block";
  };

  //Sort by default

  defaultBtn.onclick = function showDefault() {
    var containerArray = productList;

    shopContainer.innerHTML = "";
    containerArray.forEach(product => {
      shopContainer.innerHTML += `
        <div class="card">
        <a href="product.html?id=${product.id}" class="btn">
        <img src="${product.image[0].url}" class="card-img-top" alt="${product.image[0].alternativeText}">
        <div class="card-body">
      <h5 class="card-title">${product.title}</h5>
      <p class="card-text">$ ${product.price}</p>
    </div> </a> </div>`;
    });
    defaultBtn.style.display = "none";
    sortBtnTitle.innerHTML = "Default";

    featuredBtn.style.display = "block";
  };
}
