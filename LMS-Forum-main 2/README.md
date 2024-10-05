# LMS-Forum
backend and the frontend of the forum application - Warsha

<h1>Forum Application</h1>
<p style="font-weight: 400;">This is a full-stack forum application built using React.js for the frontend and Node.js/Express.js for the backend. The project integrates a local MongoDB server to manage data, with collections for posts, replies, and users.</p>
<h2>Demo</h2>
<ul>
<li><a href="https://drive.google.com/file/d/1nNV7xDQ1HKoFUx2LeX4wS4ZGXTAhNOXw/view?usp=sharing">Application Demo</a></li>
<li><a href="https://drive.google.com/file/d/1bzxxiX8SQIbdPFvLu3l09FerOj6EqLZm/view?usp=drive_link">Sample Data</a></li>
</ul>
<h2>Getting Started</h2>
<h3>Prerequisites</h3>
<ul>
<li>js</li>
<li>npm (Node Package Manager)</li>
<li>MongoDB (local instance)</li>
</ul>
<h3>Running the Application</h3>
<ol style="font-weight: 400;">
<li>Clone the repository:</li>
</ol>
<ul>
<li>git clone <br />cd forum-app</li>
</ul>
<ol style="font-weight: 400;">
<li>Install dependencies for both frontend and backend:</li>
</ol>
<ul>
<li>cd frontend<br />npm install<br />cd ../backend<br />npm install</li>
</ul>
<ol style="font-weight: 400;">
<li>Start MongoDB (Ensure it's running on your local machine):</li>
</ol>
<ul>
<li>mongod</li>
</ul>
<ol style="font-weight: 400;">
<li>Start the Backend (on port 5001):</li>
</ol>
<ul>
<li>cd backend<br />node server.js</li>
</ul>
<ol style="font-weight: 400;">
<li>Start the Frontend (on port 3000):</li>
</ol>
<ul>
<li>cd frontend<br />npm start</li>
</ul>
<h2>Database</h2>
<p style="font-weight: 400;">We are using a local MongoDB server with the database name forumDB. The following collections are included:</p>
<ul>
<li>posts</li>
<li>replies</li>
<li>users</li>
</ul>
<p style="font-weight: 400;">Sample data is available for testing purposes (refer to the demo section for download).</p>
<h3>Admin Role</h3>
<p style="font-weight: 400;">Users with the role Admin have access to additional admin functionalities, including the ability to generate reports.</p>
<h2>Recommended Hosting</h2>
<ul>
<li>It is recommended to host the forum on a subdomain, such as: saumikasenanayake.com.</li>
</ul>
<h2>Frontend Technologies</h2>
<ul>
<li><strong>js</strong>: A JavaScript library for building user interfaces.</li>
<li><strong>Tailwind CSS</strong>: A utility-first CSS framework.</li>
<li><strong>Axios</strong>: Promise-based HTTP client for making API requests.</li>
<li><strong>React Router</strong>: Declarative routing for React applications.</li>
<li><strong>FontAwesome Icons</strong>: Icon set and toolkit for React components.</li>
</ul>
<h2>Backend Technologies</h2>
<ul>
<li><strong>js</strong>: JavaScript runtime built on Chrome's V8 JavaScript engine.</li>
<li><strong>js</strong>: Web framework for Node.js.</li>
<li><strong>MongoDB</strong>: NoSQL database for storing posts, replies, and users.</li>
<li><strong>Mongoose</strong>: ODM (Object Data Modeling) library for MongoDB and Node.js.</li>
<li><strong>JWT (JSON Web Token)</strong>: Used for secure authentication.</li>
<li><strong>Cors</strong>: Middleware for handling Cross-Origin Resource Sharing.</li>
</ul>
<h2>Security and Authentication</h2>
<ul>
<li><strong>BCrypt</strong>: Library for hashing and salting passwords.</li>
<li><strong>HTTPS/TLS</strong>: Implemented for secure data transmission.</li>
</ul>
