# Northcoders News API
Northcoders News API is a backend project, the main purpose of which is to show my understanding in JavaScript, Node.js, dealing with asynchronous programming, APIs, Express, SQL queries etc.

My hosted API is availible via the link below:
[Northcoders News](https://nc-news-24h6.onrender.com/api)


## Getting Started
### Node.js
Node.js is required to run this project. If you have not installed it yet, you could download it from the official website:
[Node.js](https://nodejs.org/en)

To check that you have Node.js installed correctly on your computer, type in your terminal

```
node --version
```

and you should see the current Node.js version installed.

This project was built using Node.js v15.5.1 version.

### Postgres
Postgres is a free and open-source relational database management system. 
To install Postgres, please follow the instructions [installing Postgres](https://www.postgresguide.com/setup/install/)

### Git
To be able to clone the repo down onto your computer, you would need to have a local version of git. Please, follow the instruction
[How to install git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Clone the repository
To run application locally, you will need to clone the repo. Navigate to the folder, where you would like to save repo and work from and using the terminal window run:

```
git clone https://github.com/KrisChe8/NC_News_API.git
```

### Dependenies
Once cloned, you need to install the necessary dependencies. In the terminal run the command:

```
npm install
```

### ENV files
With the dependencies installed, you are now ready to create the .env. files for your local application. 
Create .env.development file and add the following:

```
PGDATABASE=nc_news
```

Create .env.test dile and add the following in it:

```
PGDATABASE=nc_news_test
```

### Setting up the databases
First step - you need to setup the test and development databases:

```
npm run setup-dbs
```

Next step - you need to seed tha data:

```
npm run seed
```

## Running tests
This project was created using Test Driven Development(TDD) practice. Therefore there is a complex Test Suite for all endpoints.

To run all tests:

```
npm test app.test.js
```

By default, the test-data will be seeded before each test.  

### Endpoints
Please see the list of valid endpoints below:

```http
GET /api
# Serves up a json representation of all the available endpoints of the api
```

```http
GET /api/topics
# Gets all topics
```

```http
GET /api/articles
# Gets all articles
```

```http
GET /api/articles
# Gets all articles
You can also apply the following queries: "author", "topic", "sort_by", "order" in case you woild like to get only articles of a specific topic/author. Also you can order articles by 'author', 'title','article_id',  'topic', 'votes'. By default, it is ordered by date, the last created comes first.
```

```http
GET /api/articles/:article_id
# Gets an article object by its Id
```

```http
GET /api/articles/:article_id/comments
# Gets an array of comments for the given article id
```

```http
POST /api/articles/:article_id/comments
# Add a comment to a certain article
```

```http
PATCH /api/articles/:article_id
# Update votes for an article by its ID
```

```http
DELETE /api/comments/:comment_id
# Delete the comment by its ID
```

```http
GET /api/users
# Serves an array of all users
```






