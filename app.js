// List of Malawi districts
const districts = [
    "Balaka", "Blantyre", "Chikwawa", "Chiradzulu", "Chitipa", "Dedza",
    "Dowa", "Karonga", "Kasungu", "Likoma", "Lilongwe", "Machinga",
    "Mangochi", "Mchinji", "Mulanje", "Mwanza", "Mzimba", "Neno",
    "Nkhata Bay", "Nkhotakota", "Nsanje", "Ntcheu", "Ntchisi",
    "Phalombe", "Rumphi", "Salima", "Thyolo", "Zomba"
];

// Populate district dropdown
const districtSelect = document.getElementById("district");
districts.forEach(d => {
    const option = document.createElement("option");
    option.value = d;
    option.textContent = d;
    districtSelect.appendChild(option);
});

const sellerForm = document.getElementById("sellerForm");
const productList = document.getElementById("productList");

// Handle seller form submission
sellerForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productDistrict = document.getElementById("district").value;
    const deliveryOption = document.querySelector('input[name="deliveryOption"]:checked').value;

    // Create product card
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
        <h3>${productName}</h3>
        <p><strong>Price:</strong> MWK ${productPrice}</p>
        <p><strong>Location:</strong> ${productDistrict}</p>
        <p><strong>Option:</strong> ${deliveryOption}</p>
    `;

    productList.appendChild(card);

    // Reset form
    sellerForm.reset();
});
