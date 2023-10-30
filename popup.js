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
                    selectedTextTitle.textContent = 'No text selected';
                    selectedTextDiv.textContent = '';
                    selectedTextDiv.classList.add('no-text-selected');
                }
            });
        });
    });

    // // Adding a click event listener to the "Copy" button to copy link to clipboard
    // const copyButton = document.getElementById('copyButton');
    // copyButton.addEventListener('click', function() {
    //     const linkTitle = document.getElementById('linkTitle').value;
    //     const linkAddress = document.getElementById('linkAddress').value;
    
    //     // Creating a link element
    //     const link = document.createElement('a');
    //     link.href = linkAddress;
    //     link.textContent = linkTitle;
    
    //     // Creating a new ClipboardItem and putting it on the clipboard
    //     const clipboardItem = new ClipboardItem({'text/html': new Blob([link.outerHTML], {type: 'text/html'})});
    //     navigator.clipboard.write([clipboardItem])
    //     .then(() => console.log('Link copied to clipboard!'))
    //     .catch(err => console.error('Failed to copy link: ', err));
    // });


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
  