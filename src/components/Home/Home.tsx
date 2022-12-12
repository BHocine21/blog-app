import { useContext } from 'react'

import ArticlesContext from 'contexts/articlesContext'

import { Article } from 'types/types'

const Home = () => {
  const { articles } = useContext(ArticlesContext)
  return (
    <div className='mt-4'>
      {localStorage.getItem('currentUser') &&
        <div className='d-flex mb-4'>
          <a href='/article/create' className='btn btn-primary mx-auto'>Add new article</a>
        </div>
      }
      <div className='d-flex justify-content-center align-items-center h-100'>
        <div className='col-8 card-deck'>
          {articles.map((article: Article) => (
            <div key={article.id} className='card'>
              <img className='card-img-top' src={article.img} alt='post' />
              <div className='card-body'>
                <h5 className='card-title'>{article.title}</h5>
                <p className='card-text'>{article.content.substring(0,90) + '...'}</p>
                <p className='card-text'>
                  <small className='text-muted'>
                    Author: {article.author}
                  </small>
                  <br/>
                  <small>
                    {article.publishedDate}
                  </small>
                </p>
                <a
                  href={'/article/' + article.id}
                  className='btn btn-primary align-items-center'
                >
                  More details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
