import React, { useEffect, useMemo, useState } from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import './css/index.css'
import initialArticles from 'constants/articles'


import ArticlesContext from 'contexts/articlesContext'

import Home from 'components/Home/Home'
import Login from 'components/Login/Login'
import Header from 'components/Header/Header'
import CreateArticle from 'components/CreateArticle/CreateArticle'
import ArticleDetails from 'components/ArticleDetails/ArticleDetails'

const App = () => {
  const [articles, setArticles] = useState(localStorage.getItem('articles')
    ? JSON.parse(localStorage.getItem('articles'))
    : initialArticles
  )
  const articlesContextValue = useMemo(() => (
    {articles, setArticles}
  ), [articles])

  useEffect(() => {
    localStorage.setItem('articles', JSON.stringify(articles))
  },[articles])

  return (
    <ArticlesContext.Provider value={articlesContextValue}>
      <Router>
        <Header />
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/article/create' element={<CreateArticle />} />
            <Route path='/article/:articleId' element={<ArticleDetails />} />
          </Routes>
        </div>
      </Router>
    </ArticlesContext.Provider>

  )
}

export default App
