chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log(msg);
  console.log(sender);
  sendResponse("Front the background Script");
});
chrome.storage.local.get(['key'], (result) => {
    console.log('Cache đã được truy xuất:', result.key);
});

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