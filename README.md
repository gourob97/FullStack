# FullStack

A full stack project, featuring a React client app, Express APIs, MySQL database, and Redis cache server. The React app provides a user interface, while Express handles server-side operations. MySQL stores data, and Redis acts as a cache.


## Descripton
This project allows users to manage their movie collection. Users can add new movies to their list and delete movies they no longer want to keep.
## Setup

Follow these steps to set up the project on your local machine:

1. **Installing Node.js:** Ensure that Node.js is installed on your system. If not, you can download and install it from the official Node.js website: [https://nodejs.org](https://nodejs.org)

2. **Installing MySQL:** Install MySQL on your machine. You can download MySQL from the official website and follow the installation instructions: [https://www.mysql.com](https://www.mysql.com)
   ## Note

    1. Create a database user named `devops` with password `Gourob&1234` .(You can get help from [here](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04) )
    2. Create a database named `mydb` and inside `mydb` create a table called `movie` using `devops` user with the following scema.
      ```sql
         CREATE TABLE movie (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255)
         );

      ```
     3. Make sure `mysql` service is running on default port on your machine
    


3. **Installing Redis:** Install Redis, the cache server used in this project. Visit the Redis official website for installation instructions: [https://redis.io](https://redis.io)
   - Make sure `redis` server is running on default port on your machine

4. **Running the Project:**

   - **Clone the Repository:** Clone the repository to your local machine.
      ```
      git clone https://github.com/gourob97/FullStack
      ```

   - **Server Setup:**
     - Open a new terminal or command prompt.
     - Navigate to the "server" folder.
     - Install the dependencies by running the following command:
       ```
       npm install
       ```
     - Start the server by running the following command:
       ```
       node index.js
       ```
     - The server will be running on `http://localhost:5000`.

   - **Frontend Setup:**
     - Open a new terminal or command prompt.
     - Navigate to the "frontend" folder.
     - Install the dependencies by running the following command:
       ```
       npm install
       ```
     - Start the frontend development server by running the following command:
       ```
       npm run dev
       ```
     - The server will be running on `http://localhost:5173`.
     - The frontend will be running and can be accessed through a web browser.
