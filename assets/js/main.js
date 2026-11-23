const WHATSAPP_NUMBER = "38970962702";

const products = [
  {
    id: 1,
    name: "Lattafa Asad",
    category: "arab",
    price: 1890,
    desc: "Aromë e fortë orientale – hit arabik.",
    image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Afnan 9pm",
    category: "arab",
    price: 2190,
    desc: "I ëmbël dhe modern – për mbrëmje.",
    image: "https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: "Premium",
  },
  {
    id: 3,
    name: "Maison Alhambra",
    category: "arab",
    price: 1690,
    desc: "Inspirim luksoz me qëndrueshmëri të lartë.",
    image: "https://images.pexels.com/photos/1961798/pexels-photo-1961798.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: "I ri",
  },
  {
    id: 4,
    name: "Mbushje 50ml Designer",
    category: "mbushje",
    price: 990,
    desc: "Mbushje nga brandet botërore – aroma e njëjtë.",
    image: "https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: "Mbushje",
  },
  {
    id: 5,
    name: "Mbushje 100ml Exclusive",
    category: "mbushje",
    price: 1490,
    desc: "Sasi më e madhe, çmim më i mirë.",
    image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: "Vlerë",
  },
  {
    id: 6,
    name: "Set Arab Trio",
    category: "set",
    price: 4490,
    desc: "3 aroma arabe për dhuratë ose koleksion.",
    image: "https://images.pexels.com/photos/755992/pexels-photo-755992.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: "Ofertë",
  },
  {
    id: 7,
    name: "Lattafa Yara",
    category: "arab",
    price: 1790,
    desc: "Aromë e ëmbël dhe femërore.",
    image: "https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: null,
  },
  {
    id: 8,
    name: "Oud Royal Attar",
    category: "arab",
    price: 2490,
    desc: "Parfum vajor arab – oud klasik.",
    image: "https://images.pexels.com/photos/2659939/pexels-photo-2659939.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: "Oud",
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
