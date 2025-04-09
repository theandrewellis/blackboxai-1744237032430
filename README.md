
Built by https://www.blackbox.ai

---

```markdown
# User Workspace

## Project Overview

User Workspace is a Node.js application built using Express that allows users to upload large video files (up to 5GB) and serves static files, including an HTML front-end. The application is designed for simplicity and ease of use, catering to needs related to file management and distribution in a local or development environment.

## Features

- **File Upload**: Users can upload video files up to 5GB in size.
- **Static File Serving**: Serves static files like HTML, CSS, and JS from a public directory.
- **Video Listing**: Lists all uploaded video files dynamically.
- **Logging**: Logs incoming requests and any errors encountered.
- **HTTPS Support**: Supports secure connections if SSL certificates are provided.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd user-workspace
   ```

2. **Install dependencies**:
   Make sure you have [Node.js](https://nodejs.org/en/) installed. Then run:
   ```bash
   npm install
   ```

3. **Create an uploads directory (if not already created)**:
   The application automatically checks and creates the `uploads` directory if it does not exist.

4. **Run the server**:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:8000`.

5. **(Optional) Enable HTTPS**:
   If you have SSL certificates named `selfsigned.key` and `selfsigned.crt`, place them in the project root directory to enable HTTPS on port 4433.

## Usage

1. **Access the application**:
   Open your web browser and go to `http://localhost:8000` to access the main interface.

2. **File Upload**:
   Use the file upload section to select and upload video files.

3. **View Uploaded Videos**:
   You can access the `/videos` endpoint to see a list of uploaded video files.

## Dependencies

The application relies on the following npm packages:

- **express**: A fast, unopinionated, minimalist web framework for Node.js.
- **multer**: A middleware for handling `multipart/form-data`, which is primarily used for uploading files.

These dependencies are specified in the `package.json` file:

```json
"dependencies": {
  "express": "^5.1.0",
  "multer": "^1.4.5-lts.2"
}
```

## Project Structure

The project directory contains the following structure:

```
user-workspace/
├── node_modules/         # Directory of installed npm packages
├── uploads/              # Directory for uploaded video files
├── public/               # Directory for static files (HTML, CSS, JS)
│   ├── index.html        # Main HTML file
│   ├── favicon.ico       # Favicon for the application
│   └── styles.css        # Optional CSS file for styling
├── server.js             # Main server file
├── package.json          # NPM configuration file
└── package-lock.json     # NPM lock file for dependency versions
```

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
```