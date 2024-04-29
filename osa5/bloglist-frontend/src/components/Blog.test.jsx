import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author', () => {
  const blog = {
    title: 'Test blog title',
    author: 'Test author',
    url: 'http://test.com',
    likes: 5,
    user: {
      name: 'Test User',
      username: 'testuser',
    },
  }

  const loggedUser = {
    username: 'testuser',
  }

  render(<Blog blog={blog} loggedUser={loggedUser} />)

  const titleElement = screen.getByText('Test blog title Test author')
  expect(titleElement).toBeInTheDocument()
})