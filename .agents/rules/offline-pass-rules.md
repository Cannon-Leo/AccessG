# Offline Pass Rules

- Use the `idb-keyval` package to interact with IndexedDB. Reason: Raw IndexedDB browser APIs require excessive boilerplate and are prone to unhandled promise rejections.
- The Service Worker must intercept the ticket fetch request and serve from IndexedDB if the network fails. Reason: This fulfills the core MVP promise of offline gate access.
- Save the QR payload locally the exact millisecond the payment returns success. Reason: If the user closes the app before caching completes, they will be stranded offline at the gate.