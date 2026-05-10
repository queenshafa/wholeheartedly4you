document.addEventListener("DOMContentLoaded", () => {
  const captchaModal = document.getElementById("captchaModal");
  const captchaGrid = document.getElementById("captchaGrid");
  const captchaVerify = document.getElementById("captchaVerify");
  const captchaBtn = document.getElementById("captchaBtn");

  const TOTAL_TILES = 9;
  let selectedCount = 0;

  captchaBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openCaptcha();
  });

  function openCaptcha() {
    captchaModal.classList.remove("hidden");
    captchaGrid.innerHTML = "";
    selectedCount = 0;

    captchaVerify.disabled = true;

    for (let i = 0; i < TOTAL_TILES; i++) {
      const tile = document.createElement("div");
      tile.className =
        "relative border border-slate-300 cursor-pointer aspect-square";

      const img = document.createElement("img");
      img.src = "/assets/images/you-captcha.png";
      img.className = "w-full h-full object-cover";

      tile.appendChild(img);

      tile.addEventListener("click", () => {
        if (tile.classList.contains("selected")) return;

        tile.classList.add("selected");
        selectedCount++;

        tile.innerHTML += `
      <div class="absolute inset-0 bg-blue-600/40 flex items-center justify-center text-white text-xl">
        <i class="ri-check-line"></i>
      </div>
      `;

        if (selectedCount === TOTAL_TILES) {
          captchaVerify.disabled = false;
        }
      });

      captchaGrid.appendChild(tile);
    }
  }

  captchaVerify.addEventListener("click", () => {
    captchaModal.classList.add("hidden");

    captchaBtn.innerHTML = "Verified!";
    captchaBtn.classList.add("opacity-60", "pointer-events-none");
  });
});
