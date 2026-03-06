// ===== MENU MOBILE =====
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
let isOpen = false;

// Initialement on cache le menu
mobileNav.style.display = "none";

menuBtn?.addEventListener("click", () => {
  isOpen = !isOpen;

  // Affiche ou cache uniquement le menu mobile
  mobileNav.style.display = isOpen ? "block" : "none";
  mobileNav.hidden = !isOpen;

  // Accessibilité
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

// Ferme le menu mobile et gère le scroll vers les ancres
// (déplacement manuel évite les problèmes quand on est déjà loin dans la page)
document.querySelectorAll("#mobileNav a[href^='#']").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();                // on empêche d'abord le comportement natif

    // cache le menu immédiatement
    isOpen = false;
    mobileNav.style.display = "none";
    menuBtn.setAttribute("aria-expanded", "false");

    // puis on fait le scroll vers la cible
    const targetId = link.getAttribute("href");
    const targetEl = targetId && document.querySelector(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});



// ===== Contact form =====
const form = document.getElementById("contactForm");
const hint = document.getElementById("formHint");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const name = (data.get("name") || "").toString().trim();
  const email = (data.get("email") || "").toString().trim();
  const message = (data.get("message") || "").toString().trim();

  if (name.length < 2) return showHint("Ton nom est trop court.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showHint("Email invalide.");
  if (message.length < 10) return showHint("Ton message est trop court.");

  showHint("✅ Message prêt ! (Ici tu peux connecter à WhatsApp, Email, ou un backend).");

  form.reset();
});

function showHint(msg) {
  if (!hint) return;
  hint.textContent = msg;
}

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== FAQ toggle mobile =====
const faqBtn = document.getElementById("faqBtn");
const faqWrap = document.querySelector(".nav-faq");

faqBtn?.addEventListener("click", () => {
  faqWrap.classList.toggle("open");
});
