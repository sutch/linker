if (!window.hasListener) {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if(request.message === "getSelectedText") {
        const selectedText = window.getSelection().toString();
        sendResponse({text: selectedText});
      }
    });
    window.hasListener = true; // Set a flag to indicate that the listener has been added
  }
  