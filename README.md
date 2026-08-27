# limitless
Class project 

# Local Setup

## Database
### Docker Setup

Download: https://www.docker.com/products/docker-desktop/
1. Install Docker Desktop
2. Run `docker-compose up -d` in project root (where docker-compose.yml is (already included in repo))
3.  Database runs at `localhost:3306`
     - **user**: root
     - **password**: rootpassword
     - **db**: limitless_db
4. Confirm connection with: `docker ps` in command prompt which should list the Docker container running on your system.
 
### MySQL Workbench Setup

Download: https://dev.mysql.com/downloads/workbench/
1. Install MySQL Workbench
2.  Launch MySQL Workbench
     - Click the "+" icon next to MySQL Connections to create a new connection.
3. Connect to Dockerized MySQL (Use the connection details from the Docker setup above (host, port, user, password).
     - If connection fails, wait 10-15s for MySQL to finish initializing and re-try.

## Backend
### Java Setup

Download: https://www.oracle.com/java/technologies/downloads/
1. Spring Boot needs Java Development Kit to run.
2. After installation, verify with `java -version` in command prompt.

### IDE Setup
(We get the free full version of IntelliJ with our student emails!)

Download: https://www.jetbrains.com/academy/student-pack/

## Frontend
### Node.js and npm Setup
Download (Includes npm): https://nodejs.org/en
1. After installation, verify with `node -v` and `npm -v` in command prompt.
