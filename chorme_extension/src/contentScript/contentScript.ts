function scrapeProductShopeeDetails() {
  const images = Array.from(
    document.querySelectorAll("div.SarUkj.shopee-image-container img")
  );
  const productNames = document.querySelector("span.oh0Xh2");
  const productDetails = Array.from(document.querySelectorAll("p.QN2lPu"));
  const prices = document.querySelector("div.G27FPf");
  const inventoryContainer = document.querySelector("div.flex.KIoPj6.W5LiQM");
  const inventoryText = inventoryContainer.querySelector(
    "div.flex.items-center > div:nth-child(2)"
  ).textContent;
  const availableProducts = inventoryText.match(/(\d+) sản phẩm có sẵn/)[1];

  console.log(`${availableProducts}`);

  const product = {
    inventory: availableProducts || "0",
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

function scrapeProfileLazadaDetails() {

  const panelBuyerInfo = document.querySelector('div[data-spm="panel_buyer_info"]');
  const addressInfor = document.querySelector(".order-field-shipping-address .order-field-value .show-text")?.textContent?.trim();
  const buyerInfor = panelBuyerInfo.querySelector('.show-text.copy-text-item.hover-show-edit.break-all')?.textContent?.trim();
  const emailInfor = panelBuyerInfo.querySelector('.order-field-email .order-field-value .show-text')?.textContent?.trim();
  const phoneInfor = panelBuyerInfo.querySelector('.order-field.order-field-customer-phone').querySelector('.show-text.copy-text-item.hover-show-edit.break-all')?.textContent?.trim();
  const codeInfor = panelBuyerInfo.querySelector('.order-field.order-field-customer-id').querySelector('.order-field-value')?.textContent?.trim();

  const product = {
    address: addressInfor || "N/A",
    name: buyerInfor || "N/A",
    email: emailInfor || "N/A",
    code: codeInfor || "N/A",
    phone: phoneInfor || "N/A",
  };
  console.log(product)

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
                  name: data.name,
                };
              });
            }
          });
        });
      });
    })
    .catch((error) => {
      console.error("Error opening cache:", error);
    });
  console.log(newData);
  return newData;
}

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
    if (message.action === "getLazadaProfile") {
      const dataProfile = scrapeProfileLazadaDetails();
      chrome.runtime.sendMessage({ dataProfile });
      sendResponse({ success: true });
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initContentScript);
} else {
  initContentScript();
}
