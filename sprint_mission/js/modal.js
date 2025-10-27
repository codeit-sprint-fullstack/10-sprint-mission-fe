//============================== 모달 ==============================//

function openModal(message) {
  const background = document.getElementById("alert-modal");
  const alertMessage = document.getElementById("alert-message");
  if (!background || !alertMessage) return;
  alertMessage.textContent = message;
  background.classList.add("is-open");
}

function closeModal() {
  const background = document.getElementById("alert-modal");
  if (!background) return;
  background.classList.remove("is-open");
}

document.addEventListener("DOMContentLoaded", () => {
  const checkBtn = document.getElementById("modal-check");
  const background = document.getElementById("alert-modal");
  checkBtn.addEventListener("click", closeModal);
  background.addEventListener("click", (e) => {
    if (e.target === background) closeModal(); 
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});


// 전역 네임스페이스로 내보내기!
window.Modal = { openModal, closeModal };