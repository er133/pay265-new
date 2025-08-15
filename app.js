document.addEventListener("DOMContentLoaded", () => {
  const buyerViewBtn = document.getElementById("buyerView");
  const sellerViewBtn = document.getElementById("sellerView");
  const buyerSection = document.getElementById("buyerSection");
  const sellerSection = document.getElementById("sellerSection");
  const productList = document.getElementById("productList");
  const addProductForm = document.getElementById("addProductForm");
  const sellerProductsDiv = document.getElementById("sellerProducts");

  let products = JSON.parse(localStorage.getItem("pay265_products")) || [];

  function saveProducts() {
    localStorage.setItem("pay265_products", JSON.stringify(products));
  }

  function renderProducts() {
    productList.innerHTML = "";
    products.forEach((p, index) => {
      const div = document.createElement("div");
      div.classList.add("product-card");
      div.innerHTML = `
        <h3>${p.name}</h3>
        <p><strong>${p.price} MWK</strong></p>
        <p>Seller: ${p.district}</p>
        <p>Delivery: ${p.delivery}</p>
      `;
      productList.appendChild(div);
    });
  }

  function renderSellerProducts() {
    sellerProductsDiv.innerHTML = "";
    products.forEach((p, index) => {
      const div = document.createElement("div");
      div.classList.add("product-card");
      div.innerHTML = `
        <h3>${p.name}</h3>
        <p><strong>${p.price} MWK</strong></p>
        <p>${p.district}</p>
        <p>${p.delivery}</p>
        <button onclick="deleteProduct(${index})">Delete</button>
      `;
      sellerProductsDiv.appendChild(div);
    });
  }

  window.deleteProduct = function (index) {
    products.splice(index, 1);
    saveProducts();
    renderProducts();
    renderSellerProducts();
  };

  addProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const district = document.getElementById("sellerDistrict").value;
    const delivery = document.getElementById("deliveryOption").value;

    products.push({ name, price, district, delivery });
    saveProducts();
    renderProducts();
    renderSellerProducts();

    addProductForm.reset();
  });

  buyerViewBtn.addEventListener("click", () => {
    buyerSection.style.display = "block";
    sellerSection.style.display = "none";
  });

  sellerViewBtn.addEventListener("click", () => {
    buyerSection.style.display = "none";
    sellerSection.style.display = "block";
  });

  renderProducts();
  renderSellerProducts();
});
