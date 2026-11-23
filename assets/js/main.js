const WHATSAPP_NUMBER = "38970962702";

const products = [
  {
    id: 1,
    name: "Lattafa Khamrah Qahwa",
    category: "arab",
    price: 2190,
    desc: "Aromë e ëmbël orientale – hit arabik.",
    image: "assets/images/products/khamrah-qahwa.jpeg",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Lattafa Bade'e Al Oud Amethyst",
    category: "arab",
    price: 2390,
    desc: "Oud luksoz me notë florale.",
    image: "assets/images/products/amethyst.jpg",
    badge: "Premium",
  },
  {
    id: 3,
    name: "Oud Mood",
    category: "arab",
    price: 1990,
    desc: "Eau de Parfum 100ml – aromë e thellë oud.",
    image: "assets/images/products/oud-mood.jpeg",
    badge: "I ri",
  },
  {
    id: 4,
    name: "Queen of Arabia",
    category: "arab",
    price: 2490,
    desc: "Parfum arab me kapak kurorë – shumë elegant.",
    image: "assets/images/products/queen-of-arabia.jpeg",
    badge: "Luksoze",
  },
  {
    id: 5,
    name: "Lattafa Asad & Koleksion",
    category: "set",
    price: 4490,
    desc: "Asad, Oud for Glory dhe aroma të tjera Lattafa.",
    image: "assets/images/products/lattafa-men.webp",
    badge: "Set",
  },
  {
    id: 6,
    name: "Ameer Al Arab",
    category: "arab",
    price: 1890,
    desc: "Klasik arab – intens dhe i qëndrueshëm.",
    image: "assets/images/products/ameer-al-arab.webp",
    badge: null,
  },
  {
    id: 7,
    name: "Mbushje 50ml Designer",
    category: "mbushje",
    price: 990,
    desc: "Mbushje nga brandet botërore – aroma e njëjtë.",
    image: "assets/images/products/arabic-collection.webp",
    badge: "Mbushje",
  },
  {
    id: 8,
    name: "Top Arabian Set",
    category: "set",
    price: 4990,
    desc: "Përzgjedhje e aromave arabe për dhuratë.",
    image: "assets/images/products/arabian-top.webp",
    badge: "Ofertë",
  },
];

let cart = [];
let activeFilter = "all";

const productsEl = document.getElementById("products");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const whatsappOrder = document.getElementById("whatsappOrder");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

function formatPrice(n) {
  return n.toLocaleString("sq-MK") + " den";
}

function renderProducts() {
  const list =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.category === activeFilter);

  productsEl.innerHTML = list
    .map(
      (p) => `
    <article class="product-card">
      <div class="product-media">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="product-meta">
          <span class="price">${formatPrice(p.price)}</span>
          <button class="btn btn-gold btn-sm" onclick="addToCart(${p.id})">Shto</button>
        </div>
      </div>
    </article>
  `
    )
    .join("");
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;
  const existing = cart.find((item) => item.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ ...product, qty: 1 });
  updateCartUI();
  openCart();
}

function updateCartUI() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartCount.textContent = count;

  if (!cart.length) {
    cartItems.innerHTML = `<p class="cart-empty">Shporta është bosh.</p>`;
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-line">
        <img class="cart-thumb" src="${item.image}" alt="" />
        <div class="cart-line-info">
          <strong>${item.name}</strong>
          <span class="qty">${item.qty} × ${formatPrice(item.price)}</span>
        </div>
        <span class="line-price">${formatPrice(item.price * item.qty)}</span>
      </div>
    `
      )
      .join("");
  }

  cartTotal.textContent = formatPrice(total);
  const lines = cart
    .map((i) => `• ${i.name} x${i.qty} = ${i.price * i.qty} den`)
    .join("%0A");
  const msg = `Pershendetje ZamZam Parfumerie!%0ADua te porosise:%0A${lines}%0A%0ATotali: ${total} den`;
  whatsappOrder.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
}

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    renderProducts();
  });
});

renderProducts();
updateCartUI();
