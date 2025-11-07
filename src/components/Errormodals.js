document.addEventListener("DOMContentLoaded", () => {
  const errorModal = document.getElementById("error-modal");
  const modalMessage = document.getElementById("modal-message");
  const confirmButton = document.getElementById("confirm-button");

   
  function showModal(message, url = null) {
    console.log(url);
    modalMessage.textContent = message;
    errorModal.style.display = "block";
    redirectUrl = url;
  }

  function closeModal() {
    errorModal.style.display = "none";
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }

  confirmButton.addEventListener("click", closeModal);

  window.showModal = showModal;
  console.log(USER_DATA);
});
