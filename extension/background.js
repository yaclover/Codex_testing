diff --git a//dev/null b/extension/background.js
index 0000000000000000000000000000000000000000..3206fdb5235e5a78a6619503b80ec92759128142 100644
--- a//dev/null
+++ b/extension/background.js
@@ -0,0 +1,45 @@
+const DOC_ID = 'YOUR_DOCUMENT_ID';
+
+chrome.runtime.onInstalled.addListener(() => {
+  chrome.contextMenus.create({
+    id: 'send_to_docs',
+    title: 'Send selection to Google Docs',
+    contexts: ['selection']
+  });
+});
+
+chrome.contextMenus.onClicked.addListener((info, tab) => {
+  if (info.menuItemId === 'send_to_docs' && info.selectionText) {
+    sendTextToDocs(info.selectionText);
+  }
+});
+
+function sendTextToDocs(text) {
+  chrome.identity.getAuthToken({ interactive: true }, token => {
+    if (chrome.runtime.lastError || !token) {
+      console.error('Failed to get token', chrome.runtime.lastError);
+      return;
+    }
+    fetch(`https://docs.googleapis.com/v1/documents/${DOC_ID}:batchUpdate`, {
+      method: 'POST',
+      headers: {
+        'Authorization': 'Bearer ' + token,
+        'Content-Type': 'application/json'
+      },
+      body: JSON.stringify({
+        requests: [
+          {
+            insertText: {
+              text: text + '\n',
+              endOfSegmentLocation: {}
+            }
+          }
+        ]
+      })
+    }).then(resp => {
+      if (!resp.ok) {
+        resp.text().then(t => console.error('Error:', t));
+      }
+    }).catch(err => console.error(err));
+  });
+}
