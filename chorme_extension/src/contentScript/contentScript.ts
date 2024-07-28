function scrapeProductShopeeDetails() {
  const images = Array.from(
    document.querySelectorAll("div.SarUkj.shopee-image-container img")
  );
  const productNames = document.querySelector("span.oh0Xh2");
  const productDetails = Array.from(document.querySelectorAll("p.QN2lPu"));
  const prices = document.querySelector("div.G27FPf");

  const product = {
    productName: productNames?.textContent?.trim() || "N/A",
    price: prices?.textContent?.trim() || "N/A",
    image: images.map((img) => (img as HTMLImageElement).src),
    productDetails:
      productDetails.map((detail) => detail.textContent.trim()).join(` `) ||
      "N/A",
  };
  return product;
}

function scrapeProductLazadaDetails() {
  const images = Array.from(
    document.querySelectorAll("div.next-slick-track img")
  );
  const productNames = document.querySelector("h1.pdp-mod-product-badge-title");
  const productDetails = Array.from(
    document.querySelectorAll(".pdp-product-detail span")
  );
  const prices = document.querySelector(
    "span.notranslate.pdp-price.pdp-price_type_normal.pdp-price_color_orange.pdp-price_size_xl"
  );

  const product = {
    productName: productNames?.textContent?.trim() || "N/A",
    price: prices?.textContent?.trim() || "N/A",
    image: images.map((img) => (img as HTMLImageElement).src),
    productDetails:
      productDetails.map((detail) => detail.textContent.trim()).join(` `) ||
      "N/A",
  };
  return product;
}

function getShopProfile() {
  const cacheName = "CHAT_API";
  let newData = {};
  caches
    .open(cacheName)
    .then((cache) => {
      cache.keys().then((keys) => {
        keys.forEach((key) => {
          cache.match(key).then((response) => {
            if (response) {
              response.json().then((data) => {
                console.log("Data for", key.url, ":", data);
                newData = { 
                  user_id: data.user_id,
                  image: data.image,
                  name: data.name
                }
              });
            }
          });
        });
      });
    })
    .catch((error) => {
      console.error("Error opening cache:", error);
    });
    console.log(newData)
    return newData;
}
// getShopProfile();

function initContentScript() {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "scrapeProducts") {
      const shopeeProducts = scrapeProductShopeeDetails();
      chrome.runtime.sendMessage({ shopeeProducts });
      sendResponse({ success: true });
    }
    if (message.action === "scrapeLazadaProducts") {
      const lazadaProducts = scrapeProductLazadaDetails();
      chrome.runtime.sendMessage({ lazadaProducts });
      sendResponse({ success: true });
    }
    // if (message.action === "getShopeeProfile") {
    //   const dataProfile = getShopProfile();
    //   chrome.runtime.sendMessage({ dataProfile });
    //   sendResponse({ success: true });
    // }
    
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initContentScript);
} else {
  initContentScript();
}