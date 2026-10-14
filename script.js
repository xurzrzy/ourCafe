/* =========================================================
   ourCAFE! — script.js  

   EVENTS USED (set as attributes in index.html):
     1. onclick   -> toggleMenu()   (hamburger button in the header)
     2. onscroll  -> updateHeader() (<body onscroll="...">)
   ========================================================= */

/* ---------- Hamburger button contents ---------- */
const MENU_OPEN_ICON = "<span></span><span></span><span></span>";
const MENU_CLOSE_ICON = "✕";

/* FUNCTION 1 — toggleMenu()                      [onclick] */
function toggleMenu() {
  const nav = document.getElementById("mainNav");
  const button = document.getElementById("menuToggle");
  if (!nav || !button) return;

  const isOpen = nav.style.display === "flex";

  if (isOpen) {
    nav.style.display = "none";
    button.innerHTML = MENU_OPEN_ICON;
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open navigation");
  } else {
    nav.style.display = "flex";
    button.innerHTML = MENU_CLOSE_ICON;
    button.setAttribute("aria-expanded", "true");
    button.setAttribute("aria-label", "Close navigation");
  }
}

/* FUNCTION 2 — updateHeader()                    [onscroll] */
function updateHeader() {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  if (window.scrollY > 60) {
    header.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.45)";
    header.style.minHeight = "78px";
  } else {
    header.style.boxShadow = "none";
    header.style.minHeight = "";
    
  }
}