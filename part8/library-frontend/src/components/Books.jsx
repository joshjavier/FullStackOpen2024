import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ALL_GENRES } from "../queries"
import '../css/button.css'

const Books = (props) => {
  const [selectedGenre, setGenre] = useState(null)
  const { loading: genresLoading, data: genresData } = useQuery(ALL_GENRES)
  const { loading: booksLoading, data: booksData } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre }
  })

  if (!props.show) return

  if (booksLoading || genresLoading) return <div>Loading...</div>

  const { allGenres } = genresData
  const { allBooks } = booksData

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
          {allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {allGenres.map(genre => (
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
