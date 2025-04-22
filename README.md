
# PrabhatVerse

PrabhatVerse is a powerful portfolio application designed to showcase advanced AI and speech-to-text capabilities. It leverages a chatbot and voice model to provide intelligent responses. The profile section is protected, allowing only the admin to update data such as resumes and other information for training purposes.

## Features

- **Speech to Text**: Convert your speech into text using the microphone.
- **Chatbot Interaction**: Engage with a smart chatbot powered by AI, trained with various datasets.
- **Voice Responses**: The app uses voice models to give spoken responses.
- **Admin Access**: Only the admin has the ability to update the data, including the resume and profile section.
- **Custom Chrome Integration**: Seamlessly works within Chrome for better user experience.
- **Profile (Admin) Section**: Admin users can feed data for training the AI and manage content.
- **Admin-Only Updates**: Resume and profile data can only be updated by the admin.

## Prerequisites

- Node.js (v16 or above)
- npm or yarn (Node package manager)

## Installation and Running the Application

1. **Clone the Repository**

   First, clone the repository to your local machine using:

   ```bash
   git clone https://github.com/Hugs-4-Bugs/PrabhatVerse.git
   cd PrabhatVerse
   ```

2. **Install Dependencies**

   Install the required dependencies using npm or yarn:

   ```bash
   npm install
   ```

   Or, if you're using yarn:

   ```bash
   yarn install
   ```

3. **Running the Application**

   To start the application in development mode, use the following command:

   ```bash
   npm run dev
   ```

   Or with yarn:

   ```bash
   yarn dev
   ```

   The application will be available at [http://localhost:5173](http://localhost:5173) or the provided network URL.

## Admin Access

- The **Profile(Admin)** section is accessible only to the admin. Here, the admin can:
  - Feed data for training purposes.
  - Update the resume and other personal information.
  - Analyze the data that drives both the chatbot and the voice model responses.

### Default Admin Credentials:
- **Username**: your_username
- **Password**: your_password

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
