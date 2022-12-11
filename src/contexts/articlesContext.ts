import React from 'react'

const ArticlesContext = React.createContext({
  articles: [],
  setArticles: () => null,
});

export default ArticlesContext
