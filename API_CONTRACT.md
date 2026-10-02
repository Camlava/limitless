# Limitless API Contract

## User Interface Module

---

## GET /api/users
Returns all users.

**Response 200 OK:**
```json
[
  {
    "id": 3,
    "username": "jlawson0926",
    "first_name": "Jason",
    "status": "ACTIVATED"
  }
]
```

**Error Responses**\
**Response 401 Unauthorized:**\
*Returned when a request is made from a user who lacks valid authentication credentials.*
```json
{
  "error": "Unauthorized",
  "message": "You are unauthorized to make this request."
}
```
**Response 403 Forbidden:**\
*Returned when the server understands the request but refuses to authorize it. Only administrators can list all users.*
```json
{
  "error": "Forbidden",
  "message": "The user is authenticated but lacks the required role."
}
```

---

## GET /api/users/{id}
Returns the full details for a specified user.

**URL Parameters**
* `id` (integer, required): The unique identifier of the user

**Response 200 OK:**
```json
{
  "id": 3,
  "created_by": 1,
  "created_at": "2026-09-15T00:00:00Z",
  "username": "jlawson0926",
  "first_name": "Jason",
  "last_name": "Lawson",
  "home_address": "3212 Example St SW, Atlanta, GA 30033",
  "birth_date": "2000-01-01"
}
```

**Error Responses**\
**Response 401 Unauthorized:**\
*Returned when a request is made from a user who lacks valid authentication credentials.*
```json
{
  "error": "Unauthorized",
  "message": "You are unauthorized to make this request."
}
```
**Response 403 Forbidden:**\
*Returned when the server understands the request but refuses to authorize it.*
```json
{
  "error": "Forbidden",
  "message": "The user is authenticated but lacks the required role."
}
```
**Response 404 Not Found:**\
*Returned when the specified user is not found in the database*
```json
{
  "error": "Not Found",
  "message": "User doesn't exist"
}
```

---

## POST /api/users
Creates a new user and assigns a role. Administrator only. *(Sprint item 2)*

**Request Body:**
```json
{
  "first_name": "Jason",
  "last_name": "Lawson",
  "home_address": "3212 Example St SW, Atlanta, GA 30033",
  "birth_date": "2000-01-01",
  "email_address": "jlawson@example.com",
  "role": "ACCOUNTANT"
}
```

**Response 201 Created:**\
*Username is system-generated as first-initial + last name + two-digit month + two-digit year of account creation.*
```json
{
  "id": 7,
  "username": "jlawson0926",
  "status": "PENDING",
  "role": "ACCOUNTANT"
}
```

**Error Responses**\
**Response 400 Bad Request:**\
*Returned when required fields are missing or malformed.*
```json
{
  "error": "Bad Request",
  "message": "First name, last name, and email address are required."
}
```
**Response 401 Unauthorized:**
```json
{
  "error": "Unauthorized",
  "message": "You are unauthorized to make this request."
}
```
**Response 403 Forbidden:**
```json
{
  "error": "Forbidden",
  "message": "The user is authenticated but lacks the required role."
}
```
**Response 409 Conflict:**\
*Returned when the email address is already registered to another user.*
```json
{
  "error": "Conflict",
  "message": "A user with this email address already exists."
}
```

---

## PUT /api/users/{id}
Updates information for an existing user. Administrator only. *(Sprint item 3)*

**URL Parameters**
* `id` (integer, required): The unique identifier of the user

**Request Body:**
```json
{
  "first_name": "Jason",
  "last_name": "Lawson",
  "home_address": "3212 Example St SW, Atlanta, GA 30033",
  "email_address": "jlawson@example.com",
  "role": "MANAGER"
}
```

**Response 200 OK:**
```json
{
  "id": 7,
  "username": "jlawson0926",
  "first_name": "Jason",
  "last_name": "Lawson",
  "role": "MANAGER"
}
```

**Error Responses**\
**Response 400 Bad Request:**
```json
{
  "error": "Bad Request",
  "message": "One or more fields are invalid."
}
```
**Response 401 Unauthorized:**
```json
{
  "error": "Unauthorized",
  "message": "You are unauthorized to make this request."
}
```
**Response 403 Forbidden:**
```json
{
  "error": "Forbidden",
  "message": "The user is authenticated but lacks the required role."
}
```
**Response 404 Not Found:**
```json
{
  "error": "Not Found",
  "message": "User doesn't exist"
}
```

---

## PUT /api/users/{id}/activate
Activates a user account. Administrator only. *(Sprint item 4)*

**URL Parameters**
* `id` (integer, required): The unique identifier of the user

**Response 200 OK:**
```json
{
  "id": 7,
  "status": "ACTIVATED"
}
```

**Error Responses**\
**Response 401 Unauthorized:**
```json
{
  "error": "Unauthorized",
  "message": "You are unauthorized to make this request."
}
```
**Response 403 Forbidden:**
```json
{
  "error": "Forbidden",
  "message": "The user is authenticated but lacks the required role."
}
```
**Response 404 Not Found:**
```json
{
  "error": "Not Found",
  "message": "User doesn't exist"
}
```

---

## PUT /api/users/{id}/deactivate
Deactivates a user account. Administrator only. *(Sprint item 4)*

**URL Parameters**
* `id` (integer, required): The unique identifier of the user

**Response 200 OK:**
```json
{
  "id": 7,
  "status": "DEACTIVATED"
}
```

**Error Responses**\
**Response 401 Unauthorized:**
```json
{
  "error": "Unauthorized",
  "message": "You are unauthorized to make this request."
}
```
**Response 403 Forbidden:**
```json
{
  "error": "Forbidden",
  "message": "The user is authenticated but lacks the required role."
}
```
**Response 404 Not Found:**
```json
{
  "error": "Not Found",
  "message": "User doesn't exist"
}
```

---

## PUT /api/users/{id}/suspend
Suspends a user for a specified date range, e.g. for extended leave. Administrator only. *(Sprint item 17)*

**URL Parameters**
* `id` (integer, required): The unique identifier of the user

**Request Body:**
```json
{
  "suspension_start": "2026-10-01",
  "suspension_end": "2026-10-15"
}
```

**Response 200 OK:**
```json
{
  "id": 7,
  "status": "SUSPENDED",
  "suspension_start": "2026-10-01",
  "suspension_end": "2026-10-15"
}
```

**Error Responses**\
**Response 400 Bad Request:**\
*Returned when suspension_end is before suspension_start, or dates are missing.*
```json
{
  "error": "Bad Request",
  "message": "Suspension end date must be after the start date."
}
```
**Response 401 Unauthorized:**
```json
{
  "error": "Unauthorized",
  "message": "You are unauthorized to make this request."
}
```
**Response 403 Forbidden:**
```json
{
  "error": "Forbidden",
  "message": "The user is authenticated but lacks the required role."
}
```
**Response 404 Not Found:**
```json
{
  "error": "Not Found",
  "message": "User doesn't exist"
}
```

---

## POST /api/auth/login
Authenticates a user with username and password. *(Sprint items 1, 5, 13)*

**Request Body:**
```json
{
  "username": "jlawson0926",
  "password": "ExamplePass1!"
}
```

**Response 200 OK:**
```json
{
  "id": 7,
  "username": "jlawson0926",
  "picture": "/images/users/7.png",
  "role": "ACCOUNTANT"
}
```

**Error Responses**\
**Response 401 Unauthorized:**\
*Returned for an invalid username/password combination. The same message is used whether the username exists or not, so attackers can't tell which usernames are valid.*
```json
{
  "error": "Unauthorized",
  "message": "Invalid username or password."
}
```
**Response 403 Forbidden:**\
*Returned when the account is suspended or deactivated.*
```json
{
  "error": "Forbidden",
  "message": "This account is suspended."
}
```
**Response 429 Too Many Requests:**\
*Returned on the attempt that pushes the user over the 3 failed-login limit; the account is suspended as a result.*
```json
{
  "error": "Too Many Requests",
  "message": "Account suspended after 3 failed login attempts."
}
```

---

## POST /api/auth/access-requests
Submits a request for first-time system access. *(Sprint item 8)*

**Request Body:**
```json
{
  "first_name": "Jason",
  "last_name": "Lawson",
  "home_address": "3212 Example St SW, Atlanta, GA 30033",
  "birth_date": "2000-01-01",
  "email_address": "jlawson@example.com"
}
```

**Response 201 Created:**\
*Triggers an email notification to the administrator for review.*
```json
{
  "id": 12,
  "status": "PENDING"
}
```

**Error Responses**\
**Response 400 Bad Request:**
```json
{
  "error": "Bad Request",
  "message": "First name, last name, and email address are required."
}
```
**Response 409 Conflict:**
```json
{
  "error": "Conflict",
  "message": "A user with this email address already exists."
}
```

---

## PUT /api/auth/access-requests/{id}/approve
Approves a pending access request and emails the new user a login link. Administrator only. *(Sprint item 8)*

**URL Parameters**
* `id` (integer, required): The unique identifier of the pending user

**Response 200 OK:**
```json
{
  "id": 12,
  "username": "jlawson0926",
  "status": "ACTIVATED"
}
```

**Error Responses**\
**Response 401 Unauthorized:**
```json
{
  "error": "Unauthorized",
  "message": "You are unauthorized to make this request."
}
```
**Response 403 Forbidden:**
```json
{
  "error": "Forbidden",
  "message": "The user is authenticated but lacks the required role."
}
```
**Response 404 Not Found:**
```json
{
  "error": "Not Found",
  "message": "Access request doesn't exist"
}
```

---

## PUT /api/auth/access-requests/{id}/reject
Rejects a pending access request. Administrator only. *(Sprint item 8)*

**URL Parameters**
* `id` (integer, required): The unique identifier of the pending user

**Response 200 OK:**
```json
{
  "id": 12,
  "status": "DEACTIVATED"
}
```

**Error Responses**\
**Response 401 Unauthorized:**
```json
{
  "error": "Unauthorized",
  "message": "You are unauthorized to make this request."
}
```
**Response 403 Forbidden:**
```json
{
  "error": "Forbidden",
  "message": "The user is authenticated but lacks the required role."
}
```
**Response 404 Not Found:**
```json
{
  "error": "Not Found",
  "message": "Access request doesn't exist"
}
```

---

## POST /api/auth/forgot-password
Initiates a password reset by verifying email, username, and security question answers. *(Sprint item 9)*

**Request Body:**
```json
{
  "username": "jlawson0926",
  "email_address": "jlawson@example.com",
  "security_answer1": "Buddy",
  "security_answer2": "Springfield",
  "security_answer3": "Mustang"
}
```

**Response 200 OK:**\
*Returned when all answers match; a reset token is issued for use with POST /api/auth/reset-password.*
```json
{
  "reset_token": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

**Error Responses**\
**Response 400 Bad Request:**
```json
{
  "error": "Bad Request",
  "message": "Username and email address are required."
}
```
**Response 401 Unauthorized:**\
*Returned when the security answers don't match. The same message is used for an unrecognized username/email, so attackers can't tell which accounts exist.*
```json
{
  "error": "Unauthorized",
  "message": "The information provided does not match our records."
}
```

---

## POST /api/auth/reset-password
Sets a new password using a valid reset token. *(Sprint items 10, 11, 12)*

**Request Body:**
```json
{
  "reset_token": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "new_password": "NewPass1!"
}
```

**Response 200 OK:**
```json
{
  "message": "Password successfully reset."
}
```

**Error Responses**\
**Response 400 Bad Request:**\
*Returned when the password doesn't meet complexity requirements (min. 8 characters, starts with a letter, contains a letter, number, and special character).*
```json
{
  "error": "Bad Request",
  "message": "Password must be at least 8 characters, start with a letter, and include a letter, number, and special character."
}
```
**Response 401 Unauthorized:**\
*Returned when the reset token is invalid or expired.*
```json
{
  "error": "Unauthorized",
  "message": "This reset link is invalid or has expired."
}
```
**Response 409 Conflict:**\
*Returned when the new password matches one of the user's previous passwords.*
```json
{
  "error": "Conflict",
  "message": "This password has been used before. Please choose a different password."
}
```

---

## GET /api/users/reports/all
Returns a formatted report of all users in the system. Administrator only. *(Sprint item 16)*

**Response 200 OK:**
```json
[
  {
    "id": 7,
    "username": "jlawson0926",
    "first_name": "Jason",
    "last_name": "Lawson",
    "role": "ACCOUNTANT",
    "status": "ACTIVATED"
  }
]
```

**Error Responses**\
**Response 401 Unauthorized:**
```json
{
  "error": "Unauthorized",
  "message": "You are unauthorized to make this request."
}
```
**Response 403 Forbidden:**
```json
{
  "error": "Forbidden",
  "message": "The user is authenticated but lacks the required role."
}
```

---

## GET /api/users/reports/expired-passwords
Returns a report of all users with expired passwords. Administrator only. *(Sprint item 18)*

**Response 200 OK:**
```json
[
  {
    "id": 9,
    "username": "mbailey0512",
    "password_expiry": "2026-09-01"
  }
]
```

**Error Responses**\
**Response 401 Unauthorized:**
```json
{
  "error": "Unauthorized",
  "message": "You are unauthorized to make this request."
}
```
**Response 403 Forbidden:**
```json
{
  "error": "Forbidden",
  "message": "The user is authenticated but lacks the required role."
}
```

---

## POST /api/users/{id}/send-email
Sends an email to the specified user from within the system. Administrator only. *(Sprint item 19)*

**URL Parameters**
* `id` (integer, required): The unique identifier of the recipient user

**Request Body:**
```json
{
  "subject": "Account Notice",
  "body": "Your account has been reactivated."
}
```

**Response 200 OK:**
```json
{
  "message": "Email sent successfully."
}
```

**Error Responses**\
**Response 400 Bad Request:**
```json
{
  "error": "Bad Request",
  "message": "Subject and body are required."
}
```
**Response 401 Unauthorized:**
```json
{
  "error": "Unauthorized",
  "message": "You are unauthorized to make this request."
}
```
**Response 403 Forbidden:**
```json
{
  "error": "Forbidden",
  "message": "The user is authenticated but lacks the required role."
}
```
**Response 404 Not Found:**
```json
{
  "error": "Not Found",
  "message": "User doesn't exist"
}
```

---

## Accounts, Journal Entries, and Statements Modules
*Not yet scoped for the current sprint*
