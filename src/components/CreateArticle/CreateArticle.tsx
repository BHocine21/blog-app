import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'

import ArticlesContext from 'contexts/articlesContext'

const CreateArticle = () => {
  const currentUser = localStorage.getItem('currentUser')
  const navigate = useNavigate()

  // Do not give access to anonymous user, redirect it to home instead.
  if(!currentUser) {
    return <Navigate to='/' />
  }

  // Article fields values.
  const [article, setArticle] = useState({
    title: '',
    content: '',
    img: '',
  })

  // Fields errors values.
  const [errors, setErrors] = useState({
    title: '',
    content: '',
    img: '',
  })

  const handleChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setArticle(prevState => ({
        ...prevState,
        [event.target.name]: URL.createObjectURL(event.target.files[0])
      }))
    }
    else {
      setArticle(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value
      }))
    }
  }

  const handleSubmit = (articles: any, setArticles: any) => {
    // Check if fields are not empty, display error if that is the case.
    if(article.title.length === 0) {
      setErrors({
        title: 'Title is required',
        content: '',
        img: '',
      })
    }
    else if(article.img.length === 0) {
      setErrors({
        title: '',
        content: '',
        img: 'Image is required',
      })
    }
    else if(article.content.length === 0) {
      setErrors({
        title: '',
        content: 'Content is required',
        img: '',
      })
    }
    else {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'))
      // Update articles with the new one.
      const newArticles = [...articles]
      newArticles.push({
        ...article,
        publishedDate: new Date().toJSON().slice(0,10),
        author: `${currentUser.firstName}  ${currentUser.lastName}`,
        authorId: currentUser.authorId,
        id: new Date().getTime(),
      })
      setArticles(newArticles)
      navigate('/')
    }
  }

  return (
    <ArticlesContext.Consumer>
      {({articles, setArticles}) => (
        <div className='d-flex justify-content-center align-items-center h-100'>
          <form className='col-10 mt-5'>
            <div className='form-group'>
              <label>Title</label>
              <input
                type='text'
                className='form-control'
                placeholder='Title'
                name='title'
                value={article.title}
                onChange={handleChange}
              />
              {errors.title.length > 0 &&
                <label className='form-label text-danger'>
                  {errors.title}
                </label>
              }
            </div>
            <div className='form-group'>
              <label>Image</label>
              <input
                type='file'
                className='form-control-file'
                name='img'
                value={''}
                onChange={handleChange}
              />
              {errors.img.length > 0 &&
                <label className='form-label text-danger'>
                  {errors.img}
                </label>
              }
            </div>
            <div className='form-group'>
              <label>Content</label>
              <textarea
                className='form-control'
                rows='3'
                name='content'
                placeholder='A little desciption...'
                onChange={handleChange}
                value={article.content}
              />
                {errors.content.length > 0 &&
                  <label className='form-label text-danger'>
                    {errors.content}
                  </label>
                }
            </div>
            <button
              type='button'
              onClick={() => handleSubmit(articles, setArticles)}
              className='btn btn-success btn-block'
            >
              Publish
            </button>
          </form>
        </div>
      )}
   </ArticlesContext.Consumer>
  )
}

export default CreateArticle
