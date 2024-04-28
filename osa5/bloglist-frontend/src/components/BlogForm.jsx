const BlogForm = ({ 
    handleAddBlog, 
    newBlogTitle,
    setNewBlogTitle,
    newBlogAuthor,
    setNewBlogAuthor,
    newBlogUrl,
    setNewBlogUrl
}) => (
    <form onSubmit={handleAddBlog}>
      <div>
        title:
        <input
          type="text"
          value={newBlogTitle}
          name="title"
          onChange={({ target }) => setNewBlogTitle(target.value)}
        />
      </div>

      <div>
        <label>
        author:
        <input
          type="text"
          value={newBlogAuthor}
          name="author"
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
        </label>
      </div>

      <div>
        url:
        <input
          type="text"
          value={newBlogUrl}
          name="url"
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />   
      </div>

      <button type="submit">create</button>
    </form>
  )

export default BlogForm