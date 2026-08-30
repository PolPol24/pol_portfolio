const activities = {
  quizzes: [{ title: "Your first quiz", date: "Coming soon", image: null }],
  laboratory: [{ title: "Your first laboratory activity", date: "Coming soon", image: null }],
  examinations: [{ title: "Your first examination", date: "Coming soon", image: null }],
};

const dialog = document.querySelector("#image-dialog");
const dialogImage = dialog?.querySelector("img");

Object.entries(activities).forEach(([category, items]) => {
  const grid = document.querySelector(`#${category}-grid`);
  if (!grid) return;
  grid.innerHTML = items.map((item) => `
    <figure class="activity-card" ${item.image ? 'tabindex="0" role="button"' : ""}>
      ${item.image ? `<img src="${item.image}" alt="${item.title}" loading="lazy">` : `<div class="image-placeholder">Photo will be added after grading</div>`}
      <figcaption><strong>${item.title}</strong><small>${item.date}</small></figcaption>
    </figure>`).join("");

});
document.addEventListener("click", (event) => {
  const image = event.target.closest(".activity-card")?.querySelector("img");
  if (image && dialog && dialogImage) { dialogImage.src = image.src; dialogImage.alt = image.alt; dialog.showModal(); }
});

// Navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
if (navToggle && nav) {
  navToggle.addEventListener("click", (e) => {
    nav.classList.toggle("open");
    const expanded = nav.classList.contains("open");
    navToggle.setAttribute("aria-expanded", expanded);
  });
}

// Close image dialog
if (dialog) {
  const closeBtn = dialog.querySelector("button");
  closeBtn?.addEventListener("click", () => dialog.close());
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); nav?.classList.remove('open'); navToggle?.setAttribute('aria-expanded', 'false'); }
    }
  });
});

// Contact form: use mailto fallback
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name') || '';
    const email = data.get('email') || '';
    const message = data.get('message') || '';
    const subject = encodeURIComponent(`Contact from ${name}`);
    const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
    window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${body}`;
  });
}

// Year
document.querySelector("#year").textContent = new Date().getFullYear();
