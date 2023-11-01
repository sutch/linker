document.addEventListener('DOMContentLoaded', function () {
    // Getting the manifest data to access the extension's name and version
    const manifestData = chrome.runtime.getManifest();
  
    // Setting the extension's name and version in the popup
    document.getElementById('title').textContent = manifestData.name;
    document.getElementById('version').textContent = 'Version: ' + manifestData.version;

    // Querying the current active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // tabs[0] will contain the active tab's information
        const currentTab = tabs[0];
  
        // Setting the current tab's title and URL in the popup
        const tabTitle = currentTab.title || '';
        const tabURL = currentTab.url || '';
        document.getElementById('tabTitle').textContent = tabTitle;
        document.getElementById('tabURL').textContent = tabURL;
  
        // Set values input field values
        const linkTitleInput = document.getElementById('linkTitle');
        const linkAddressInput = document.getElementById('linkAddress');
        linkTitleInput.value = tabTitle;
        linkAddressInput.value = tabURL;
  
        // Programmatically inject the content script
        chrome.scripting.executeScript({
            target: {tabId: currentTab.id},
            files: ['content.js']
        }, () => {
            // Ensure the content script has been injected before sending the message
            chrome.tabs.sendMessage(currentTab.id, {message: "getSelectedText"}, function(response) {
                const selectedTextDiv = document.getElementById('selectedText');
                const selectedTextTitle = document.getElementById('selectedTextTitle');
        
                if(response && response.text) {
                    // If there's selected text, update the title and display it
                    selectedTextTitle.textContent = 'Selected text:';
                    selectedTextDiv.textContent = response.text;
                    selectedTextDiv.classList.remove('no-text-selected');
        
                    // Set linkTitle input to selected text
                    linkTitleInput.value = response.text;
                } else {
                    // If no text is selected, update the title and clear previous text
                    selectedTextTitle.textContent = 'Selected text: No selected text found';
                    selectedTextDiv.textContent = '';
                    selectedTextDiv.classList.add('no-text-selected');
                }
            });
        });
        
    });

    // Adding a click event listener to the "Copy" button to copy link to clipboard
    const copyButton = document.getElementById('copyButton');
    copyButton.addEventListener('click', async () => {
        const linkTitle = document.getElementById('linkTitle').value;
        const linkAddress = document.getElementById('linkAddress').value;
    
        // Creating a link element
        const htmlLink = `<a href="${linkAddress}">${linkTitle}</a>`;
        const textLink = linkAddress;

        try {
            // Write the HTML and plain text versions of the link to the clipboard.
            await navigator.clipboard.write([
                new ClipboardItem({
                    'text/html': new Blob([htmlLink], { type: 'text/html' }),
                    'text/plain': new Blob([textLink], { type: 'text/plain' })
                })
            ]);
            // Close the popup after copying.
            window.close();
        } catch (err) {
            // Log any errors that occur during the copy process.
            console.error('Failed to copy link: ', err);
        }
    });

    // Adding a click event listener to the "Cancel" button to close the popup
    const cancelButton = document.getElementById('cancelButton');
    cancelButton.addEventListener('click', function() {
      window.close();
    });


  });

    // Add an event listener for when the content of the popup has fully loaded
    document.body.addEventListener('paste', function (event) {
        // Prevent the default paste behavior
        event.preventDefault();
    
        // Get the currently focused element in the popup
        var focusedElement = document.activeElement;
    
        // Retrieve the text and HTML content from the clipboard
        var text = (event.clipboardData || window.clipboardData).getData('text/plain');
        var html = (event.clipboardData || window.clipboardData).getData('text/html');
    
        function insertAtCursor(input, textToInsert) {
        var start = input.selectionStart;
        var end = input.selectionEnd;
        var text = input.value;
        var before = text.substring(0, start);
        var after = text.substring(end, text.length);
        input.value = (before + textToInsert + after);
        input.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
        input.focus();
        }
    
        if (focusedElement === linkTitle) {
        if (html && /<a\s+href="[^"]*"[^>]*>.*<\/a>/.test(html)) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');
            var anchor = doc.querySelector('a');
            if (anchor) {
            insertAtCursor(linkTitle, anchor.textContent || anchor.innerText);
            }
        } else if (text) {
            insertAtCursor(linkTitle, text);
        }
        } else if (focusedElement === linkAddress) {
        if (html && /<a\s+href="[^"]*"[^>]*>.*<\/a>/.test(html)) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');
            var anchor = doc.querySelector('a');
            if (anchor) {
            insertAtCursor(linkAddress, anchor.href);
            }
        } else if (text) {
            insertAtCursor(linkAddress, text);
        }
        }
    });
