document.addEventListener("DOMContentLoaded", () => {
  const wordInput = document.getElementById("wordInput");
  const addWordButton = document.getElementById("addWord");
  const wordList = document.getElementById("wordList");

  // Fetch existing blocked words from storage and display
  chrome.storage.sync.get("filterWords", ({ filterWords }) => {
    filterWords.forEach((word) => {
      displayWord(word);
    });
  });

  // Add new word to the list
  addWordButton.addEventListener("click", () => {
    const newWord = wordInput.value.trim();
    if (newWord) {
      chrome.storage.sync.get("filterWords", ({ filterWords }) => {
        filterWords.push(newWord);
        chrome.storage.sync.set({ filterWords });
        displayWord(newWord);
        wordInput.value = "";
      });
    }
  });

  // Function to display a word in the list
  function displayWord(word) {
    const span = document.createElement("span");
    span.textContent = word;
    span.style.width = word.length * 2;
    wordList.appendChild(span);
  }
});