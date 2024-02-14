The following is a diagram depicting the situation where the user creates a new note using the single-page version of the app.

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser executes the callback function that creates a new note object,<br>renders it on the page, and sends it to the server via a POST request.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note left of server: The server processes the request payload and responds with a 201 Created status code.
    server-->>browser: {"message":"note created"}
```