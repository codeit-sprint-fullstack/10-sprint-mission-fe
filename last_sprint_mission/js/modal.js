//============================== 모달 ==============================//

export function openModal(message) {
  const background = document.getElementById("alert-modal");
  const alertMessage = document.getElementById("alert-message");
  if (!background || !alertMessage) return;
  alertMessage.textContent = message;
  background.classList.add("is-open");
}

export function closeModal() {
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
