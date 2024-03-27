
# Redlog - Mini Blog App

Redlog is a mini blog application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with additional features such as user authentication (login and registration), post uploading, updating, and file uploads. The front-end is developed using React.js with Vite for a fast development environment setup.

## Features

- **User Authentication**: Users can register and login securely to manage their posts.
- **Post Management**: Users can upload, update, and delete their posts.
- **Rich Text Editing**: Utilize a rich text editor for composing blog posts.
- **File Uploads**: Ability to upload files along with blog posts.
- **Responsive Design**: Ensures the application works seamlessly across devices of all sizes.

## Tech Stack

- **Frontend**: React.js, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/redlog.git
    ```

2. Navigate to the project directory:

    ```bash
    cd redlog
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

    - Create a `.env` file in the root directory.
    - Define the following environment variables:

    ```plaintext
    PORT=3000
    MONGODB_URI=your_mongodb_uri
    ```

5. Start the development server:

    ```bash
    npm run dev
    ```

6. Open your browser and visit `http://localhost:3000` to view the application.

## Usage

- Register a new account or log in with existing credentials.
- Once logged in, you can create new posts, update existing ones, or delete them.
- You can also upload files along with your posts.

## Contributing

Contributions are welcome! Please follow the steps below:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- This project was inspired by the need for a simple yet powerful blogging platform.
- Special thanks to the MERN stack developers and the Vite team for their amazing tools and documentation.
