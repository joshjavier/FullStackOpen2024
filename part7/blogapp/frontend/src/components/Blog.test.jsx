import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('Blog', () => {
  const blog = {
    title: 'Testing the testing',
    url: 'http://example.com',
    author: 'Ted Tester',
    likes: 10,
  }

  test('renders only title and author by default', () => {
    render(<Blog blog={blog} handleVote={vi.fn()} handleDelete={vi.fn()} />)

    screen.getByText(/Testing the testing/)
    expect(screen.queryByText(/http:\/\/example\.com/)).toBeNull()
  })

  test('renders url and likes after clicking view', async () => {
    const user = userEvent.setup()

    render(<Blog blog={blog} handleVote={vi.fn()} handleDelete={vi.fn()} />)
    const button = screen.getByText('view')
    await user.click(button)

    screen.queryByText(/http:\/\/example\.com/)
    screen.getByText(/likes 10/)
  })

  test('clicking like twice calls event handler twice', async () => {
    const handleVote = vi.fn()
    const user = userEvent.setup()

    render(<Blog blog={blog} handleVote={handleVote} handleDelete={vi.fn()} />)
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleVote.mock.calls).toHaveLength(2)
  })
})
