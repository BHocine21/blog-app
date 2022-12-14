import { useNavigate, useParams } from 'react-router-dom'

import { Article } from 'types/types'

import articles from 'constants/articles'

import ArticlesContext from 'contexts/articlesContext'

const ArticleDetails = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const navigate = useNavigate()

  // Get article details.
  const articleId = parseInt(useParams().articleId, 10)
  const articleDetails: Article = articles.find(article => article.id === articleId)

  const deleteArticle = (articles: Article[], setArticles: (articles: Article[]) => void) => {
    // Remove selected article.
    const newArticles = articles.filter((article: Article) => article.id !== articleDetails.id)

    // Update articles and redirect to home page.
    setArticles(newArticles)
    navigate('/')
  }

  return (
    <ArticlesContext.Consumer>
      {({ articles, setArticles }) => (
        <div className='card mb-3'>
          <img className='card-img-top' style={{ objectFit: 'cover',height: '400px' }} src={articleDetails.img} alt='post' />
          <div className='card-body'>
            <h5 className='card-title'>{articleDetails.title}</h5>
            <p className='card-text'>{articleDetails.content}</p>
            <p className='card-text'>
              <small className='text-muted'>Author: {articleDetails.author}</small>
              <br/>
              <small>{articleDetails.publishedDate}</small>
            </p>
            {currentUser && (articleDetails.authorId === currentUser.id || currentUser.role === 'admin') &&
              <div className='d-flex mb-4'>
                <button
                  className='btn btn-danger mx-auto'
                  onClick={() => deleteArticle(articles, setArticles)}
                >
                  Delete
                </button>
              </div>
            }
          </div>
        </div>
      )}
    </ArticlesContext.Consumer>
  )
}

export default ArticleDetails
