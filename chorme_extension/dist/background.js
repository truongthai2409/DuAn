caches.open("CHAT_API").then((o=>{o.keys().then((e=>{e.forEach((e=>{o.match(e).then((o=>{o&&o.json().then((o=>{console.log("Data for",e.url,":",o),chrome.storage.local.set({},(()=>{chrome.runtime.lastError?console.error("Error saving data to local storage:",chrome.runtime.lastError):console.log("Data successfully saved to local storage for",e.url)}))}))}))}))}))})).catch((o=>{console.error("Error opening cache:",o)})),chrome.runtime.onMessage.addListener(((o,e,r)=>{switch(!0){case!!o.shopeeProducts:console.log("Product details:",o.shopeeProducts),chrome.storage.local.set({products:o.shopeeProducts},(()=>{console.log("Product details saved to storage")}));break;case!!o.lazadaProducts:console.log("Product details:",o.lazadaProducts),chrome.storage.local.set({products:o.lazadaProducts},(()=>{console.log("Product details saved to storage")}));break;case!!o.dataProfile:console.log("Product details:",o.dataProfile),chrome.storage.local.set({products:o.dataProfile},(()=>{console.log("Product details saved to storage")}));break;default:console.log("Unknown product source")}return r({status:"received"}),!0}));