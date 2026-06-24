const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const orderModal = document.getElementById("orderModal");
const closeModal = document.getElementById("closeModal");
const cancelModal = document.getElementById("cancelModal");
const modalOverlay = document.getElementById("modalOverlay");

const buyButtons = document.querySelectorAll(".buy-btn");
const customOrderButtons = document.querySelectorAll(".open-custom-order");

const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const printTypeInput = document.getElementById("printType");
const quantityInput = document.getElementById("quantity");
const sizeInput = document.getElementById("size");
const colorInput = document.getElementById("color");
const customNotesInput = document.getElementById("customNotes");

const customerNameInput = document.getElementById("customerName");
const customerPhoneInput = document.getElementById("customerPhone");
const customerEmailInput = document.getElementById("customerEmail");
const cityStateInput = document.getElementById("cityState");
const customerAddressInput = document.getElementById("customerAddress");
const orderSummaryInput = document.getElementById("orderSummary");

const orderForm = document.getElementById("orderForm");

// Mobile nav
menuBtn?.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Modal helpers
function openModal() {
  orderModal.classList.add("show");
  document.body.style.overflow = "hidden";
  orderModal.setAttribute("aria-hidden", "false");
}

function closeOrderModal() {
  orderModal.classList.remove("show");
  document.body.style.overflow = "";
  orderModal.setAttribute("aria-hidden", "true");
}

closeModal?.addEventListener("click", closeOrderModal);
cancelModal?.addEventListener("click", closeOrderModal);
modalOverlay?.addEventListener("click", closeOrderModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && orderModal.classList.contains("show")) {
    closeOrderModal();
  }
});

// Open modal from product buttons
buyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.dataset.product || "";
    const price = button.dataset.price || "";

    productNameInput.value = product;
    productPriceInput.value = price;
    printTypeInput.value = "Ready Product Order";

    updateSummary();
    openModal();
  });
});

// Open modal for custom print
customOrderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    productNameInput.value = "Custom T-Shirt Print";
    productPriceInput.value = "To be confirmed";
    printTypeInput.value = "Custom Print Request";

    updateSummary();
    openModal();

    setTimeout(() => {
      customNotesInput?.focus();
    }, 100);
  });
});

// Auto summary builder
function updateSummary() {
  const summary = `
Customer Name: ${customerNameInput.value || "-"}
Phone: ${customerPhoneInput.value || "-"}
Email: ${customerEmailInput.value || "-"}
City/State: ${cityStateInput.value || "-"}
Address: ${customerAddressInput.value || "-"}

Product: ${productNameInput.value || "-"}
Price: ${productPriceInput.value || "-"}
Size: ${sizeInput.value || "-"}
Quantity: ${quantityInput.value || "-"}
Preferred Color: ${colorInput.value || "-"}
Order Type: ${printTypeInput.value || "-"}
Custom Notes: ${customNotesInput.value || "-"}
  `.trim();

  orderSummaryInput.value = summary;
}

// Rebuild summary whenever fields change
[
  customerNameInput,
  customerPhoneInput,
  customerEmailInput,
  cityStateInput,
  customerAddressInput,
  productNameInput,
  productPriceInput,
  sizeInput,
  quantityInput,
  colorInput,
  printTypeInput,
  customNotesInput
].forEach((field) => {
  field?.addEventListener("input", updateSummary);
  field?.addEventListener("change", updateSummary);
});

// On submit: update summary, then redirect manually
orderForm?.addEventListener("submit", () => {
  updateSummary();

  setTimeout(() => {
    window.location.href = "https://yashaaaaviruser.github.io/T-shirt-Store/thanks.html";
  }, 1200);
});
