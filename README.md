# Nice Reads
Share your Books

## REST API

List of user routes:

Route | HTTPS | Description
-------- |---------|----------
/users/signup | POST | Sign up with new user info
/users/signin | POST | Sign in while get an access token based on credentials
/books/add | POST | Add Book
/books/delete | DELETE | Delete Selected Book
/comment/:bookId/add | POST | Add Comment to Book
/comment/:bookId/delete | DELETE | Delete Selected Comment
/books/read | GET | Get All Book



## Usage
With only npm:
```
npm install
npm start
```
Access the website via https://nice-reads.maxville.net/.
