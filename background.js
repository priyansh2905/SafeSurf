chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ filterWords: ["racist", "sexist", "homophobic"] });
});
