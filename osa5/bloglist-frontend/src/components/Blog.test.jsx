import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

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

test('renders blog info when button is clicked', async () => {
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

  const user = userEvent.setup()
  const button = await screen.findByText('view')
  await user.click(button)

  const urlElement = screen.getByText('URL: http://test.com')
  expect(urlElement).toBeInTheDocument()

  const likesElement = screen.getByText('Likes: 5')
  expect(likesElement).toBeInTheDocument()

  const nameElement = screen.getByText('Name: Test User')
  expect(nameElement).toBeInTheDocument()
})

test('clicking the like button calls event handler two times', async () => {
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

  const mockHandler = vi.fn()

  render(<Blog blog={blog} loggedUser={loggedUser} onLike={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = await screen.findByText('view')
  await user.click(viewButton)

  const likeButton = await screen.findByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})