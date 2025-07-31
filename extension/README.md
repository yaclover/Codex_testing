# Send Selection to Google Docs

This Chrome extension lets you send selected text on any webpage to a Google Document.

## Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/) and create a project.
2. Enable the **Google Docs API** for the project.
3. Create OAuth credentials for a Chrome extension. Use the following redirect URL:
   ``https://<YOUR_EXTENSION_ID>.chromiumapp.org/``
4. Copy the generated `client_id` and replace the placeholder in `manifest.json`.
5. In `background.js`, replace `YOUR_DOCUMENT_ID` with the ID of the document where text should be appended.
6. Zip the contents of this folder or use the provided `../extension.zip` file and load the unpacked extension in `chrome://extensions/`.

When you select text in the browser, right-click and choose **"Send selection to Google Docs"**. The first time you use it, Chrome will prompt you to authorize access to your Google account.
