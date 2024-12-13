# Doctor Appointment Booking System (MERN)

## **Overview**
The Doctor Appointment Booking System is a web application that facilitates users (patients) to book appointments with doctors seamlessly. It provides role-based functionalities for four distinct user types: **Admin**, **Hospital**, **Doctor**, and **User (Patient)**. The project is built using the MERN stack (MongoDB, Express.js, React, Node.js) and integrates modern tools like Redux, Material-UI, Tailwind CSS, and payment gateways (Stripe/Razorpay).

---

## **Features**

### **User Features**
- **Registration & Login**: Secure authentication using JWT or OAuth.
- **Search Doctors**: Search by specialization, hospital, or location.
- **Book Appointments**: Choose a doctor, select time slots, and make payments online.
- **View Appointments**: Track past and upcoming appointments.
- **Cancel Appointments**: Cancel appointments if needed.

### **Doctor Features**
- **Manage Schedules**: Add or update availability (time slots and days).
- **View Appointments**: Track and manage patient appointments.
- **Update Appointment Status**: Mark appointments as confirmed, completed, or canceled.

### **Hospital Features**
- **Manage Doctors**: Add, update, or remove doctor profiles.
- **Set Availability**: Define availability for doctors.
- **Manage Appointments**: View and update all appointments for their hospital.

### **Admin Features**
- **Dashboard**: View system-wide analytics (users, hospitals, appointments).
- **Manage Users**: View and delete user accounts.
- **Manage Hospitals**: Add, update, or remove hospitals.
- **Approve Doctors**: Review and approve doctor profiles submitted by hospitals.

---

## **Technology Stack**

### **Frontend**
- React (with Material-UI and Tailwind CSS for styling)
- Redux for state management

### **Backend**
- Node.js
- Express.js

### **Database**
- MongoDB (with Mongoose for schema design)

### **Authentication**
- JWT or OAuth for secure login

### **Payment Gateway**
- Stripe or Razorpay for secure appointment payments

---

## **Installation**

### **Prerequisites**
Ensure you have the following installed:
- Node.js (>=14.x)
- MongoDB (local or cloud-based like MongoDB Atlas)
- Yarn or npm

### **Steps to Run Locally**

#### **1. Clone the Repository**
```bash
git clone https://github.com/OletiSatish/Doctor_Appointment_Booking_System_MERN.git
cd Doctor_Appointment_Booking_System_MERN
```

#### **2. Install Dependencies**

**Frontend**
```bash
cd client
npm install
```

**Backend**
```bash
cd server
npm install
```

#### **3. Set Up Environment Variables**
Create a `.env` file in the `server` directory with the following variables:
```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
```

#### **4. Start the Application**

**Backend**
```bash
cd server
npm start
```

**Frontend**
```bash
cd client
npm run dev
```

Access the application at `http://localhost:5173`.

---

## **Folder Structure**

```plaintext
DoctorAppointmentSystem/
|
├── client/                       # Frontend code
│   ├── public/                   # Static assets
│   ├── src/                      # React app source
│       ├── components/           # Reusable components
│       ├── pages/                # Application pages
│       ├── redux/                # Redux state management
│       ├── utils/                # Helper functions
│       ├── App.js                # Main React component
│       └── index.js              # React entry point
│
├── server/                       # Backend code
│   ├── config/                   # Configuration files
│   ├── controllers/              # Business logic
│   ├── middleware/               # Express middleware
│   ├── models/                   # MongoDB schemas
│   ├── routes/                   # Express routes
│   └── server.js                 # Backend entry point
│
├── .env                          # Environment variables
├── package.json                  # Project dependencies (root)
├── README.md                     # Documentation
└── yarn.lock / package-lock.json # Dependency lock file
```

---

## **API Endpoints**

### **Authentication**
- **POST /api/auth/register**: Register a new user
- **POST /api/auth/login**: Login a user

### **User**
- **GET /api/users/me**: Get user profile
- **POST /api/users/book-appointment**: Book an appointment

### **Doctor**
- **GET /api/doctors/availability**: Get doctor’s availability
- **POST /api/doctors/update-schedule**: Update schedule

### **Hospital**
- **GET /api/hospitals/doctors**: Get all doctors
- **POST /api/hospitals/add-doctor**: Add a new doctor

### **Admin**
- **GET /api/admin/users**: Get all users
- **POST /api/admin/add-hospital**: Add a new hospital

---

## **Future Enhancements**
- Implement notifications for appointment reminders.
- Add multi-language support.
- Include teleconsultation features for remote appointments.

---

## **Contributing**
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request.

---

## **License**
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## **Contact**
For any inquiries or issues, contact:
- **Name**: Satishkumar Oleti
- **Email**: satishkumar.oleti@example.com (replace with your email)

