// const fs = require('fs');
// const path = require('path');

// // Define the path to the log file
// const logFilePath = path.join(__dirname, '../logs/debug.log');

// // Function to log messages to a file
// const logToFile = (message) => {
//     const timeStamp = new Date().toISOString(); // Get the current timestamp
//     const logMessage = `${timeStamp} - ${message}\n`; // Format the log message with the timestamp

//     // Ensure the logs directory exists
//     fs.mkdirSync(path.dirname(logFilePath), { recursive: true });

//     // Append the log message to the log file
//     fs.appendFileSync(logFilePath, logMessage, 'utf8');
// };

// module.exports = logToFile;

const fs = require('fs');
const path = require('path');

// Define the path to the log file
const logFilePath = path.join(__dirname, '../logs/debug.log');

// Function to log messages to a file
const logToFile = (message) => {
    console.log('Logging message:', message); // Add this line for debugging
    const timeStamp = new Date().toISOString(); // Get the current timestamp
    const logMessage = `${timeStamp} - ${message}\n`; // Format the log message with the timestamp

    // Ensure the logs directory exists
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });

    // Append the log message to the log file
    fs.appendFileSync(logFilePath, logMessage, 'utf8');
};

module.exports = logToFile;
