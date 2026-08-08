/* ==========================================================================
   Section 2 Modal Detail Logic - Edukasi Platform
   ========================================================================== */

function initModalModule() {
  const modalOverlay = document.getElementById('modal-detail');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalBtnCancel = document.getElementById('modal-btn-cancel');

  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalImg = document.getElementById('modal-img');
  const modalDesc = document.getElementById('modal-desc');
  const modalSyllabus = document.getElementById('modal-syllabus');
  const modalPrereq = document.getElementById('modal-prereq');
  const modalLinkExternal = document.getElementById('modal-link-external');

  function openModal(item) {
    if (!item) return;

    modalTitle.textContent = item.title || 'Detail Materi';
    modalCategory.textContent = item.category || 'Edukasi';
    modalImg.src = item.img || '';
    modalDesc.textContent = item.descFull || item.descShort || '';
    modalPrereq.textContent = item.prereq || 'Tidak ada prasarat khusus.';
    modalLinkExternal.href = item.linkExternal || 'https://www.w3schools.com/';

    // Render syllabus
    modalSyllabus.innerHTML = '';
    if (item.syllabus && Array.isArray(item.syllabus)) {
      item.syllabus.forEach(syl => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fa-solid fa-check-circle"></i> <span>${syl}</span>`;
        modalSyllabus.appendChild(li);
      });
    }

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Event listener delegation for card detail triggers
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('.btn-detail-trigger');
    if (trigger) {
      const id = trigger.getAttribute('data-id');
      const itemData = MATERI_CARDS_DATA.find(d => d.id === id);
      if (itemData) {
        openModal(itemData);
      }
    }
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBtnCancel) modalBtnCancel.addEventListener('click', closeModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}
