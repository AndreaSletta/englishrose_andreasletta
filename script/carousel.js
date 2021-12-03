import { baseUrl } from "./settings/api.js";

const carouselContainer = document.querySelector(".feature-container");

async function getProducts() {
  const url = baseUrl + "products";

  try {
    const response = await fetch(url);
    const json = await response.json();

    console.log(json);

    const product = json;

    var featuredArray = [];

    /* Add featured products to array */
    for (var i = 0; i < product.length; i++) {
      const isFeatured = product[i].featured;

      if (isFeatured == true) {
        featuredArray.push(product[i]);
      }
    }

    console.log(featuredArray);

    /* Add products to index.html carousel */

    for (var i = 0; i < featuredArray.length; i += 2) {
      if (window.innerWidth < 768) {
        carouselContainer.innerHTML += `
          <div class="carousel-item">
          <div class="row justify-content-around">
         <div class="card col-8">
        <img src="${featuredArray[i].image[0].url}" class="card-img-top" alt="${featuredArray[i].image[0].alternativeText}">
        <div class="card-body">
          <h5 class="card-title">${featuredArray[i].title}</h5>
          <p class="card-text">$ ${featuredArray[i].price}</p>
          <a href="product.html?id=${featuredArray[i].id}" class="btn">Shop now</a>
          <i class="fas fa-cart-plus add-to-cart"></i>
        </div>
      </div>
      </div>
        </div>`;
      } else if (window.innerWidth > 767 && window.innerWidth < 1024) {
        carouselContainer.innerHTML += `
      <div class="carousel-item">
      <div class="row justify-content-around">
     <div class="card col-5">
    <img src="${featuredArray[i].image[0].url}" class="card-img-top" alt="${
          featuredArray[i].image[0].alternativeText
        }">
    <div class="card-body">
      <h5 class="card-title">${featuredArray[i].title}</h5>
      <p class="card-text">$ ${featuredArray[i].price}</p>
      <a href="product.html?id=${featuredArray[i].id}" class="btn">Shop now</a>
      <i class="fas fa-cart-plus add-to-cart"></i>
    </div>
  </div>
  <div class="card col-5">
    <img src="${featuredArray[i + 1].image[0].url}" class="card-img-top" alt="${
          featuredArray[i + 1].image[0].alternativeText
        }">
    <div class="card-body">
      <h5 class="card-title">${featuredArray[i + 1].title}</h5>
      <p class="card-text">$ ${featuredArray[i + 1].price}</p>
      <a href="product.html?id=${
        featuredArray[i + 1].id
      }" class="btn">Shop now</a>
      <i class="fas fa-cart-plus add-to-cart"></i>
    </div>
  </div>
  </div>
    </div>`;
      } else if (window.innerWidth > 1023) {
        carouselContainer.innerHTML += `
      <div class="carousel-item">
      <div class="row justify-content-around">
     <div class="card col-3">
    <img src="${featuredArray[i].image[0].url}" class="card-img-top" alt="${
          featuredArray[i].image[0].alternativeText
        }">
    <div class="card-body">
      <h5 class="card-title">${featuredArray[i].title}</h5>
      <p class="card-text">$ ${featuredArray[i].price}</p>
      <a href="product.html?id=${featuredArray[i].id}" class="btn">Shop now</a>
      <i class="fas fa-cart-plus add-to-cart"></i>
    </div>
  </div>
  <div class="card col-3">
    <img src="${featuredArray[i + 1].image[0].url}" class="card-img-top" alt="${
          featuredArray[i + 1].image[0].alternativeText
        }">
    <div class="card-body">
      <h5 class="card-title">${featuredArray[i + 1].title}</h5>
      <p class="card-text">$ ${featuredArray[i + 1].price}</p>
      <a href="product.html?id=${
        featuredArray[i + 1].id
      }" class="btn">Shop now</a>
      <i class="fas fa-cart-plus add-to-cart"></i>
    </div>
  </div>
  <div class="card col-3">
  <img src="${featuredArray[i + 1].image[0].url}" class="card-img-top" alt="${
          featuredArray[i + 1].image[0].alternativeText
        }">
  <div class="card-body">
    <h5 class="card-title">${featuredArray[i + 1].title}</h5>
    <p class="card-text">$ ${featuredArray[i + 1].price}</p>
    <a href="product.html?id=${
      featuredArray[i + 1].id
    }" class="btn addcart">Shop now</a>
    <i class="fas fa-cart-plus add-to-cart"></i>
  </div>
</div>
  </div>
    </div>`;
      }

      const allFeatured = document.querySelectorAll(".carousel-item");
      const firstFeatured = allFeatured[0];

      firstFeatured.classList.add("active");
    }
  } catch (error) {
    console.log(error);
  }
}
getProducts();
