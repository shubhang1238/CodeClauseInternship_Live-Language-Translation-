document.addEventListener("DOMContentLoaded", () => {
  const projectTitle = document.querySelector(".project-title");
  projectTitle.classList.add("active");
});

const langOption = document.querySelectorAll("select");
const fromText = document.getElementById("inputText");
const transText = document.querySelector(".toTranslate");
const countValue = document.querySelector(".code_length");
const fromVoice = document.querySelector(".from");
const toVoice = document.querySelector(".to");
const copyButton = document.querySelector(".bx-copy");
const switchLanguages = document.getElementById("switchLanguages");

const populateLanguages = () => {
  langOption.forEach((get, con) => {
    for (let countryCode in language) {
      let selected =
        (con === 0 && countryCode === "en-GB") ||
        (con === 1 && countryCode === "hi")
          ? "selected"
          : "";
      let option = `<option value="${countryCode}" ${selected}>${language[countryCode]}</option>`;
      get.insertAdjacentHTML("beforeend", option);
    }
  });
};

const translateText = () => {
  const content = fromText.value;
  const fromContent = langOption[0].value;
  const transContent = langOption[1].value;
  const transLINK = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromContent}|${transContent}`;
  fetch(transLINK)
    .then((response) => response.json())
    .then((data) => {
      transText.value = data.responseData.translatedText;
    })
    .catch((error) => console.error("Error:", error));
};

const speakFromText = () => {
  const fromTalk = new SpeechSynthesisUtterance(fromText.value);
  fromTalk.lang = langOption[0].value;
  speechSynthesis.speak(fromTalk);
};

const speakToText = () => {
  const toTalk = new SpeechSynthesisUtterance(transText.value);
  toTalk.lang = langOption[1].value;
  speechSynthesis.speak(toTalk);
};

const copyTranslatedText = () => {
  transText.select();
  document.execCommand("copy");
};

langOption.forEach((get) => get.addEventListener("change", translateText));
fromText.addEventListener("input", translateText);
fromVoice.addEventListener("click", speakFromText);
toVoice.addEventListener("click", speakToText);
copyButton.addEventListener("click", copyTranslatedText);

populateLanguages();

function copyToClipboard() {
  const transText = document.querySelector(".toTranslate");
  transText.select();
  document.execCommand("copy");
}
const switchLanguageOptions = () => {
  const temp = langOption[0].value;
  langOption[0].value = langOption[1].value;
  langOption[1].value = temp;
};

switchLanguages.addEventListener("click", switchLanguageOptions);

function openContactPopup() {
  var popup = document.getElementById("contactPopup");
  popup.style.display = "block";
}

function closeContactPopup() {
  var popup = document.getElementById("contactPopup");
  popup.style.display = "none";
}

function sendMessage() {
  var message = document.getElementById("contactMessage").value;
  console.log("Message sent: " + message);
}
