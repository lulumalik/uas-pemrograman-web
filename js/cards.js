/* ==========================================================================
   Section 2 Cards Renderer - Edukasi Platform
   ========================================================================== */

function renderMateriCards() {
  const container = document.getElementById('materi-cards-container');
  if (!container || typeof MATERI_CARDS_DATA === 'undefined') return;

  container.innerHTML = '';

  MATERI_CARDS_DATA.forEach(item => {
    const cardElement = document.createElement('article');
    cardElement.className = 'materi-card';

    cardElement.innerHTML = `
      <div class="card-img-wrapper">
        <img src="${item.img}" alt="${item.title}" class="card-img">
        <span class="card-tag">${item.category}</span>
      </div>
      <div class="card-body">
        <h3 class="card-heading">${item.title}</h3>
        <p class="card-desc">${item.descShort}</p>
        <div class="card-footer">
          <button class="btn btn-primary btn-detail-trigger" data-id="${item.id}">
            Detail Materi
          </button>
        </div>
      </div>
    `;

    container.appendChild(cardElement);
  });
}
