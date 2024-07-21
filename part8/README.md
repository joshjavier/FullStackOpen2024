# Part 8 notes

- GraphQL - REST alternative that is ideal for apps like social media, with data structures that have a lot of interrelationships that may not be obvious at the onset
- all GraphQL queries are sent to the same address via POST

## Resources

- [MongoDB & Mongoose: Compatibility and Comparison](https://www.mongodb.com/developer/languages/javascript/mongoose-versus-nodejs-driver/) - This article got me to try using just the MongoDB Node.js driver instead of Mongoose in exercises 8.13-8.16. It gave me a slightly deeper understanding of the convenience methods that Mongoose provides on top of "vanilla" MongoDB, and how Mongoose makes it easy to use a NoSQL database using the mental model of a relational database. On the other hand, Mongoose is an abstraction that could easily become a crutch for not bothering to learn good NoSQL database design, so, something to keep in mind.

- [Is Mongoose Bad?](https://forum.freecodecamp.org/t/is-mongoose-bad/495392) - Interesting takes on the benefits of using Mongoose vs "vanilla" MongoDB Node.js driver. My takeaway is that Mongoose gets you up to speed if coming from a SQL/relational database background, but you're also missing out on the enhancements that NoSQL has over SQL.

- [The Little Mongo DB Schema Design Book](https://www.amazon.com/gp/product/1517394023) - TO READ

- [Practical MongoDB Aggregations book](https://www.practical-mongodb-aggregations.com/)

- [Visualizing the N+1 Problem in GraphQL](https://dineshpandiyan.com/blog/graphql-n+1/)
