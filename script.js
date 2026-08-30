const activities = {
  // For multiple photos in one card, use: images: ["assets/activities/photo-1.jpg", "assets/activities/photo-2.jpg"]
  quizzes: [
    {
      title: "Emerging Technologies — Quiz 1",
      date: "Graded quiz",
      images: ["assets/quiz1_1.png", "assets/quiz1_2.png"],
    },
  ],
  laboratory: [
    {
      title: "Your first laboratory activity",
      date: "Coming soon",
      image: null,
    },
  ],
  examinations: [
    { title: "Your first examination", date: "Coming soon", image: null },
  ],
};

const dialog = document.querySelector("#image-dialog");
const dialogImage = dialog?.querySelector("img");
const dialogPrevious = dialog?.querySelector(".dialog-previous");
const dialogNext = dialog?.querySelector(".dialog-next");
const dialogCount = dialog?.querySelector(".dialog-count");
let activeImages = [];
let activeImageIndex = 0;

function showDialogImage() {
  const image = activeImages[activeImageIndex];
  if (!image || !dialogImage) return;
  dialogImage.src = image;
  dialogImage.alt = `Activity photo ${activeImageIndex + 1}`;
  if (dialogCount) dialogCount.textContent = `${activeImageIndex + 1} of ${activeImages.length}`;
  if (dialogPrevious) dialogPrevious.hidden = activeImages.length < 2;
  if (dialogNext) dialogNext.hidden = activeImages.length < 2;
}

Object.entries(activities).forEach(([category, items]) => {
  const grid = document.querySelector(`#${category}-grid`);
  if (!grid) return;
  grid.innerHTML = items
    .map(
      (item) => {
        const images = item.images || (item.image ? [item.image] : []);
        return `
    <figure class="activity-card" ${images.length ? 'tabindex="0" role="button" data-images=\'' + JSON.stringify(images) + "'" : ""}>
      ${images.length ? `<img src="${images[0]}" alt="${item.title}" loading="lazy">${images.length > 1 ? `<span class="photo-count">${images.length} photos</span>` : ""}` : `<div class="image-placeholder">Photo will be added after grading</div>`}
      <figcaption><strong>${item.title}</strong><small>${item.date}</small></figcaption>
    </figure>`;
      },
    )
    .join("");
});
document.addEventListener("click", (event) => {
  const card = event.target.closest(".activity-card");
  if (card?.dataset.images && dialog) {
    activeImages = JSON.parse(card.dataset.images);
    activeImageIndex = 0;
    showDialogImage();
    dialog.showModal();
  }
});

dialogPrevious?.addEventListener("click", () => {
  activeImageIndex = (activeImageIndex - 1 + activeImages.length) % activeImages.length;
  showDialogImage();
});
dialogNext?.addEventListener("click", () => {
  activeImageIndex = (activeImageIndex + 1) % activeImages.length;
  showDialogImage();
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
  const closeBtn = dialog.querySelector(".dialog-close");
  closeBtn?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        nav?.classList.remove("open");
        navToggle?.setAttribute("aria-expanded", "false");
      }
    }
  });
});

// Contact form: use mailto fallback
const form = document.querySelector("#contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const message = data.get("message") || "";
    const subject = encodeURIComponent(`Contact from ${name}`);
    const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
    window.location.href = `mailto:paulandrew.samson@cvsu.edu.ph?subject=${subject}&body=${body}`;
  });
}

// Year
document.querySelector("#year").textContent = new Date().getFullYear();