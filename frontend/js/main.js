// Cart functionality
let cart = [];
const cartCount = document.querySelector(".cart-count");

function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = total;
}

// Add products dynamically
const productGrid = document.querySelector(".product-grid");
const products = [
  {name:"Adidas Ultraboost 22", price:140, img:"./images/shoes/Addidas/2.webp"},
  {name:"Nike Air Force 1", price:115, img:"./images/shoes/Nike/2.webp"},
  {name:"Puma RS-X Bold", price:100, img:"./images/shoes/Puma/2.webp"},
  {name:"Reebok Classic Leather", price:90, img:"./images/shoes/Reebok/2.webp"},
  // Add more products here
];

products.forEach(p => {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <img src="${p.img}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p class="price">$${p.price}</p>
    <button class="add-to-cart">Add to Cart</button>
  `;
  productGrid.appendChild(div);

  div.querySelector(".add-to-cart").addEventListener("click", () => {
    const existing = cart.find(item => item.name === p.name);
    if(existing) existing.quantity++;
    else cart.push({name:p.name, price:p.price, quantity:1});
    updateCartCount();
    console.log(cart);
  });
});

// --------------------------
// Continuous forward carousel
// --------------------------
const track = document.querySelector(".carousel-track");
const slides = Array.from(document.querySelectorAll(".carousel-item"));
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;
let autoSlideInterval;

// Clone slides for seamless looping
slides.forEach(slide => {
  const clone = slide.cloneNode(true);
  track.appendChild(clone);
});

// Function to move to next slide
function moveSlide() {
  index++;
  track.style.transition = "transform 0.5s ease-in-out";
  track.style.transform = `translateX(${-index * 100}%)`;

  if(index >= slides.length) {
    setTimeout(() => {
      track.style.transition = "none";
      index = 0;
      track.style.transform = `translateX(${-index * 100}%)`;
    }, 500);
  }
}

// Manual controls
nextBtn.addEventListener("click", moveSlide);
prevBtn.addEventListener("click", () => {
  index--;
  if(index < 0) index = slides.length - 1;
  track.style.transition = "transform 0.5s ease-in-out";
  track.style.transform = `translateX(${-index * 100}%)`;
});

// Auto-slide
function startAutoSlide() { autoSlideInterval = setInterval(moveSlide, 3000); }
function stopAutoSlide() { clearInterval(autoSlideInterval); }

startAutoSlide();

// Pause when tab inactive
document.addEventListener("visibilitychange", () => {
  if(document.hidden) stopAutoSlide();
  else startAutoSlide();
});

// Initialize
track.style.transform = "translateX(0%)";