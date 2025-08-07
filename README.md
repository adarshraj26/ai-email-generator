# AI Email Sender

A full-stack application that generates professional emails using AI and sends them to multiple recipients. Built with React frontend and Node.js backend, powered by Groq AI.

## Features

- 🤖 **AI-Powered Email Generation**: Uses Groq AI and Gemini AI to generate professional emails based on prompts
- 📧 **Email Sending**: Send emails to multiple recipients using Gmail SMTP
- ✏️ **Editable Content**: Review and edit generated emails before sending
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations
- 📱 **Mobile Friendly**: Works perfectly on all devices
- ⚡ **Real-time Feedback**: Loading states and success/error messages

## Tech Stack

- **Frontend**: React.js, Axios, Lucide React Icons
- **Backend**: Node.js, Express.js, Nodemailer
- **AI**: Groq API (Llama 3.1 8B model) and Gemini AI
- **Email**: Gmail SMTP
- **Styling**: CSS3 with modern gradients and animations

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Gmail account with app password
- Groq API key

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm run install-all
   ```

2. **Configure environment variables:**
   
   Create a `.env` file in the `server` directory:
   ```env
   # AI API Keys (Choose one or more)
   # Gemini AI API Key (Recommended)
   GEMINI_API_KEY=your-gemini-api-key
   
   # Perplexity AI API Key
   PERPLEXITY_API_KEY=your-perplexity-api-key
   
   # Groq AI API Key
   GROQ_API_KEY=gsk_your_groq_api_key_here
   
   # Email Configuration (Gmail)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   
   # Server Port
   PORT=5000
   ```

3. **Get your AI API key (choose one or more):**
   
   **Gemini AI (Recommended):**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign up and get your API key
   - Replace `your-gemini-api-key` with your actual key
   
   **Perplexity AI:**
   - Visit [Perplexity API](https://www.perplexity.ai/settings/api)
   - Sign up and get your API key
   - Replace `your-perplexity-api-key` with your actual key
   
   **Groq AI:**
   - Visit [console.groq.com](https://console.groq.com)
   - Sign up and get your API key
   - Replace `gsk_your_groq_api_key_here` with your actual key

4. **Configure Gmail:**
   - Enable 2-factor authentication on your Gmail account
   - Generate an app password
   - Replace `your-email@gmail.com` and `your-app-password` with your credentials

### Running the Application

**Development mode (both frontend and backend):**
```bash
npm run dev
```

**Or run separately:**

Backend:
```bash
npm run server
```

Frontend:
```bash
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## How to Use

1. **Enter Recipients**: Add email addresses separated by commas
2. **Write a Prompt**: Describe what kind of email you want to generate
3. **Generate Email**: Click the button to create an AI-generated email
4. **Edit & Review**: Modify the subject and body as needed
5. **Send Email**: Click send to deliver the email to all recipients

## API Endpoints

### Generate Email
```
POST /api/generate-email
Content-Type: application/json

{
  "prompt": "Write a professional follow-up email after a job interview"
}
```

### Send Email
```
POST /api/send-email
Content-Type: application/json

{
  "recipients": ["email1@example.com", "email2@example.com"],
  "subject": "Follow-up Email",
  "body": "Email content here..."
}
```

### Health Check
```
GET /api/health
```

## Project Structure

```
ai-email-sender/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js         # Main application component
│   │   ├── App.css        # Component styles
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Global styles
│   └── package.json
├── server/                 # Node.js backend
│   ├── index.js           # Express server
│   ├── package.json
│   └── env.example        # Environment variables template
├── package.json           # Root package.json
└── README.md
```

## Features in Detail

### AI Email Generation
- Uses Groq's Llama 3.1 8B model for fast, high-quality email generation
- Supports various email types: professional, casual, formal, etc.
- Generates both subject and body content

### Email Sending
- Supports multiple recipients (comma-separated)
- HTML email formatting
- Error handling and success feedback
- Gmail SMTP integration

### User Interface
- Modern, responsive design
- Real-time form validation
- Loading states and animations
- Success/error message display
- Email preview functionality

## Troubleshooting

### Common Issues

1. **Email not sending:**
   - Check your Gmail app password is correct
   - Ensure 2FA is enabled on your Gmail account
   - Verify the email credentials in `.env` file

2. **AI generation failing:**
   - Verify your Groq API key is correct
   - Check your internet connection
   - Ensure the API key has sufficient credits

3. **Server not starting:**
   - Check if port 5000 is available
   - Verify all dependencies are installed
   - Check the `.env` file configuration

### Development Tips

- Use `npm run dev` for concurrent development
- Check the browser console for frontend errors
- Monitor the server console for backend errors
- Use the health check endpoint to verify server status

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Deployment

### Option 1: Vercel (Frontend) + Render (Backend) - Recommended

#### Backend Deployment (Render)
1. Go to [Render.com](https://render.com) and sign up
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `ai-email-sender-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free
5. Add environment variables:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - Add your API keys and email credentials
6. Deploy and copy the URL (e.g., `https://your-app.onrender.com`)

#### Frontend Deployment (Vercel)
1. Go to [Vercel.com](https://vercel.com) and sign up
2. Click "New Project" and import your GitHub repository
3. Configure the project:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Add environment variable:
   - `REACT_APP_API_URL`: Your Render backend URL
5. Deploy

### Option 2: Railway (Full-Stack)
1. Go to [Railway.app](https://railway.app) and sign up
2. Create a new project from GitHub
3. Add environment variables
4. Deploy both frontend and backend

### Option 3: Heroku (Full-Stack)
1. Create a Heroku account
2. Install Heroku CLI
3. Create a new app
4. Add buildpacks for Node.js
5. Configure environment variables
6. Deploy using Git

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues and questions:
- Check the troubleshooting section above
- Review the console logs for error details
- Ensure all environment variables are properly configured 