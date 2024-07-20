// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//   console.log(msg);
//   console.log(sender);
//   sendResponse("Front the background Script");
// });

const cacheName = "CHAT_API";

caches
  .open(cacheName)
  .then((cache) => {
    cache.keys().then((keys) => {
      keys.forEach((key) => {
        cache.match(key).then((response) => {
          if (response) {
            response.json().then((data) => {
              console.log("Data for", key.url, ":", data);

              // Send data to popup
              chrome.runtime.sendMessage({
                action: "updatePopup",
                data: { key: key.url, value: data },
              });
            });
          }
        });
      });
    });
  })
  .catch((error) => {
    console.error("Error opening cache:", error);
  });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SEND_PARAGRAPH_TEXTS") {
    console.log("Received paragraph texts:", message.texts);
    // Xử lý dữ liệu theo ý muốn
    sendResponse({ status: "success" });
  }
});
