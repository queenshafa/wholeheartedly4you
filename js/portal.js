document.addEventListener("DOMContentLoaded", () => {
  const birthdayIntro = document.getElementById("birthdayIntro");
  const daysCountup = document.getElementById("daysCountup");

  const cake = document.getElementById("cake");
  const mailboxWrapper = document.getElementById("mailboxWrapper");
  const mailbox = document.getElementById("mailbox");
  const envelope = document.getElementById("envelope");

  const dialogueBox = document.getElementById("portalDialogueBox");
  const dialogueText = document.getElementById("portalDialogueText");
  const continueBtn = document.getElementById("portalContinueBtn");

  const letterModal = document.getElementById("letterModal");
  const closeLetter = document.getElementById("closeLetter");

  let step = 0;
  let typing = false;
  let intervalId = null;
  let fullText = "";

  function hasNextScene() {
    return step < scenes.length;
  }

  //   Confetti
  function fireConfetti() {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
  }

  //   BIGGER CONFETTI!!!!
  function fireConfettiBig() {
    fireConfetti();
    setTimeout(fireConfetti, 300);
  }

  //   Balloons
  function spawnBalloons(count = 6) {
    for (let i = 0; i < count; i++) {
      const b = document.createElement("div");
      b.className = "balloon";
      b.style.left = Math.random() * 100 + "vw";
      b.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
      b.style.animationDuration = 4 + Math.random() * 3 + "s";

      document.body.appendChild(b);

      setTimeout(() => b.remove(), 7000);
    }
  }

  function typeText(text) {
    clearInterval(intervalId);

    typing = true;
    fullText = text;
    dialogueText.textContent = "";
    continueBtn.classList.add("hidden");

    let i = 0;
    intervalId = setInterval(() => {
      dialogueText.textContent += text[i];
      i++;

      if (i >= text.length) {
        finishTyping();
      }
    }, 30);
  }

  function finishTyping() {
    clearInterval(intervalId);
    dialogueText.textContent = fullText;
    typing = false;

    if (hasNextScene()) {
      continueBtn.classList.remove("hidden");
    } else {
      continueBtn.classList.add("hidden");
    }
  }

  function calculateDaysSinceBirth(birthDateStr) {
    const birthDate = new Date(birthDateStr);
    const today = new Date();

    birthDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = today - birthDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  function animateCountUp(el, target, duration = 1200) {
    let start = 0;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value.toLocaleString();

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  //   You can change those texts as creative as you want
  const scenes = [
    () => {
      dialogueBox.classList.remove("hidden");
      cake.classList.remove("hidden");
      typeText("...");
    },

    () => {
      birthdayIntro.classList.remove("opacity-0");
      fireConfettiBig();
      spawnBalloons(50); // You can change the amount of balloons here
      typeText("Happy sweetest birthday, Eula!");
    },

    () => {
      typeText("Hope today brings you lots of smiles!");
    },

    () => {
      daysCountup.classList.remove("hidden");

      const daysEl = document.getElementById("daysSinceBorn");
      const days = calculateDaysSinceBirth("2010-04-20"); // Input target's birthday here!
      animateCountUp(daysEl, days);
      fireConfettiBig();

      typeText("Oh by the way! A little fun fact...");
    },

    () => {
      typeText("I think you got a letter in your mailbox");
    },

    () => {
      mailboxWrapper.classList.remove("hidden");
      typeText("Click the mailbox to check it!");
    },
    () => {
      continueBtn.classList.add("hidden");
      typeText("Enjoy your special day!");
    },
  ];

  scenes[step++]();

  function nextScene() {
    if (typing) {
      finishTyping();
      return;
    }

    if (step < scenes.length) {
      scenes[step++]();
    }
  }

  dialogueBox.addEventListener("click", nextScene);
  continueBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    nextScene();
  });

  mailbox.addEventListener("click", () => {
    mailboxWrapper.classList.add("hidden");
    envelope.classList.remove("hidden");
  });

  envelope.addEventListener("click", () => {
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
