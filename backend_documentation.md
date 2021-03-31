# My Books Backend

# API Documentation

## Users Model

- Creating a user

For creating a user, use the endpoint at **/api/v1/users/** with the following required details

```json
{
	"username":"varchar",
	"email":"varchar",
	"first_name":"varchar",
	"last_name":"varchar",
	"password":"varchar",
	"is_staff":"boolean",
	"picture":"varchar",
	"cropped_data":"varchar",
	"preferred_genres":"Array(varchar)"
}
```

Request must be POST.

- Login

For logging in, use the endpoint at **/api/v1/auth/login/** with the following required details

```json
{
	"email":"varchar",
	"password":"varchar"
}
```

Request must be POST.

## Books Model

- Creating a book

For creating a book, use the endpoint at **/api/v1/books/** with the following required details

```json
{
	"name":"varchar",
	"author":"Array(varchar)",
	"genres":"Array(varchar)",
	"picture":"varchar",
	"cropped_data":"varchar",
	"about_text":"varchar",
	"rating":"float",
	"google_link":"varchar"
}
```

Request must be POST.

- Delete a book

For Deleting a book, use the endpoint at **/api/v1/books/{book_id}** 

```json
{
	"book_id":"integer",
}
```

Session token required

Request must be DELETE.

- Search a book

For Searching a book, use the endpoint at **/api/v1/books/?search=${search_text}** 

```json
{
	"search_text":"varchar",
}
```

Request must be GET.

## Actions

- Books Genre Recommendation

For getting books based on preferred genres array in Users model, use the endpoint at **api/v1/books/books_genre_recommendation?username={username}** 

```json
{
	"username":"varchar",
}
```

Request must be GET.

- Books genre recommendation

For getting books based on preferred genres array in Users model, use the endpoint at **api/v1/books/books_genre_recommendation?username={username}** 

```json
{
	"username":"varchar",
}
```

Request must be GET.

- Books rating patch

For updating rating of a book, when the user rates it. Use the endpoint at **api/v1/books/books_rating_patch**

**Data** 

```json
{
	"rating":"float",
}
```

Request must be PATCH.

## Ratings Model

- Creating a rating mapping

For creating a book, use the endpoint at **/api/v1/ratings/** with the following required details

All rating mappings must be unique.

```json
{
	"user_id":"Users model object (Foreign Key)",
	"book_id":"Books model object (Foreign Key)",
	"rating":"float"
}
```

Request must be POST.

## Actions

- User book rated

For checking if an user has rated a given book, use the endpoint at **api/v1/ratings/user_book_rated**

**Data** 

```json
{
	"user_id":"integer",
	"book_id": "integer"
}
```

Request must be POST.

Response status 200: User has rated the book

Response status 400: User has not rated the book   

- Collaborative filtered recommendations

Returns book objects returned by a function which applies item based collaborative filtering, use the endpoint at **api/v1/ratings/recommendations**

**Data** 

```json
{
	"username":"varchar"
}
```

Session token required

Request must be POST.