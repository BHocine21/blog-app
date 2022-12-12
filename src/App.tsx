import { useEffect, useMemo, useState } from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import initialArticles from 'constants/articles'

import ArticlesContext from 'contexts/articlesContext'

import Home from 'components/Home/Home'
import Login from 'components/Login/Login'
import Header from 'components/Header/Header'
import CreateArticle from 'components/CreateArticle/CreateArticle'
import ArticleDetails from 'components/ArticleDetails/ArticleDetails'

const App = () => {
  // Get articles from local storage if exists, else get initial values.
  const [articles, setArticles] = useState(localStorage.getItem('articles')
    ? JSON.parse(localStorage.getItem('articles'))
    : initialArticles
  )

  // Create context for articles in order to set it when adding or deleting articles.
  const articlesContextValue = useMemo(() => (
    {articles, setArticles}
  ), [articles])

  // Update locale storage when articles change.
  useEffect(() => {
    localStorage.setItem('articles', JSON.stringify(articles))
  },[articles])

  return (
    <ArticlesContext.Provider value={articlesContextValue}>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/article/create' element={<CreateArticle />} />
          <Route path='/article/:articleId' element={<ArticleDetails />} />
        </Routes>
      </Router>
    </ArticlesContext.Provider>
  )
}

export default App
