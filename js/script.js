document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     HELPER CART
  ========================== */
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  /* =========================
     HALAMAN PRODUK
  ========================== */
  const qtyEl = document.querySelector(".qty");
  const addBtn = document.querySelector(".btn-add");
  const reduceBtn = document.querySelector(".btn-reduce");
  const sizeBtns = document.querySelectorAll(".size-btn");
  const addToCartBtn = document.getElementById("addToCartBtn");

  if (qtyEl && addBtn && reduceBtn && addToCartBtn) {

    let qty = 0;
    let selectedSize = null;
    const price = 569000;
    const productName = "Velocity X";

    // + jumlah
    addBtn.addEventListener("click", () => {
      qty++;
      qtyEl.textContent = qty;
    });

    // - jumlah
    reduceBtn.addEventListener("click", () => {
      if (qty > 0) {
        qty--;
        qtyEl.textContent = qty;
      }
    });

    // pilih ukuran
    sizeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        sizeBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedSize = btn.textContent;
      });
    });

    // tambah ke keranjang
    addToCartBtn.addEventListener("click", () => {
      if (qty === 0) {
        alert("Pilih jumlah produk!");
        return;
      }

      if (!selectedSize) {
        alert("Pilih ukuran produk!");
        return;
      }

      const cart = getCart();
      const existing = cart.find(
        item => item.name === productName && item.size === selectedSize
      );

      if (existing) {
        existing.qty += qty;
      } else {
        cart.push({
          name: productName,
          price: price,
          qty: qty,
          size: selectedSize
        });
      }

      saveCart(cart);
      window.location.href = "basket.html";
    });
  }

  /* =========================
     HALAMAN BASKET / CHECKOUT
  ========================== */
  const tbody = document.getElementById("checkoutTableBody");
  const totalEl = document.getElementById("checkoutTotal");

  if (tbody && totalEl) {
    const cart = getCart();
    tbody.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      const subtotal = item.price * item.qty;
      total += subtotal;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.size}</td>
        <td>${item.qty}</td>
        <td>Rp ${item.price.toLocaleString("id-ID")}</td>
        <td>Rp ${subtotal.toLocaleString("id-ID")}</td>
      `;
      tbody.appendChild(tr);
    });

    totalEl.textContent = `Rp ${total.toLocaleString("id-ID")}`;
  }

});

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "on");
    } else {
        localStorage.setItem("darkMode", "off");
    }
}

// Aktifkan otomatis jika sebelumnya ON
window.addEventListener("load", function () {
    if (localStorage.getItem("darkMode") === "on") {
        document.body.classList.add("dark-mode");
    }
});