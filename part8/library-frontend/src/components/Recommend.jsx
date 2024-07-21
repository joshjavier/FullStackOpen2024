import { useQuery, useSubscription } from "@apollo/client"
import { BOOK_ADDED, RECOMMENDED_BOOKS } from "../queries"

const Recommend = ({ show }) => {
  const { loading, data } = useQuery(RECOMMENDED_BOOKS)
  const favoriteGenre = data?.me.favoriteGenre
  const books = data?.recommendedBooks

  useSubscription(BOOK_ADDED, {
    onData: ({ client, data }) => {
      const addedBook = data.data.bookAdded
      if (!addedBook.genres.includes(favoriteGenre)) {
        return
      }

      client.cache.updateQuery(
        { query: RECOMMENDED_BOOKS },
        (result) => {
          return {
            ...result,
            recommendedBooks: result.recommendedBooks.concat(addedBook)
          }
        },
      )
    },
  })

  if (!show) return

  if (loading) return <div>Loading...</div>

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
