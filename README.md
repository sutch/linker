# Linker

A chromium extension to generate a customizable hyperlink using data from the current tab and copy it to the clipboard.

## Installation

To install the extension, follow these steps:

1. Clone the repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions` or Open Edge and navigate to `edge://extensions/`.
3. Enable Developer mode by toggling the switch in the top right corner (Chrome) or in the left panel (Edge).
4. Click on the "Load unpacked" button and select the directory where you cloned the repository.

Optionally, to have the extension's icon available using one click from the toolbar:
1. Click on the Extensions icon in the toolbar
2. Click the Show in toolbar icon

## Usage

Click the extension's icon. A popup will open with some details about the tab. The tab's URL will be used for the link address. If any text on the tab's web page is selected, this will become the link's title, otherwise the link's title will default to the tab's title. Both the address and title can be edited. Pressing the Copy button copies the link to the clipboard.

## Permissions

This browser extension requires specific permissions to operate effectively. Below is a list of these permissions along with explanations for why they are necessary:

- **`activeTab`**: This permission allows the extension to access and interact with the currently active tab in the browser. Specifically, it is used to copy selected text on the page, which can then be utilized as the title of the link. This targeted interaction ensures that the extension functions correctly without requiring access to all your tabs.
- **`scripting`**: Essential for injecting scripts into the current webpage. This enables the extension to query the Document Object Model (DOM) for the tab's title, the tab's URL, and any text selected by the user. Such access is crucial for retrieving necessary information from the page craft a link.
- **`clipboardWrite`**: Grants the extension permission to write to the clipboard. This is specifically used for writing the crafted link to the clipboard, enabling it to be pasted elsewhere. This feature enhances the usability of the extension by streamlining the link-sharing process.
- **`matches`: `<all_urls>` for `content_scripts`**: This host permission is necessary so that the extension can create links from any URL. It allows the extension's content scripts to run on all web pages you visit, providing the ability to generate page links on any site.

## Source Code

The source code for this extension is maintained at https://github.com/sutch/linker.

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue on the GitHub repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
