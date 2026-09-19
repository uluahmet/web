const header = document.getElementById("siteHeader");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 30);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

// Yorum slider
const track = document.querySelector(".review-track");
const reviews = document.querySelectorAll(".review");
const next = document.querySelector(".slider-btn.next");
const prev = document.querySelector(".slider-btn.prev");
let current = 0;

function moveSlider(index) {
  if (!track || !reviews.length) return;
  current = (index + reviews.length) % reviews.length;
  track.style.transform = `translateX(-${current * 100}%)`;
}

next?.addEventListener("click", () => moveSlider(current + 1));
prev?.addEventListener("click", () => moveSlider(current - 1));

let startX = 0;
let endX = 0;

track?.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
}, { passive: true });

track?.addEventListener("touchend", e => {
  endX = e.changedTouches[0].clientX;
  const distance = endX - startX;
  if (Math.abs(distance) > 50) {
    moveSlider(current + (distance < 0 ? 1 : -1));
  }
}, { passive: true });

document.getElementById("year").textContent = new Date().getFullYear();
