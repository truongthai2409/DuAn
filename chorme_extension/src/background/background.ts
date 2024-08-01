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

              let storageData = {};

              chrome.storage.local.set(storageData, () => {
                if (chrome.runtime.lastError) {
                  console.error("Error saving data to local storage:", chrome.runtime.lastError);
                } else {
                  console.log("Data successfully saved to local storage for", key.url);
                }
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
  switch (true) {
    case !!message.shopeeProducts:
      console.log("Product details:", message.shopeeProducts);
      chrome.storage.local.set({ products: message.shopeeProducts }, () => {
        console.log("Product details saved to storage");
      });
      break;
    case !!message.lazadaProducts:
      console.log("Product details:", message.lazadaProducts);
      chrome.storage.local.set({ products: message.lazadaProducts }, () => {
        console.log("Product details saved to storage");
      });
      break;
    case !!message.dataProfile:
      console.log("Product details:", message.dataProfile);
      chrome.storage.local.set({ products: message.dataProfile }, () => {
        console.log("Product details saved to storage");
      });
      break;
    default:
      console.log("Unknown product source");
  }
  sendResponse({ status: "received" });
  return true; // Giữ cổng mở để gửi phản hồi không đồng bộ
});
