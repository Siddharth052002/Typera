let type_content = document.querySelector(".type_content p");
let input = document.getElementById("typeValue");

let letterIndex = (mistakes = isTyping = 0);
let resetBtn = document.querySelector(".bottom_part button");
let soundBtn = document.querySelector(".sound input");

let time;
let check;
let random_Para;
let t_left = document.querySelector(".t-left");
let error = document.querySelector(".error");
let wpm = document.querySelector(".wpm");
let cpm = document.querySelector(".cpm");

let maxTime = 60;
let timeleft = maxTime;

let correctType = new Audio("type.mp3");
let incorrectType = new Audio("wrong.mp3");

const playSound = (check) => {
  if (soundBtn.checked) {
    if (check) correctType.play();
    else incorrectType.play();
  } else {
    correctType.pause();
    incorrectType.pause();
  }
};

// Define the loadPara function
const loadPara = () => {
  random_Para = Math.floor(Math.random() * article.length);
  type_content.innerHTML = "";
  article[random_Para].split("").forEach((element) => {
    let realData = `<span>${element}</span>`;
    type_content.innerHTML += realData;
  });

  type_content.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("click", () => {
    input.focus();
  });
  type_content.addEventListener("click", () => {
    input.focus();
  });
};

loadPara();

input.addEventListener("input", (e) => {
  let char = type_content.querySelectorAll("span");
  let inputValue = e.target.value.split("")[letterIndex];

  if (!isTyping) {
    time = setInterval(timeSetup, 1000);
    isTyping = true;
  }

  if (letterIndex < char.length - 1) {
    if (inputValue == null) {
      if (letterIndex > 0) {
        letterIndex--;
        if (char[letterIndex].classList.contains("incorrect")) {
          mistakes--;
        }
      }
    } else {
      if (char[letterIndex].innerText == inputValue) {
        char[letterIndex].classList.add("correct");
        playSound(1);
      } else {
        char[letterIndex].classList.add("incorrect");
        mistakes++;
        playSound(0);
      }
    }

    letterIndex++;
    char.forEach((element) => {
      element.classList.remove("active");
    });
    char[letterIndex].classList.add("active");
    error.innerText = `Mistakes : ${mistakes}`;
    cpm.innerText = `CPM : ${letterIndex - mistakes}`;
  } else {
    clearInterval(time);
    input.value = "";
  }
});

let finalScoreDisplayed = false;

const timeSetup = () => {
  if (timeleft > 0) {
    timeleft--;
    t_left.innerText = `Time-Left : ${timeleft}s`;

    // Calculate progress percentage
    const progressPercentage =
      ((letterIndex - mistakes) / article[random_Para].length) * 100;
    const progressBar = document.querySelector(".progress");
    progressBar.style.width = `${progressPercentage}%`;

    let wpmTab = Math.round(
      ((letterIndex - mistakes) / 5 / (maxTime - timeleft)) * 60
    );
    wpm.innerText = `WPM : ${wpmTab}`;
  } else if (!finalScoreDisplayed) {
    finalScoreDisplayed = true;
    clearInterval(time);
    input.value = "";

    let finalWpm = Math.round(((letterIndex - mistakes) / 5 / maxTime) * 60);
    t_left.innerText = `Final Score: ${finalWpm} WPM`;
    wpm.innerText = ""; // Clear WPM value
  }
};

resetBtn.addEventListener("click", () => {
  loadPara();
  clearInterval(time);
  wpm.innerHTML = `WPM : `;
  error.innerText = `Mistakes : `;
  cpm.innerText = `CPM : `;
  timeleft = maxTime;
  t_left.innerText = `Time-Left : ${maxTime}s`;
  input.value = "";
  letterIndex = mistakes = isTyping = 0;
});

let themeSwitcher = document.querySelector(".theme-switcher");
themeSwitcher.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});