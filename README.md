# CodeSync

A real-time collaborative code editor built with React, Express, MongoDB, and Socket.IO.

## Features
- Real-time code editing and synchronization across clients
- RESTful API for page content management
- Automatic document expiration (24 hours)
- Modern UI with syntax highlighting
- Real-time collaboration with multiple users

## Tech Stack
- **Frontend**: React, Vite, Socket.IO Client
- **Backend**: Node.js, Express, Socket.IO
- **Database**: MongoDB
- **Deployment**: Netlify (Frontend), Render (Backend)

## Project Structure
```
CodeSync/
├── frontend/         # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── styles/
│   └── package.json
└── backend/          # Express backend
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   └── services/
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB instance (local or Atlas)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jenilsoni01/CodeSync.git
   cd CodeSync
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   npm install
   ```

4. Set up environment variables:
   - Frontend (.env):
     ```
     VITE_API_URL=http://localhost:3000/api
     VITE_SOCKET_URL=http://localhost:3000
     ```
   - Backend (.env):
     ```
     PORT=3000
     MONGODB_URI=your_mongodb_uri
     CORS_ORIGIN=http://localhost:5173
     ```

5. Start development servers:
   - Frontend:
     ```bash
     cd frontend
     npm run dev
     ```
   - Backend:
     ```bash
     cd backend
     npm start
     ```

## Usage
1. Open the frontend in your browser (default: http://localhost:5173)
2. Create or join a page by navigating to `/:pageId` (e.g., `/firstpage`)
3. Start editing code and see real-time updates across all connected clients

## Deployment
- Frontend is deployed on Netlify
- Backend is deployed on Render
- MongoDB Atlas for database

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author
- **Jenil Soni**
  - GitHub: [@jenilsoni01](https://github.com/jenilsoni01)

## Acknowledgments
- Socket.IO for real-time communication
- React and Vite for the frontend framework
- Express for the backend framework
- MongoDB for the database

