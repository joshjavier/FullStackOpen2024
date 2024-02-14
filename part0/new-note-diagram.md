The following is a diagram depicting the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing on the text field and clicking the *Save* button.

Operations on the browser or on the server are shown as comments in the diagram.

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>+server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note left of server: The server processes the request payload and sends a URL redirect response to the browser.
    server-->>-browser: HTTP response status code: 302 Found

    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    Note right of browser: The location address is the same as the current address, so a page reload is triggered.
    server-->>-browser: HTML document

    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>-browser: CSS file

    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server-->>-browser: JavaScript file

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server.

    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>-browser: [ { "content": "test", "date": "2024-02-13T21:35:25.732Z" }, ... ]

    Note right of browser: The browser executes the callback function that renders the notes
```
