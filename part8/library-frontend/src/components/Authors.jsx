import { useQuery, useSubscription } from "@apollo/client"
import { ALL_AUTHORS, BOOK_ADDED } from "../queries"
import BirthYearForm from "./BirthYearForm"

const Authors = (props) => {
  const { loading, data } = useQuery(ALL_AUTHORS)

  useSubscription(BOOK_ADDED, {
    onData: ({ client, data }) => {
      const addedBook = data.data.bookAdded
      client.cache.updateQuery(
        { query: ALL_AUTHORS },
        ({ allAuthors }) => {
          const authorIds = allAuthors.map(author => author.id)
          if (authorIds.includes(addedBook.author.id)) {
            allAuthors = allAuthors.map(author => {
              return author.id === addedBook.author.id
                ? { ...author, bookCount: addedBook.author.bookCount }
                : author
            })
          } else {
            allAuthors = allAuthors.concat(addedBook.author)
          }

          return { allAuthors }
        },
      )
    },
  })

  if (!props.show) return

  if (loading) return <div>Loading...</div>

  const authors = data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthYearForm options={authors} />
    </div>
  )
}

export default Authors
