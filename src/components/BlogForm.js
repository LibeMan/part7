const BlogForm = ({ onSubmit, handleTitleChange, title, handleAuthorChange, author, handleUrlChange, url}) => {



    return (
      <div>
        <h2>Create a new blog</h2>
  
        <form onSubmit={onSubmit}>
          Title: <input
            title={title}
            onChange={handleTitleChange}
          /> <br/>
          Author: <input
            author={author}
            onChange={handleAuthorChange}
          /> <br/>
          Url: <input
            url={url}
            onChange={handleUrlChange}
          /><br/>
          <button type="submit">save</button>
        </form>
      </div>
    )
  }

export default BlogForm