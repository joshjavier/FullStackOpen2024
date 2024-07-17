import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import '../css/button.css'

const Books = (props) => {
  const { loading, data } = useQuery(ALL_BOOKS)
  const [selectedGenre, setGenre] = useState(null)

  if (!props.show) return

  if (loading) return <div>Loading...</div>

  const books = data.allBooks
  const genres = new Set(books.reduce((genres, book) => genres.concat(book.genres), []))

  const booksToShow = selectedGenre
    ? books.filter(book => book.genres.includes(selectedGenre))
    : books

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {[...genres].map(genre => (
        <button
          key={genre}
          onClick={() => setGenre(genre)}
          aria-pressed={genre === selectedGenre}
        >{genre}</button>
      ))}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books
