const dialogueBox = document.getElementById("dialogueBox");
const dialogueText = document.getElementById("dialogueText");
const continueBtn = document.getElementById("continueBtn");
const choicesEl = document.getElementById("choices");
const captchaScene = document.getElementById("captchaScene");
const captchaBtn = document.getElementById("captchaBtn");

let index = 0;
let typing = false;
let intervalId = null;

const dialogues = [
  {
    type: "text",
    text: "Oh hello!",
    next: 1,
  },
  {
    type: "text",
    text: "Thanks for visiting this really cool website tho..",
    next: 2,
  },
  {
    type: "text",
    text: "I kinda have a question for you :D",
    next: 3,
  },
  {
    type: "choice",
    text: 'Do you know what day is it today? o~o"',
    choices: [
      { label: "Uhm, my birthday?", next: 4 },
      { label: "It's just a normal day.", next: 5 },
    ],
  },
  {
    type: "text",
    text: "Bingo! Happy sweetest birthday from my dearest heart, wholeheartedly for you!",
    next: 6,
  },
  {
    type: "text",
    text: "Too bad.. it's a special day today!",
    next: 6,
  },
  {
    type: "text",
    text: "I prepared something special just for you!",
    next: 7,
  },
  {
    type: "text",
    text: "Hope this will leave traces in your heart..",
    next: 8,
  },
  {
    type: "text",
    text: "BUT WAIT!",
    next: 9,
  },
  {
    type: "text",
    text: "Before we get into it..",
    next: 10,
  },
  {
    type: "text",
    text: "I have to make sure..",
    next: 11,
  },
  {
    type: "captcha",
    text: "Are you a real HUMAN?",
    next: null,
  },
];

function typeText(text, isChoice = false) {
  typing = true;
  dialogueText.textContent = "";
  continueBtn.classList.add("hidden");

  let i = 0;
  intervalId = setInterval(() => {
    dialogueText.textContent += text[i];
    i++;

    if (i >= text.length) {
      clearInterval(intervalId);
      typing = false;

      if (!isChoice) {
        continueBtn.classList.remove("hidden");
      }
    }
  }, 30);
}

function showChoices(choices) {
  choicesEl.innerHTML = "";
  choicesEl.classList.remove("hidden");

  choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.textContent = "> " + choice.label;

    btn.className =
      "block w-full text-left text-white border-4 border-white px-4 py-2 hover:bg-white hover:text-black transition";

    btn.onclick = () => {
      choicesEl.classList.add("hidden");
      index = choice.next;
      renderDialogue();
    };

    choicesEl.appendChild(btn);
  });
}

function renderDialogue() {
  const current = dialogues[index];

  clearInterval(intervalId);
  typing = false;
  choicesEl.classList.add("hidden");
  captchaScene.classList.add("hidden");

  if (current.type === "text") {
    typeText(current.text);
  }

  if (current.type === "choice") {
    typeText(current.text, true);
    setTimeout(
      () => {
        showChoices(current.choices);
      },
      current.text.length * 30 + 150,
    );
  }

  if (current.type === "captcha") {
    typeText(current.text, true);

    setTimeout(
      () => {
        captchaScene.classList.remove("hidden");
      },
      current.text.length * 30 + 200,
    );
  }
}

dialogueBox.addEventListener("click", () => {
  const current = dialogues[index];

  if (typing) {
    clearInterval(intervalId);
    dialogueText.textContent = current.text;
    typing = false;

    if (current.type === "text") {
      continueBtn.classList.remove("hidden");
    }
    return;
  }

  if (current.type === "choice") return;

  if (current.next !== undefined && current.next !== null) {
    index = current.next;
    renderDialogue();
  }
});
// Start
renderDialogue();
