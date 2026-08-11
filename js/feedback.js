/* ==========================================================================
   Section 5: Feedback Form Handler (MAJID)
   ========================================================================== */
(function () {
  const form = document.getElementById('feedback-form');
  const toast = document.getElementById('feedback-toast');
  const feed = document.getElementById('feedback-feed');
  const submitBtn = document.getElementById('feedback-submit-btn');
  const starLabel = document.getElementById('star-label-text');

  const STAR_LABELS = ['', 'Sangat Buruk', 'Kurang Baik', 'Cukup Baik', 'Bagus', 'Luar Biasa! ⭐'];

  // Star rating live label
  document.querySelectorAll('.star-rating-group input').forEach(input => {
    input.addEventListener('change', () => {
      starLabel.textContent = STAR_LABELS[input.value] || '';
    });
  });

  // Inline validation on blur
  function validateField(input) {
    const group = input.closest('.form-group');
    if (!group) return true;
    const error = group.querySelector('.field-error');
    let valid = input.checkValidity();
    if (input.type === 'email' && valid) {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    }
    group.classList.toggle('has-error', !valid);
    input.classList.toggle('is-invalid', !valid);
    input.classList.toggle('is-valid', valid && input.value.length > 0);
    if (error) error.textContent = input.validationMessage || 'Field ini tidak valid.';
    return valid;
  }

  form.querySelectorAll('input, textarea, select').forEach(el => {
    el.addEventListener('blur', () => validateField(el));
    el.addEventListener('input', () => {
      if (el.closest('.form-group')?.classList.contains('has-error')) validateField(el);
    });
  });

  // Build feed card
  function buildFeedCard(data) {
    const stars = '★'.repeat(data.rating) + '☆'.repeat(5 - data.rating);
    const initials = data.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
    const time = new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' });
    const topics = data.topics.length ? data.topics.join(', ') : 'Umum';

    const card = document.createElement('div');
    card.className = 'feed-card';
    card.innerHTML = `
      <div class="feed-card-header">
        <div class="feed-name-wrap">
          <div class="feed-avatar">${initials}</div>
          <span class="feed-name">${data.name}</span>
          <span class="feed-topic-tag">${topics}</span>
        </div>
        <span class="feed-stars">${stars}</span>
      </div>
      <p class="feed-message">${data.message}</p>
      <span class="feed-time"><i class="fa-regular fa-clock"></i> ${time}</span>
    `;
    return card;
  }

  function showToast(type, title, msg) {
    toast.className = `feedback-toast show ${type}`;
    toast.querySelector('.toast-body').innerHTML = `<strong>${title}</strong>${msg}`;
    toast.querySelector('.toast-icon').className = `toast-icon fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`;
    setTimeout(() => toast.classList.remove('show'), 6000);
  }

  function removeFeedEmpty() {
    const empty = feed.querySelector('.feed-empty');
    if (empty) empty.remove();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate all required fields
    let allValid = true;
    form.querySelectorAll('[required]').forEach(el => {
      if (!validateField(el)) allValid = false;
    });

    // Validate star rating
    const ratingChecked = form.querySelector('input[name="rating"]:checked');
    const ratingGroup = form.querySelector('.rating-wrapper');
    if (!ratingChecked) {
      allValid = false;
      starLabel.textContent = '⚠ Pilih rating';
      starLabel.style.color = '#ef4444';
    } else {
      starLabel.style.color = '';
    }

    if (!allValid) {
      showToast('error', 'Form belum lengkap!', ' Periksa kembali field yang ditandai merah.');
      return;
    }

    // Gather data
    const topics = [...form.querySelectorAll('input[name="topics"]:checked')].map(c => c.value);
    const data = {
      name: form.querySelector('#fb-name').value.trim(),
      email: form.querySelector('#fb-email').value.trim(),
      course: form.querySelector('#fb-course').value,
      rating: parseInt(ratingChecked.value),
      message: form.querySelector('#fb-message').value.trim(),
      topics
    };

    // Loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate async submit
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;

      removeFeedEmpty();
      feed.prepend(buildFeedCard(data));

      showToast('success', 'Terima kasih, ' + data.name + '!', ' Feedback Anda berhasil dikirim dan sudah tampil di bawah.');

      form.reset();
      starLabel.textContent = '';
      form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
        el.classList.remove('is-valid', 'is-invalid');
      });
      form.querySelectorAll('.has-error').forEach(g => g.classList.remove('has-error'));
    }, 1200);
  });
})();
