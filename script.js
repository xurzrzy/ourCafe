/* =========================================================
   ourCAFE! — script.js  

   EVENTS USED:
     1. onclick      -> toggleMenu(), closeNewsletter(), submitNewsletter()
     2. onmouseover  -> showFavorite(), highlightReview()
     3. onmouseout   -> hideFavorite(), resetReview()
     4. onscroll     -> updateHeader()  (<body onscroll="...">)
   ========================================================= */

/* ---------- Hamburger button contents ---------- */
const MENU_OPEN_ICON = "<span></span><span></span><span></span>";
const MENU_CLOSE_ICON = "✕";

/* ---------- Newsletter popup: localStorage key ---------- */
const NEWSLETTER_KEY = "ourcafeNewsletterSeen";

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

/* FUNCTION 3 — showFavorite(name)                [onmouseover] */
function showFavorite(name) {
  const card = document.getElementById("card-" + name);
  const image = document.getElementById("img-" + name);
  if (!card || !image) return;

  card.style.transform = "translateY(-8px)";
  card.style.boxShadow = "0 20px 36px rgba(58, 36, 28, 0.35)";
  image.style.transform = "scale(1.06) rotate(-2deg)";
}

/* FUNCTION 4 — hideFavorite(name)                [onmouseout] */
function hideFavorite(name) {
  const card = document.getElementById("card-" + name);
  const image = document.getElementById("img-" + name);
  if (!card || !image) return;

  card.style.transform = "translateY(0)";
  card.style.boxShadow = "";
  image.style.transform = "";
}


/* FUNCTION 5 — openNewsletter()  */
function openNewsletter() {
  const modal = document.getElementById("newsletterModal");
  const input = document.getElementById("newsletterEmail");
  if (!modal) return;

  try {
    if (localStorage.getItem(NEWSLETTER_KEY)) return;
    localStorage.setItem(NEWSLETTER_KEY, "yes");
  } catch (error) {
    return;   
  }

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";   
  if (input) input.focus();
}

/* FUNCTION 6 — closeNewsletter(event)            [onclick] */
function closeNewsletter(event) {
  const modal = document.getElementById("newsletterModal");
  if (!modal) return;

  if (event && event.target !== modal) return;

  // Ignore repeat clicks while the slide-down is already playing
  if (modal.classList.contains("closing")) return;

  // Slide down first, then hide once the animation (0.3s) is done
  modal.classList.add("closing");
  setTimeout(() => {
    modal.style.display = "none";
    modal.classList.remove("closing");
    document.body.style.overflow = "";
  }, 300);   // must match the 0.3s in the CSS
}

/* FUNCTION 7 — submitNewsletter()                [onclick] */
function submitNewsletter() {
  const input = document.getElementById("newsletterEmail");
  const message = document.getElementById("newsletterMsg");
  if (!input || !message) return;

  const email = input.value.trim();
  const looksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!looksValid) {
    message.innerHTML = "Please enter a valid email address.";
    message.style.color = "#b3261e";
    input.style.borderColor = "#b3261e";
    return;
  }

  message.innerHTML = "You're in! Welcome to the ourPEOPLE Club.";
  message.style.color = "#2e7d32";
  input.style.borderColor = "#2e7d32";
  setTimeout(closeNewsletter, 1500);
}

setTimeout(openNewsletter, 600);

/* FUNCTION 8 — highlightReview(id)               [onmouseover] */
function highlightReview(id) {
  const review = document.getElementById(id);
  if (!review) return;

  review.style.backgroundColor = "#ffc83d";
  review.style.transform = "translateX(-10px)";
}

/* FUNCTION 9 — resetReview(id)                  [onmouseout] */
function resetReview(id) {
  const review = document.getElementById(id);
  if (!review) return;

  review.style.backgroundColor = "";
  review.style.transform = "";
}

/* FUNCTION 8 — filterMenu(category)              [onclick] */
function filterMenu(category) {
  const cards = document.getElementsByClassName("menu-card");
  const tabs = document.getElementsByClassName("tab-btn");

  // Show only the cards that match the chosen category
  for (let i = 0; i < cards.length; i++) {
    if (category === "all" || cards[i].dataset.category === category) {
      cards[i].style.display = "block";
    } else {
      cards[i].style.display = "none";
    }
  }

  // Move the "active" look to the clicked tab
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }
  const activeTab = document.getElementById("tab-" + category);
  if (activeTab) activeTab.classList.add("active");
}

/* FUNCTION 9 — scrollCards(direction)            [onclick] */

function scrollCards(direction, rowId) {
  const row = document.getElementById(rowId);
  row.scrollLeft = row.scrollLeft + direction * 330;
}
