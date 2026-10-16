/* =========================================================
   ourCAFE! — script.js  

   EVENTS USED (set as attributes in index.html):
     1. onclick      -> toggleMenu(), customizeItem()
     2. onmouseover  -> showFavorite(), highlightReview()
     3. onmouseout   -> hideFavorite(), resetReview()
     4. onscroll     -> updateHeader()  (<body onscroll="...">)
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

/* FUNCTION 5 — customizeItem(name)               [onclick] */
function customizeItem(name) {
  const options = document.getElementById("options-" + name);
  const button = document.getElementById("customize-" + name);
  if (!options || !button) return;

  const isOpen = options.style.display === "block";

  if (isOpen) {
    options.style.display = "none";
    button.innerHTML = "Customize ›";
  } else {
    options.style.display = "block";
    button.innerHTML = "Hide options ⌄";
  }
}

/* FUNCTION 6 — highlightReview(id)               [onmouseover] */
function highlightReview(id) {
  const review = document.getElementById(id);
  if (!review) return;

  review.style.backgroundColor = "#ffc83d";
  review.style.transform = "translateX(-10px)";
}

/* FUNCTION 7 — resetReview(id)                   [onmouseout] */
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
