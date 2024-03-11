import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  beforeEach(() => {
    const blog = {
      title: 'The Best Essay',
      author: 'Paul Graham',
      url: 'https://paulgraham.com/best.html',
      likes: 74,
    }

    render(<Blog blog={blog} />)
  })

  test('renders the blog title and author, but not URL and number of likes', () => {
    expect(screen.getByText('The Best Essay Paul Graham'))
    expect(screen.getByText('https://paulgraham.com/best.html')).not.toBeVisible()
    expect(screen.getByText('likes 74')).not.toBeVisible()
  })

  test('shows the URL and number of likes when show button is clicked', async () => {
    const user = userEvent.setup()
    const showButton = screen.getByText('show')
    await user.click(showButton)

    expect(screen.getByText('https://paulgraham.com/best.html')).toBeVisible()
    expect(screen.getByText('likes 74')).toBeVisible()
  })
})
