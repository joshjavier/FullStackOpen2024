import { useQuery } from "@apollo/client"
import { RECOMMEND } from "../queries"

const Recommend = ({ show }) => {
  const { loading, data } = useQuery(RECOMMEND)

  if (!show) return

  if (loading) return <div>Loading...</div>

  const { favoriteGenre } = data.me
  const books = data.allBooks.filter(book => book.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
