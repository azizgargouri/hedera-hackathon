const mysql = require('mysql');

class Connection {
    constructor() {}

    createConnection() {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'azizgargouri', // insert your database username
            password: 'esprit18', // insert your database password
            database: 'source_projet2A.' // insert your database name
        });

        connection.connect((err) => {
            if (err) {
                console.error('Error connecting to database:', err.stack);
                return;
            }
            console.log('Connected to database.');
        });

        return connection;
    }
}

module.exports = Connection;

const Connection = require('./Connection');

// Create a new instance of the Connection class
const connection = new Connection();

// Create the database connection
const dbConnection = connection.createConnection();

// Perform database operations using dbConnection