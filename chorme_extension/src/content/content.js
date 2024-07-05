// src/content/content.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "get_info") {
        const title = document.querySelector('title').innerText;
        const images = Array.from(document.querySelectorAll('img')).map(img => img.src);
        sendResponse({ title, images });
    }
});
