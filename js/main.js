// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Reveal-on-scroll for sections and product cards
const revealTargets = document.querySelectorAll(
  '.story-copy, .story-art, .product-tile, .section-head, .wholesale-inner, .contact-inner'
);
revealTargets.forEach((el) => el.setAttribute('data-reveal', ''));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealTargets.forEach((el) => observer.observe(el));

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// --- Currency picker ---
// Indicative conversion rates from INR — for display only, not live rates.
const CURRENCY = {
  INR: { symbol: '₹', rate: 1 },
  USD: { symbol: '$', rate: 1 / 83 },
  GBP: { symbol: '£', rate: 1 / 105 },
  EUR: { symbol: '€', rate: 1 / 90 },
};

const currencySelect = document.getElementById('currency-select');

function formatPrice(inrAmount, currencyCode) {
  const { symbol, rate } = CURRENCY[currencyCode] || CURRENCY.INR;
  const value = inrAmount * rate;
  const formatted = currencyCode === 'INR'
    ? Math.round(value).toLocaleString('en-IN')
    : value.toFixed(2);
  return `${symbol}${formatted}`;
}

function renderPrices() {
  const currencyCode = currencySelect ? currencySelect.value : 'INR';
  document.querySelectorAll('.price[data-inr]').forEach((el) => {
    el.textContent = formatPrice(Number(el.dataset.inr), currencyCode);
  });
}

if (currencySelect) {
  const saved = localStorage.getItem('hamm-currency');
  if (saved && CURRENCY[saved]) currencySelect.value = saved;
  currencySelect.addEventListener('change', () => {
    localStorage.setItem('hamm-currency', currencySelect.value);
    renderPrices();
  });
}
renderPrices();

// --- Product variant tabs ---
document.querySelectorAll('.product-tile').forEach((tile) => {
  const tabs = tile.querySelectorAll('.variant-tab');
  if (!tabs.length) return;

  const packVisual = tile.querySelector('.pack-visual');
  const variantLabel = tile.querySelector('.pack-variant-label');
  const desc = tile.querySelector('.product-desc');
  const priceEl = tile.querySelector('.price');
  const priceUnit = tile.querySelector('.price-unit');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      const { label, color, color2, price, weight, desc: description } = tab.dataset;

      if (packVisual) {
        packVisual.style.setProperty('--pack-color', color);
        packVisual.style.setProperty('--pack-color-2', color2);
      }
      if (variantLabel) variantLabel.textContent = label;
      if (desc) desc.textContent = description;
      if (priceEl) priceEl.dataset.inr = price;
      if (priceUnit) priceUnit.textContent = `/ ${weight}`;

      renderPrices();
    });
  });
});
