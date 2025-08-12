Daily Progress Summary – Backend (Node.js, Express, MongoDB)

Setup & Initialization

Created a new Git repository and initialized project.

Configured .gitignore for node_modules and other files.

Installed Express and created a basic server listening on port 7777.

Added request handlers for /test and /hello.

Installed nodemon and updated scripts in package.json.


Git & GitHub

Initialized Git locally and created a remote repository on GitHub.

Pushed all code to remote origin.


Routing & Middleware

Explored routes (/hello, /, /hello/2, /xyz) and order of route execution.

Learned about route patterns (?, +, *, ()) and regex in routes (/a/, /.*fly$/).

Read query parameters and dynamic routes.

Implemented multiple route handlers and middleware using next().

Learned app.use() vs app.all().

Created dummy authentication middleware for admin and user routes.

Implemented error handling middleware.


Postman & API Testing

Installed Postman, created a workspace/collection, and tested API calls.

Implemented GET, POST, PATCH, DELETE methods.


MongoDB & Mongoose

Created a free MongoDB Atlas cluster and connected with Mongoose.

Defined userSchema and User model.

Created POST /signup API to insert user data into the database.

Added schema validations (required, unique, minLength, trim, lowercase, default).

Created custom validation for gender field.

Added timestamps in schema.


User APIs

POST /signup – Dynamic data handling & validation.

GET /user/email – Fetch user by email.

GET /feed – Fetch all users.

GET /user/:id – Fetch user by ID.

DELETE /user/:id – Delete user.

PATCH /user – Update user details with validation.


Security & Validation

Installed validator for email, password, and URL checks.

Sanitized data in all APIs.

Installed bcrypt for password hashing.

Installed cookie-parser to handle cookies.

Installed jsonwebtoken for authentication.

Created JWT-based userAuth middleware.

Implemented GET /profile (authenticated route).

Added token & cookie expiry (7 days).


Profile & Authentication APIs

POST /login – Validate credentials, generate JWT, set cookie.

POST /logout – Clear authentication cookie.

PATCH /profile/edit – Edit profile details.

PATCH /profile/password – Update password (forgot password flow).


Connection Requests (DevTinder Features)

Created connectionRequestSchema with validations.

POST /request/send – Send connection request.

POST /request/review/:status/:requestId – Review request with validations.

GET /user/requests/received – View received requests.

GET /user/connections – View connections.

Implemented query operators ($or, $and, $ne, $nin).

Used ref and populate for relationship data.


Advanced MongoDB Concepts

Learned about indexes, compound indexes, and their pros/cons.

Explored schema pre-save hooks.

Implemented pagination in GET /feed API.
