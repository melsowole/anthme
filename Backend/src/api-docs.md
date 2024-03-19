# API Documentation

Start server:

```terminal
npm run start
npm run dev
```

Make reqs to localhost:3000/

## Endpoints

### GET /users

Get all users in db.

### POST /users

Create a user

### GET /user/:id

Get one user by id.

#### Request Body

```json
{
  "username": "string",
  "password": "string",
  "userImage": "string"
}
```

### DELETE /user/:id

Delete user by id.

### POST /user/:id/posts/

Create post for user

#### Request body

```json
{
  "category": "string",
  "title": "string",
  "body": "string"
}
```

### DELETE /user/:user-id/posts/delete/:post-id

Delete post for user

### GET /users/:user-id/posts

Get all posts of a user
