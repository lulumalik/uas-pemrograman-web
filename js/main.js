/* ==========================================================================
   Main Application Entry Point - Edukasi Platform
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Render Cards for Section 2
  if (typeof renderMateriCards === 'function') {
    renderMateriCards();
  }

  // 2. Initialize Modal Module for Section 2
  if (typeof initModalModule === 'function') {
    initModalModule();
  }

  // 3. Initialize Table & Filters for Section 4
  if (typeof initTableFilterModule === 'function') {
    initTableFilterModule();
  }
});
