import { useState, useEffect, useCallback } from "react";
import { useApolloClient } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from './components/LoginForm';
import Recommend from "./components/Recommend";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  // check if there's a user token in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('library-user')
    if (storedUser) {
      setToken(storedUser)
    }
  }, [])

  const login = useCallback((token) => {
    setToken(token)                             // save token to state
    localStorage.setItem('library-user', token) // save token to localStorage
    setPage('authors')                          // update UI
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.clearStore()

    if (page === 'add') {
      setPage('login')
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {/* logged out users only */}
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {/* logged in users only */}
        {token && (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommend show={page === "recommend"} />

      <LoginForm show={page === "login"} callback={login} />
    </div>
  );
};

export default App;
