// src/popup/Popup.jsx

import React, { useState } from 'react';
// import './popup.css';

function Popup() {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);

  const getInfo = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          function: () => {
            chrome.runtime.sendMessage({ message: "get_info" }, (response) => {
              return response;
            });
          },
        },
        (result) => {
          if (result[0]) {
            setTitle(result[0].result.title);
            setImages(result[0].result.images);
          }
        }
      );
    });
  };

  return (
    <div>
      <h1>Extension Popup</h1>
      <button onClick={getInfo}>Get Info</button>
      <h2>Title: {title}</h2>
      <div>
        {images.map((src, index) => (
          <img key={index} src={src} alt={`img-${index}`} width="100" />
        ))}
      </div>
    </div>
  );
}

export default Popup;
