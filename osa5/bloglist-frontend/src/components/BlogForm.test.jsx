import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { input } from '@testing-library/user-event/dist/cjs/event/input.js'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const user = userEvent.setup()

  await user.type(inputs[0], 'testing of form')
  await user.type(inputs[1], 'Test author')
  await user.type(inputs[2], 'http://test.com')

  const sendButton = screen.getByText('create')
  await user.click(sendButton)

  expect(createBlog).toHaveBeenCalledWith({
    title: 'testing of form',
    author: 'Test author',
    url: 'http://test.com',
  })
})