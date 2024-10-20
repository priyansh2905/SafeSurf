// Function to filter comments or tweets
function filterComments() {
  // Offensive word list from storage
  chrome.storage.sync.get("filterWords", (result) => {
    // If no offensive words are found in storage, log a message and return
    if (chrome.runtime.lastError) {
      console.error("Error retrieving filter words: ", chrome.runtime.lastError);
      return;
    }
    
    const filterWords = result.filterWords || [];
    
    if (filterWords.length === 0) {
      console.warn("No filter words found in storage.");
      return;
    }

    // YouTube comments
    if (window.location.hostname.includes("youtube.com")) {
      const comments = document.querySelectorAll("#content-text");
      comments.forEach((comment) => {
        filterWords.forEach((word) => {
          if (comment.innerText.toLowerCase().includes(word.toLowerCase())) {
            comment.innerText = "⚠️ Warning: Hateful content hidden.";
          }
        });
      });
    }

    // Facebook comments
    if (window.location.hostname.includes("facebook.com")) {
      const comments = document.querySelectorAll("._3l3x");
      comments.forEach((comment) => {
        filterWords.forEach((word) => {
          if (comment.innerText.toLowerCase().includes(word.toLowerCase())) {
            comment.innerText = "⚠️ Warning: Hateful content hidden.";
          }
        });
      });
    }

    // Twitter tweets and replies
    if (window.location.hostname.includes("twitter.com")) {
      const tweets = document.querySelectorAll('article div[lang]');
      tweets.forEach((tweet) => {
        filterWords.forEach((word) => {
          if (tweet.innerText.toLowerCase().includes(word.toLowerCase())) {
            tweet.innerText = "⚠️ Warning: Hateful content hidden.";
          }
        });
      });
    }

    // Instagram comments
    if (window.location.hostname.includes("instagram.com")) {
      const comments = document.querySelectorAll(".C4VMK span");
      comments.forEach((comment) => {
        filterWords.forEach((word) => {
          if (comment.innerText.toLowerCase().includes(word.toLowerCase())) {
            comment.innerText = "⚠️ Warning: Hateful content hidden.";
          }
        });
      });
    }

    // Reddit comments
    if (window.location.hostname.includes("reddit.com")) {
      const comments = document.querySelectorAll(".md");
      comments.forEach((comment) => {
        filterWords.forEach((word) => {
          if (comment.innerText.toLowerCase().includes(word.toLowerCase())) {
            comment.innerText = "⚠️ Warning: Hateful content hidden.";
          }
        });
      });
    }
  });
}

// Monitor for new tweets/comments being loaded (dynamic content)
const observer = new MutationObserver(filterComments);
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Run filter initially on page load
filterComments();
