(()=>{function t(){chrome.runtime.onMessage.addListener(((t,e,n)=>{if("scrapeProducts"===t.action){const t=function(){var t,e;const n=Array.from(document.querySelectorAll("div.SarUkj.shopee-image-container img")),o=document.querySelector("span.oh0Xh2"),u=Array.from(document.querySelectorAll("p.QN2lPu")),r=document.querySelector("div.G27FPf");return{productName:(null===(t=null==o?void 0:o.textContent)||void 0===t?void 0:t.trim())||"N/A",price:(null===(e=null==r?void 0:r.textContent)||void 0===e?void 0:e.trim())||"N/A",image:n.map((t=>t.src)),productDetails:u.map((t=>t.textContent.trim())).join(" ")||"N/A"}}();chrome.runtime.sendMessage({products:t}),n({success:!0})}}))}chrome.runtime.onMessage.addListener(((t,e,n)=>{if("getProductName"===t.action){const e=document.evaluate(t.xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;console.log(e),n(e?{textContent:e.textContent}:{textContent:"Element not found"})}if("getProductDetail"===t.action){const e=document.evaluate(t.xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;n(e?{textContent:e.textContent}:{textContent:"Element not found"})}})),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",t):t()})();