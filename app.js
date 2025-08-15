// Product List Storage
let products = JSON.parse(localStorage.getItem("products")) || [];

// Districts in Malawi
const malawiDistricts = [
    "Blantyre", "Lilongwe", "Mzuzu", "Zomba", "Mangochi", "Salima", 
    "Karonga", "Nkhotakota", "Balaka", "Chikwawa", "Chiradzulu", 
    "Machinga", "Mulanje", "Mwanza", "Nsanje", "Ntcheu", "Dedza", 
    "Rumphi", "Mzimba", "Dowa", "Kasungu", "Nkhata Bay", "Ntchisi", 
    "Likoma", "Thyolo", "Phalombe"
];

// Populate district dropdown
function populateDistricts() {
    const districtSelect = document.getElementById("district");
    malawiDistricts.forEach(d => {
        let option = document.createElement("option");
        option.value = d;
        option.textContent = d;
        districtSelect.appendChild(option);
    });
}

// Add product
function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const district = document.getElementById("district").value;
    const delivery = document.querySelector('input[name="deliveryOption"]:checked').value;

    if (name && price && district) {
        products.push({ name, price, district, delivery });
        localStorage.setItem("products", JSON.stringify(products));
        document.getElementById("sellerForm").reset();
        displayProducts();
    }
}

// Display products
function displayProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    products.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <h3>${p.name}</h3>
            <p><strong>MWK:</strong> ${p.price}</p>
            <p><strong>District:</strong> ${p.district}</p>
            <p><strong>Option:</strong> ${p.delivery}</p>
        `;
        productList.appendChild(card);
    });
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
    populateDistricts();
    displayProducts();
    document.getElementById("sellerForm").addEventListener("submit", addProduct);
});
