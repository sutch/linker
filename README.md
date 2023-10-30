# Linker

A Chromium extension that copies a link based on the current tab to the clipboard.

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

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue on the GitHub repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
