export function showErrorModal(message) {
  const modal = document.getElementById('errorModal');
  const msgEl = document.getElementById('errorModalMessage');
  const closeBtn = document.getElementById('errorModalCloseBtn');

  if (!modal || !msgEl || !closeBtn) {
    console.warn('모달 요소를 찾을 수 없습니다. HTML에 추가했는지 확인하세요.');
    return;
  }

  msgEl.textContent = message;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  closeBtn.focus();
}

export function hideErrorModal() {
  const modal = document.getElementById('errorModal');
  if (!modal) return;
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}

document.addEventListener('click', (e) => {
  if (e.target.dataset.close === 'true') hideErrorModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hideErrorModal();
});