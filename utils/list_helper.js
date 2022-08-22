const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map( blog => blog.likes )
  const reducer = (sum, item) => {
    return sum + item
  }

  return blogs.length === 0
    ? 0
    : likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const max = blogs.length > 0
    ? blogs.reduce((o, v) => (o.likes > v.likes) ? o : v)
    : null
  return max
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
