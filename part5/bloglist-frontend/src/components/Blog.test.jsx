import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders the blog title and author, but not URL and number of likes', () => {
    const blog = {
      title: 'The Best Essay',
      author: 'Paul Graham',
      url: 'https://paulgraham.com/best.html',
      likes: 74,
    }

    render(<Blog blog={blog} />)

    expect(screen.getByText('The Best Essay Paul Graham'))
    expect(screen.getByText('https://paulgraham.com/best.html')).not.toBeVisible()
    expect(screen.getByText('likes 74')).not.toBeVisible()
  })
})
