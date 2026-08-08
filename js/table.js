/* ==========================================================================
   Section 4 Table & Filter Logic - Edukasi Platform
   ========================================================================== */

function renderTableData(dataList) {
  const tbody = document.getElementById('table-body');
  if (!tbody) return;

  tbody.innerHTML = '';

  if (!dataList || dataList.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="table-empty-state">
          <i class="fa-solid fa-folder-open" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
          Tidak ada materi yang sesuai dengan pencarian atau filter Anda.
        </td>
      </tr>
    `;
    return;
  }

  dataList.forEach(item => {
    const tr = document.createElement('tr');
    tr.setAttribute('data-difficulty', item.difficulty);
    tr.setAttribute('data-category', item.category.toLowerCase());

    const priceHTML = item.isFree
      ? `<span class="price-tag free">Gratis</span>`
      : `<span class="price-tag">${item.price}</span>`;

    tr.innerHTML = `
      <td>${item.no}</td>
      <td>
        <div class="materi-name-cell">
          <div class="materi-icon-box"><i class="${item.iconClass}"></i></div>
          <span>${item.title}</span>
        </div>
      </td>
      <td>${item.category}</td>
      <td>
        <span class="badge-difficulty badge-${item.difficulty}">
          <i class="${item.difficultyIcon}"></i> ${item.difficultyLabel}
        </span>
      </td>
      <td>${item.duration}</td>
      <td>${priceHTML}</td>
    `;

    tbody.appendChild(tr);
  });
}

function initTableFilterModule() {
  const searchInput = document.getElementById('table-search-input');
  const difficultyFilter = document.getElementById('filter-difficulty');

  function handleFilter() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedDifficulty = difficultyFilter ? difficultyFilter.value : 'all';

    const filtered = TABLE_MATERI_DATA.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query);
      const matchesDifficulty = selectedDifficulty === 'all' || item.difficulty === selectedDifficulty;
      return matchesSearch && matchesDifficulty;
    });

    renderTableData(filtered);
  }

  if (searchInput) searchInput.addEventListener('input', handleFilter);
  if (difficultyFilter) difficultyFilter.addEventListener('change', handleFilter);

  // Initial render
  renderTableData(TABLE_MATERI_DATA);
}
