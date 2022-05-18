# blog-microservices

- **client** is the frontend of the blog, written in React.js
- **posts** service creates posts and returns all posts
- **comments** service creates or returns a comment in a post
- **moderation** service rejects comments that has a word in a defined list of bad words
- **query** service returns all data about all posts, including all their comments
- **event bus** handle communication among services asynchronously
