// // chrome.runtime.sendMessage("I am loading content script", (response) => {
// //   console.log(response);
// //   console.log("I am content script");
// // });

// window.onload = (event) => {
//   console.log("page is fully loaded");
// };

// alert("hello");

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "getProductName") {
//     const element = document.evaluate(
//       request.xpath,
//       document,
//       null,
//       XPathResult.FIRST_ORDERED_NODE_TYPE,
//       null
//     ).singleNodeValue;
//     console.log(element);
//     if (element) {
//       sendResponse({ textContent: element.textContent });
//     } else {
//       sendResponse({ textContent: "Element not found" });
//     }
//   }
//   if (request.action === "getProductDetail") {
//     const element = document.evaluate(
//       request.xpath,
//       document,
//       null,
//       XPathResult.FIRST_ORDERED_NODE_TYPE,
//       null
//     ).singleNodeValue;
//     // console.log(element);ZX
//     if (element) {
//       sendResponse({ textContent: element.textContent });
//     } else {
//       sendResponse({ textContent: "Element not found" });
//     }
//   }
//   // Truy xuất thẻ div chứa các thẻ p
//   const container = document.querySelector(".e8lZp3");

//   // Kiểm tra nếu thẻ div tồn tại
//   if (request.action === "getPtext") {
//     // Lấy tất cả các thẻ p bên trong thẻ div
//     const paragraphs = container.querySelectorAll("p");
//     const textContents = [];

//     // Lấy textContent của từng thẻ p và thêm vào mảng
//     paragraphs.forEach((paragraph) => {
//       textContents.push(paragraph.textContent.trim());
//     });
//     if (container) {
//       sendResponse({ texts: textContents });
//     } else {
//       sendResponse({ texts: "Element not found" });
//     }

//     // Gửi dữ liệu lên extension
//     // chrome.runtime.sendMessage(
//     //   { type: "SEND_PARAGRAPH_TEXTS", texts: textContents },
//     //   (response) => {
//     //     console.log("Response from background:", response);
//     //   }
//     // );
//     // sendResponse
//   }
// });

function initContentScript() {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "scrapeImages") {
      const images = Array.from(
        document.querySelectorAll("div.SarUkj.shopee-image-container img")
      );
      const srcList = images.map((img) => (img as HTMLImageElement).src);
      chrome.runtime.sendMessage({ srcList });
      sendResponse({ success: true }); // Acknowledge receipt of the message
    }
  });
}

// Run the init function when the DOM is fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initContentScript);
} else {
  initContentScript();
}
