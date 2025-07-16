# 🗳️ TrueVote (Backend Voting System)

**TrueVote** is a backend application for a secure and simple voting system. Users can vote for their preferred candidates, while administrators manage candidate details. The system ensures authenticated and one-time voting only.

---

## 🚀 Features

- User **sign up** and **login** with Aadhar Card Number and password  
- Users can **view all candidates**  
- Users can **vote only once**  
- **Admin** can:
  - Add new candidates  
  - Update candidate details  
  - Delete candidates  
- Admin **cannot vote**

---

## 🛠️ Technologies Used

- **Node.js**  
- **Express.js**  
- **MongoDB**  
- **Mongoose**  
- **JWT (JSON Web Token)** – for secure authentication

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/Prince-1501/voting_app.git
Navigate to the project folder:

Edit
cd voting_app
Install dependencies:


npm install
Create a .env file and add your MongoDB URI and JWT secret:


MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
Start the server:


npm start
📡 API Endpoints
🔐 Authentication
Method	Endpoint	Description
POST	/signup	Sign up a user
POST	/login	Login a user

🎯 Candidates
Method	Endpoint	Description
GET	/candidates	Get list of all candidates
POST	/candidates	Add new candidate (Admin only)
PUT	/candidates/:id	Update a candidate (Admin only)
DELETE	/candidates/:id	Delete a candidate (Admin only)

🗳️ Voting
Method	Endpoint	Description
GET	/candidates/vote/count	Get vote count for all candidates
POST	/candidates/vote/:id	Vote for a candidate (User only)

👤 User Profile
Method	Endpoint	Description
GET	/users/profile	Get logged-in user profile
PUT	/users/profile/password	Change user password

📝 License
This project is open-source and available under the MIT License.

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

📬 Contact
For any issues or suggestions, please reach out rajesh-kayal-dev || https://www.linkedin.com/in/rajesh110/.
