# MDrive - Cloud Storage Application

MDrive is a secure and reliable platform for storing, managing, and sharing files. This web application allows users to upload, store, and download various types of files including images, PDFs, documents, and more.

## Live Demo

**[Try MDrive Here](https://mdrive-5.onrender.com/)**

![MDrive Screenshot](https://via.placeholder.com/800x400?text=MDrive+Screenshot)

![Alt Text](./images/image-name.png)

## Features

- **User Authentication**: Secure registration and login system
- **File Upload**: Easy file uploading with drag and drop interface
- **File Management**: View and manage your uploaded files
- **File Download**: Download your files when needed
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode Support**: Enhanced viewing experience in different lighting conditions

## Tech Stack

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - JWT Authentication
  - Bcrypt for password hashing

- **Frontend**:
  - EJS Templates
  - Tailwind CSS
  - Flowbite UI components
  - JavaScript

- **File Storage**:
  - Cloudinary API

## Project Structure

```
📦 MDrive
 ┣ 📂 config
 ┃ ┣ 📜 cloudinary.config.js
 ┃ ┗ 📜 db.js
 ┣ 📂 middlewares
 ┃ ┗ 📜 authe.js
 ┣ 📂 models
 ┃ ┣ 📜 file.model.js
 ┃ ┗ 📜 user.model.js
 ┣ 📂 routes
 ┃ ┣ 📜 index.routes.js
 ┃ ┗ 📜 user.routes.js
 ┣ 📂 views
 ┃ ┣ 📜 about.ejs
 ┃ ┣ 📜 home.ejs
 ┃ ┣ 📜 index.ejs
 ┃ ┣ 📜 login.ejs
 ┃ ┗ 📜 register.ejs
 ┣ 📜 .env.example
 ┣ 📜 .gitignore
 ┣ 📜 app.js
 ┣ 📜 package.json
 ┗ 📜 README.md
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account

### Step 1: Clone the repository

```bash
git clone https://github.com/yourusername/mdrive.git
cd mdrive
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Configure environment variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Step 4: Start the application

```bash
npm start
```

The application should now be running at `http://localhost:3000`

## Usage

1. **Register/Login**: Create an account or log in with existing credentials
2. **Upload Files**: Click the "Upload File" button on the dashboard to upload files
3. **View Files**: All your uploaded files will appear on the dashboard
4. **Download Files**: Click the download button next to any file to download it

## API Routes

### Authentication Routes

- `POST /user/register` - Register a new user
- `POST /user/login` - Login existing user
- `GET /user/logout` - Logout current user

### File Routes

- `POST /upload` - Upload a file
- `GET /download/:public_id` - Download a file by its public ID
- `GET /home` - View all uploaded files

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- HTTP-only cookies for token storage
- Input validation with express-validator
- Protected routes with authentication middleware

## Future Enhancements

- File sharing functionality
- User profile management
- Folder organization for files
- File preview functionality
- Advanced search and filtering options
- Collaborative features

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Flowbite](https://flowbite.com/)
