## GET /api/users
Returns all users.

https://http.cat/status/200

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

## GET /api/users{id}
Returns the full details for a specified user.

**URL Parameters**
* `id` (integer, required): The unique identifier of the user

https://http.cat/status/200

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
