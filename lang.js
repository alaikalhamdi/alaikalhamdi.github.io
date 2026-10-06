/**
 * Language Switcher Utility (Indonesian & English)
 * Alaikal Hamdi Portfolio
 */

(function () {
  const STORAGE_KEY = 'site_lang';
  const FALLBACK_LANG = 'en';

  /**
   * Retrieves current language from localStorage or fallback
   * @returns {'en'|'id'}
   */
  window.getLanguage = function () {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('preferred_language');
      if (stored === 'id' || stored === 'en') {
        return stored;
      }
    } catch (e) {
      console.warn('LocalStorage unavailable:', e);
    }
    return FALLBACK_LANG;
  };

  /**
   * Sets the active language across the document
   * @param {'en'|'id'} lang
   */
  window.setLanguage = function (lang) {
    if (lang !== 'id' && lang !== 'en') {
      lang = FALLBACK_LANG;
    }

    try {
      localStorage.setItem(STORAGE_KEY, lang);
      localStorage.setItem('preferred_language', lang);
    } catch (e) {
      console.warn('LocalStorage unavailable:', e);
    }

    // Set HTML lang attribute
    document.documentElement.lang = lang;

    // 1. Update text/html on elements with data-en & data-id
    const translatableElements = document.querySelectorAll('[data-en][data-id]');
    translatableElements.forEach((el) => {
      const text = el.getAttribute('data-' + lang);
      if (text !== null) {
        el.innerHTML = text;
      }
    });

    // 2. Update placeholders
    const placeholderElements = document.querySelectorAll('[data-en-placeholder][data-id-placeholder]');
    placeholderElements.forEach((el) => {
      const ph = el.getAttribute('data-' + lang + '-placeholder');
      if (ph !== null) {
        el.placeholder = ph;
      }
    });

    // 3. Update titles & aria-labels
    const titleElements = document.querySelectorAll('[data-en-title][data-id-title]');
    titleElements.forEach((el) => {
      const val = el.getAttribute('data-' + lang + '-title');
      if (val !== null) {
        el.title = val;
        el.setAttribute('aria-label', val);
      }
    });

    // 4. Update page title if <title> has data attributes
    const docTitle = document.querySelector('title[data-en][data-id]');
    if (docTitle) {
      const t = docTitle.getAttribute('data-' + lang);
      if (t) document.title = t;
    }

    // 5. Update language switcher pill buttons
    const enButtons = document.querySelectorAll('.lang-btn-en');
    const idButtons = document.querySelectorAll('.lang-btn-id');

    enButtons.forEach((btn) => {
      if (lang === 'en') {
        btn.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
        btn.classList.remove('text-gray-600', 'dark:text-gray-300', 'hover:text-blue-600', 'dark:hover:text-blue-400');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
        btn.classList.add('text-gray-600', 'dark:text-gray-300', 'hover:text-blue-600', 'dark:hover:text-blue-400');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    idButtons.forEach((btn) => {
      if (lang === 'id') {
        btn.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
        btn.classList.remove('text-gray-600', 'dark:text-gray-300', 'hover:text-blue-600', 'dark:hover:text-blue-400');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
        btn.classList.add('text-gray-600', 'dark:text-gray-300', 'hover:text-blue-600', 'dark:hover:text-blue-400');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // 6. Update single toggle button (e.g. on CV page: #language-switch)
    const toggleBtn = document.getElementById('language-switch');
    if (toggleBtn) {
      toggleBtn.textContent = lang === 'en' ? 'Lihat dalam Bahasa Indonesia' : 'View in English';
    }

    // 7. Dispatch custom event for page-specific dynamic logic (e.g., project modals)
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
  };

  /**
   * Helper to toggle language
   */
  window.toggleLanguage = function () {
    const current = window.getLanguage();
    window.setLanguage(current === 'en' ? 'id' : 'en');
  };

  // Initialize immediately or on DOM ready
  const initLang = window.getLanguage();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.setLanguage(initLang);
    });
  } else {
    window.setLanguage(initLang);
  }
})();
