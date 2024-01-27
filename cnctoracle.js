const mysql = require('mysql');

const dbConfig = {
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '',
  database: 'onchain',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('MySQL database connected');
    // You can now use the MySQL connection
    // Perform your database operations here
  }
});
/*
connection.end((err) => {
  if (err) {
    console.error('MySQL connection close error:', err);
  } else {
    console.log('MySQL database connection closed');
  }
});*/


function createAccount(publickey,privatekey ,username ,password) {
  const sql = 'INSERT INTO onchaintable (publickey,privatekey ,username ,password ) VALUES (?, ?, ?,?)';
  const values = [publickey,privatekey ,username ,password];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error creating account:', err);
    } else {
      console.log('Account created successfully');
    }
  });
}

// Example usage
const newUsername = 'samir';
const newPassword = 'soupape';
const newPublicKey = 'public_key_value';
const newPrivateKey = 'private_key_value';

createAccount(newUsername, newPassword, newPublicKey, newPrivateKey);

// Close the database connection when done
connection.end();