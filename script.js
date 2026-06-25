document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     1) MOBILE NAV
  ========================================================= */
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
      });
    });
  }

  /* =========================================================
     2) PRODUCT SLIDER / CAROUSEL
     Works with the NEW horizontal product section.
     Required HTML IDs/classes:
       - #productTrack
       - .product-slide
       - #prevProduct
       - #nextProduct
       - #productDots (optional)
  ========================================================= */
  const productTrack = document.getElementById("productTrack");
  const productSlides = Array.from(document.querySelectorAll(".product-slide"));
  const prevProductBtn = document.getElementById("prevProduct");
  const nextProductBtn = document.getElementById("nextProduct");
  const productDotsWrap = document.getElementById("productDots");

  let currentProductIndex = 0;
  let sliderAutoPlay = null;

  function setupProductDots() {
    if (!productDotsWrap || productSlides.length === 0) return;

    productDotsWrap.innerHTML = "";

    productSlides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slider-dot";
      dot.setAttribute("aria-label", `Go to product ${index + 1}`);

      dot.addEventListener("click", () => {
        currentProductIndex = index;
        updateProductSlider(true);
        restartAutoPlay();
      });

      productDotsWrap.appendChild(dot);
    });
  }

  function updateProductSlider(animate = true) {
    if (!productTrack || productSlides.length === 0) return;

    productSlides.forEach((slide, index) => {
      slide.classList.remove("active", "prev", "next", "far");

      if (index === currentProductIndex) {
        slide.classList.add("active");
      } else if (index === currentProductIndex - 1) {
        slide.classList.add("prev");
      } else if (index === currentProductIndex + 1) {
        slide.classList.add("next");
      } else {
        slide.classList.add("far");
      }
    });

    // On mobile: translate full width
    // On desktop: CSS can use the active/prev/next classes for the pop effect
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      const offset = currentProductIndex * 100;
      productTrack.style.transform = `translateX(-${offset}%)`;
    } else {
      // Keep centered card visible on desktop too
      const activeSlide = productSlides[currentProductIndex];
      if (activeSlide) {
        const slideWidth = activeSlide.offsetWidth;
        const gap = 24; // should match CSS gap
        const offset = currentProductIndex * (slideWidth + gap);
        productTrack.style.transform = `translateX(calc(50% - ${slideWidth / 2}px - ${offset}px))`;
      }
    }

    if (productDotsWrap) {
      const dots = productDotsWrap.querySelectorAll(".slider-dot");
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentProductIndex);
      });
    }
  }

  function nextProduct() {
    if (productSlides.length === 0) return;
    currentProductIndex =
      currentProductIndex >= productSlides.length - 1 ? 0 : currentProductIndex + 1;
    updateProductSlider(true);
  }

  function prevProduct() {
    if (productSlides.length === 0) return;
    currentProductIndex =
      currentProductIndex <= 0 ? productSlides.length - 1 : currentProductIndex - 1;
    updateProductSlider(true);
  }

  function startAutoPlay() {
    if (productSlides.length <= 1) return;
    stopAutoPlay();
    sliderAutoPlay = setInterval(() => {
      nextProduct();
    }, 3500);
  }

  function stopAutoPlay() {
    if (sliderAutoPlay) {
      clearInterval(sliderAutoPlay);
      sliderAutoPlay = null;
    }
  }

  function restartAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  if (productTrack && productSlides.length > 0) {
    setupProductDots();
    updateProductSlider(false);
    startAutoPlay();

    if (nextProductBtn) {
      nextProductBtn.addEventListener("click", () => {
        nextProduct();
        restartAutoPlay();
      });
    }

    if (prevProductBtn) {
      prevProductBtn.addEventListener("click", () => {
        prevProduct();
        restartAutoPlay();
      });
    }

    // Pause autoplay on hover/touch over slider area
    const sliderArea =
      document.querySelector(".products-slider-section") ||
      document.querySelector(".products-slider") ||
      productTrack.parentElement;

    if (sliderArea) {
      sliderArea.addEventListener("mouseenter", stopAutoPlay);
      sliderArea.addEventListener("mouseleave", startAutoPlay);
      sliderArea.addEventListener("touchstart", stopAutoPlay, { passive: true });
      sliderArea.addEventListener("touchend", startAutoPlay, { passive: true });
    }

    window.addEventListener("resize", () => {
      updateProductSlider(false);
    });
  }

  /* =========================================================
     3) ORDER MODAL / FORM
  ========================================================= */
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

  function openModal() {
    if (!orderModal) return;
    orderModal.classList.add("show");
    orderModal.style.display = "block";
    orderModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeOrderModal() {
    if (!orderModal) return;
    orderModal.classList.remove("show");
    orderModal.style.display = "none";
    orderModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (closeModal) closeModal.addEventListener("click", closeOrderModal);
  if (cancelModal) cancelModal.addEventListener("click", closeOrderModal);
  if (modalOverlay) modalOverlay.addEventListener("click", closeOrderModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && orderModal?.classList.contains("show")) {
      closeOrderModal();
    }
  });

  function updateSummary() {
    if (!orderSummaryInput) return;

    const summary = `
Customer Name: ${customerNameInput?.value || "-"}
Phone: ${customerPhoneInput?.value || "-"}
Email: ${customerEmailInput?.value || "-"}
City / State: ${cityStateInput?.value || "-"}
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

  // BUY NOW buttons
  buyButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const product = button.dataset.product || "";
      const price = button.dataset.price || "";

      if (productNameInput) productNameInput.value = product;
      if (productPriceInput) productPriceInput.value = `₹${price}`;
      if (printTypeInput) printTypeInput.value = "Ready Product Order";

      updateSummary();
      openModal();
    });
  });

  // CUSTOM ORDER buttons
  customOrderButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      if (productNameInput) productNameInput.value = "Custom T-Shirt Print";
      if (productPriceInput) productPriceInput.value = "To be confirmed";
      if (printTypeInput) printTypeInput.value = "Custom Print Request";

      updateSummary();
      openModal();

      setTimeout(() => {
        customNotesInput?.focus();
      }, 150);
    });
  });

  // Auto summary rebuild
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

  // Submit form
  if (orderForm) {
    orderForm.addEventListener("submit", () => {
      updateSummary();

      setTimeout(() => {
        window.location.href = "https://yashaaaaviruser.github.io/T-shirt-Store/thanks.html";
      }, 1200);
    });
  }
});
