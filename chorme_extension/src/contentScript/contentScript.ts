chrome.runtime.sendMessage("I am loading content script", (response) => {
  console.log(response);
  console.log("I am content script");
});

window.onload = (event) => {
  console.log("page is fully loaded");
};

// alert("hello")
// Lắng nghe thông điệp từ background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updatePopup") {
    const data = message.data;
    // Xử lý dữ liệu nhận được
    console.log("Received data for 3333333333", data.key, ":", data.value);
    // Thực hiện các hành động cần thiết ở đây
  }
});


