document.addEventListener("DOMContentLoaded", () => {
  const birthdayIntro = document.getElementById("birthdayIntro");
  const dialogueBox = document.getElementById("portalDialogueBox");
  const dialogueText = document.getElementById("portalDialogueText");
  const continueBtn = document.getElementById("portalContinueBtn");
  const daysCountup = document.getElementById("daysCountup");

  const cake = document.getElementById("cake");
  const mailbox = document.getElementById("mailbox");
  const envelope = document.getElementById("envelope");

  let step = 0;

  const scenes = [
    () => {
      cake.classList.remove("hidden");
      dialogueBox.classList.remove("hidden");

      dialogueText.textContent = "...";
    },
    () => {
      birthdayIntro.classList.remove("hidden");

      // Change your message here
      dialogueText.textContent = "Happy sweetest birthday, Eula!";
    },
    () => {
      // Change your message here
      dialogueText.textContent = "Hope today brings you lots of smiles!";
    },
    () => {
      daysCountup.classList.remove("hidden");

      // Change your message here
      dialogueText.textContent = "Oh by the way! a little fun fact..";
    },
    () => {
      // Change your message here
      dialogueText.textContent =
        "Hang in there! I think you got a letter in your mailbox";
    },
    () => {
      mailbox.classList.remove("hidden");
      continueBtn.classList.add("hidden");

      // Change your message here
      dialogueText.textContent = "Click the mailbox to get the letter!";
    },
  ];

  continueBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (step < scenes.length) {
      scenes[step++]();
    }
  });

  scenes[step++]();

  mailbox.addEventListener("click", () => {
    mailbox.classList.add("hidden");
    mailbox.classList.remove("hidden");
  });
});
