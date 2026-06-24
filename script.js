document.addEventListener("DOMContentLoaded", () => {
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
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // Modal helpers
  function openModal() {
    if (!orderModal) return;
    orderModal.classList.add("show");
    orderModal.style.display = "block";
    document.body.style.overflow = "hidden";
    orderModal.setAttribute("aria-hidden", "false");
  }

  function closeOrderModal() {
    if (!orderModal) return;
    orderModal.classList.remove("show");
    orderModal.style.display = "none";
    document.body.style.overflow = "";
    orderModal.setAttribute("aria-hidden", "true");
  }

  if (closeModal) closeModal.addEventListener("click", closeOrderModal);
  if (cancelModal) cancelModal.addEventListener("click", closeOrderModal);
  if (modalOverlay) modalOverlay.addEventListener("click", closeOrderModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && orderModal && orderModal.classList.contains("show")) {
      closeOrderModal();
    }
  });

  function updateSummary() {
    if (!orderSummaryInput) return;

    const summary = `
Customer Name: ${customerNameInput?.value || "-"}
Phone: ${customerPhoneInput?.value || "-"}
Email: ${customerEmailInput?.value || "-"}
City/State: ${cityStateInput?.value || "-"}
Address: ${customerAddressInput?.value || "-"}

Product: ${productNameInput?.value || "-"}
Price: ${productPriceInput?.value || "-"}
Size: ${sizeInput?.value || "-"}
Quantity: ${quantityInput?.value || "-"}
Preferred Color: ${colorInput?.value || "-"}
Order Type: ${printTypeInput?.value || "-"}
Custom Notes: ${customNotesInput?.value || "-"}
    `.trim();

    orderSummaryInput.value = summary;
  }

  // Buy Now buttons
  buyButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const product = button.dataset.product || "";
      const price = button.dataset.price || "";

      if (productNameInput) productNameInput.value = product;
      if (productPriceInput) productPriceInput.value = price;
      if (printTypeInput) printTypeInput.value = "Ready Product Order";

      updateSummary();
      openModal();
    });
  });

  // Custom order buttons
  customOrderButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      if (productNameInput) productNameInput.value = "Custom T-Shirt Print";
      if (productPriceInput) productPriceInput.value = "To be confirmed";
      if (printTypeInput) printTypeInput.value = "Custom Print Request";

      updateSummary();
      openModal();

      setTimeout(() => {
        if (customNotesInput) customNotesInput.focus();
      }, 150);
    });
  });

  // Update summary when form fields change
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
    if (!field) return;
    field.addEventListener("input", updateSummary);
    field.addEventListener("change", updateSummary);
  });

  // Submit
  if (orderForm) {
    orderForm.addEventListener("submit", () => {
      updateSummary();

      setTimeout(() => {
        window.location.href = "https://yashaaaaviruser.github.io/T-shirt-Store/thanks.html";
      }, 1200);
    });
  }
});
