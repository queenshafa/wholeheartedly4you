document.addEventListener("DOMContentLoaded", () => {
  const letterModal = document.getElementById("letterModal");
  const openLetter = document.getElementById("openLetter");
  const closeLetter = document.getElementById("closeLetter");

  openLetter.addEventListener("click", () => {
    letterModal.classList.remove("hidden");
  });

  closeLetter.addEventListener("click", (e) => {
    e.preventDefault();
    letterModal.classList.add("hidden");
  });

  letterModal.addEventListener("click", (e) => {
    if (e.target === letterModal) {
      letterModal.classList.add("hidden");
    }
  });
});
