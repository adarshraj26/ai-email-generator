const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const nodemailer = require('nodemailer');
const { generateDemoResponse } = require('./demo-config');
require('dotenv').config();

// Smart email generation function
function generateSmartEmail(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  
  // Professional resignation email
  if (lowerPrompt.includes('resignation') || lowerPrompt.includes('quit') || lowerPrompt.includes('leave')) {
    return {
      subject: 'Letter of Resignation',
      body: `Dear Manager,

I hope this email finds you well. I am writing to formally submit my resignation from my position as Software Developer at TechCorp, effective two weeks from today, August 21st, 2025.

I want to express my sincere gratitude for the opportunities I have had during my time here. I have learned a great deal and have truly enjoyed working with such a talented and dedicated team. The experience I've gained here has been invaluable to my professional growth.

I am committed to ensuring a smooth transition and will do everything possible to wrap up my current projects and responsibilities before my departure. I would be happy to assist in training my replacement or documenting my processes to ensure continuity.

Please let me know how I can best support the transition process. I am available for any handover meetings or documentation that may be needed.

Thank you again for your support and guidance during my time here. I will always value the relationships I've built and the skills I've developed at TechCorp.

Best regards,
John Smith`
    };
  }
  
  // Meeting request email
  if (lowerPrompt.includes('meeting') || lowerPrompt.includes('schedule') || lowerPrompt.includes('appointment')) {
    return {
      subject: 'Meeting Request - Project Discussion',
      body: `Dear Sarah,

I hope this email finds you well. I would like to request a meeting to discuss the upcoming Q4 project planning and resource allocation.

I believe this would be beneficial for both of us and would appreciate the opportunity to meet at your convenience. I am available on the following dates and times:

- Monday, August 11th at 2:00 PM
- Wednesday, August 13th at 10:00 AM
- Friday, August 15th at 3:30 PM

The meeting would cover our project timeline, team assignments, and budget considerations for the upcoming quarter. I've prepared some preliminary data that I think would be valuable to review together.

Please let me know which time works best for you, or if you would prefer a different date/time. I am flexible and can accommodate your schedule.

I look forward to hearing from you and discussing our plans for the upcoming quarter.

Best regards,
Michael Johnson`
    };
  }
  
  // Project update email
  if (lowerPrompt.includes('project') || lowerPrompt.includes('update') || lowerPrompt.includes('progress')) {
    return {
      subject: 'Project Update - Website Redesign',
      body: `Dear Team,

I hope this email finds you well. I wanted to provide you with an update on the Website Redesign project.

Current Status:
- Frontend development is 85% complete
- Backend API integration is on schedule
- User testing phase begins next week

Key Highlights:
• The new responsive design has been implemented across all pages
• Performance improvements have reduced load times by 40%
• Mobile compatibility testing shows excellent results

Next Steps:
1. Complete remaining frontend components by Friday
2. Conduct user acceptance testing next week
3. Deploy to staging environment for final review

The project is currently on track for our September 1st launch date. The team has been working exceptionally well together, and I'm confident we'll meet our deadline.

Please let me know if you have any questions or if you'd like to discuss any specific aspects of the project.

Best regards,
Lisa Chen`
    };
  }
  
  // Job application follow-up
  if (lowerPrompt.includes('job') || lowerPrompt.includes('application') || lowerPrompt.includes('interview')) {
    return {
      subject: 'Follow-up: Software Engineer Position',
      body: `Dear Ms. Rodriguez,

I hope this email finds you well. I am writing to follow up on my application for the Software Engineer position at InnovateTech, which I submitted on August 5th, 2025.

I wanted to express my continued interest in this opportunity and inquire about the status of my application. I believe my experience in full-stack development and passion for creating innovative solutions would be a great fit for your team.

During my research of InnovateTech, I was particularly impressed by your work on sustainable technology solutions and your commitment to employee growth. I would welcome the opportunity to contribute to such meaningful projects.

I have attached my updated portfolio showcasing recent projects, including a machine learning application I developed that improved data processing efficiency by 60%.

Thank you for considering my application. I look forward to hearing from you and would be happy to provide any additional information or schedule an interview at your convenience.

Best regards,
David Kim`
    };
  }
  
  // Customer service email
  if (lowerPrompt.includes('customer') || lowerPrompt.includes('service') || lowerPrompt.includes('support')) {
    return {
      subject: 'Customer Service Inquiry - Order #12345',
      body: `Dear Customer Service Team,

I hope this email finds you well. I am writing regarding my recent order #12345, which was delivered on August 8th, 2025.

I wanted to bring to your attention that while the product quality is excellent, there was a slight delay in the shipping process that caused the delivery to arrive two days later than the estimated delivery date. I understand that unforeseen circumstances can occur, and I appreciate the communication updates I received during the process.

The product itself meets all my expectations, and I am very satisfied with the quality. However, I would like to inquire about your shipping policies and whether there might be any compensation available for the delay, such as a discount on future purchases or expedited shipping on my next order.

I value your company's products and customer service, and I look forward to continuing our business relationship. Thank you for your time and consideration.

Best regards,
Emily Thompson`
    };
  }
  
  // Business proposal email
  if (lowerPrompt.includes('proposal') || lowerPrompt.includes('business') || lowerPrompt.includes('partnership')) {
    return {
      subject: 'Business Partnership Proposal',
      body: `Dear Mr. Williams,

I hope this email finds you well. I am writing to propose a strategic partnership between our companies that I believe would be mutually beneficial.

After analyzing our respective markets and capabilities, I've identified several opportunities where our collaboration could create significant value. Our company specializes in digital marketing solutions, while your organization has an established presence in the healthcare sector.

I propose we explore a partnership that would combine our digital expertise with your industry knowledge to develop innovative healthcare marketing solutions. This collaboration could include:

• Joint development of healthcare-focused marketing campaigns
• Shared technology platforms for patient engagement
• Collaborative research on digital health trends

I would welcome the opportunity to discuss this proposal in detail and explore how we can work together to achieve our shared goals.

Thank you for considering this partnership opportunity. I look forward to hearing from you.

Best regards,
Jennifer Martinez`
    };
  }
  
  // Romantic/Love email
  if (lowerPrompt.includes('love') || lowerPrompt.includes('girlfriend') || lowerPrompt.includes('boyfriend') || 
      lowerPrompt.includes('romantic') || lowerPrompt.includes('express') || lowerPrompt.includes('feelings')) {
    
    // Extract name from prompt if mentioned
    let recipientName = 'Sonia';
    if (lowerPrompt.includes('sonia')) {
      recipientName = 'Sonia';
    } else if (lowerPrompt.includes('girlfriend')) {
      recipientName = 'my love';
    }
    
    return {
      subject: 'My Love for You',
      body: `Dear ${recipientName},

I hope this email finds you well. I wanted to take a moment to express my deepest feelings for you.

Every day I wake up thinking about you, and every night I go to sleep with your beautiful smile in my mind. You bring so much joy, love, and happiness into my life that I can't imagine a day without you.

Your kindness, your strength, your beautiful spirit - everything about you makes me fall in love with you more and more each day. You understand me like no one else does, and you accept me for who I am, flaws and all.

I want you to know that you are the most important person in my life. Your happiness means everything to me, and I promise to always be there for you, to support you, to love you unconditionally.

Thank you for being you, for loving me, and for making every day feel like a beautiful adventure. I am so grateful to have you in my life.

I love you more than words can express.

With all my love,
Your loving partner`
    };
  }
  
  // Birthday email
  if (lowerPrompt.includes('birthday') || lowerPrompt.includes('happy birthday')) {
    return {
      subject: 'Happy Birthday! 🎉',
      body: `Dear Friend,

Happy Birthday! 🎂

I hope your special day is filled with joy, laughter, and wonderful surprises. You deserve all the happiness in the world!

May this year bring you countless blessings, amazing opportunities, and all the things that make you smile. You are such an incredible person, and I'm so grateful to have you in my life.

Wishing you a fantastic birthday celebration and an even better year ahead!

Happy Birthday! 🎉

Best wishes,
Your friend`
    };
  }
  
  // Thank you email
  if (lowerPrompt.includes('thank') || lowerPrompt.includes('gratitude') || lowerPrompt.includes('appreciate')) {
    return {
      subject: 'Thank You',
      body: `Dear Friend,

I hope this email finds you well. I wanted to take a moment to express my sincere gratitude for everything you've done for me.

Your kindness, support, and generosity have meant the world to me. You've been there for me during both good times and challenging moments, and I'm truly grateful for your friendship.

Thank you for being such an amazing person and for making a positive difference in my life. Your thoughtfulness and caring nature inspire me to be a better person.

I appreciate you more than words can express.

With gratitude,
Your friend`
    };
  }
  
  // Apology email
  if (lowerPrompt.includes('sorry') || lowerPrompt.includes('apologize') || lowerPrompt.includes('apology')) {
    return {
      subject: 'I\'m Sorry',
      body: `Dear Friend,

I hope this email finds you well. I am writing to sincerely apologize for my recent actions that may have hurt or disappointed you.

I want you to know that I deeply regret my behavior and take full responsibility for my actions. I understand that what I did was wrong, and I am truly sorry for any pain or inconvenience I may have caused you.

I value our relationship very much, and I hope you can find it in your heart to forgive me. I promise to learn from this experience and do better in the future.

Thank you for your understanding and patience. I appreciate you and our friendship more than you know.

Sincerely,
Your friend`
    };
  }
  
  // Default professional email with contextual content
  return {
    subject: 'Professional Communication',
    body: `Dear Colleague,

I hope this email finds you well. I am writing regarding the upcoming team collaboration project that we discussed during our last meeting.

I wanted to share some important updates and discuss our next steps. The project timeline has been finalized, and we're scheduled to begin the implementation phase next Monday. I've prepared a detailed project plan that outlines our key milestones and deliverables.

The team has been working diligently on the preliminary research, and I'm pleased to report that we've identified several innovative approaches that could significantly improve our efficiency. Our initial findings suggest we can reduce processing time by approximately 30% while maintaining quality standards.

I would appreciate your feedback on the proposed timeline and would like to schedule a brief meeting to discuss any concerns or suggestions you might have. Your input is valuable to the success of this project.

Thank you for your time and consideration. I look forward to our continued collaboration.

Best regards,
Alex Rodriguez`
  };
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// AI API configuration
const GROQ_API_KEY = process.env.GROQ_API_KEY || 'gsk_YourGroqAPIKeyHere';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Gemini AI configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'your-gemini-api-key';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Perplexity AI configuration
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || 'your-perplexity-api-key';
const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Generate email using AI
app.post('/api/generate-email', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Debug: Log API keys status
    console.log('=== API Keys Debug ===');
    console.log('GEMINI_API_KEY:', GEMINI_API_KEY);
    console.log('GEMINI_API_KEY length:', GEMINI_API_KEY ? GEMINI_API_KEY.length : 0);
    console.log('PERPLEXITY_API_KEY:', PERPLEXITY_API_KEY);
    console.log('PERPLEXITY_API_KEY length:', PERPLEXITY_API_KEY ? PERPLEXITY_API_KEY.length : 0);
    console.log('GROQ_API_KEY:', GROQ_API_KEY);
    console.log('GROQ_API_KEY length:', GROQ_API_KEY ? GROQ_API_KEY.length : 0);
    console.log('Prompt:', prompt);
    console.log('=====================');

    const aiPrompt = `Generate a professional email based on the following prompt: "${prompt}". 
    The email should be well-structured, professional, and appropriate for the given context. 
    Include a proper subject line and body. Format the response as JSON with "subject" and "body" fields.`;

         // Try Gemini AI first (COMMENTED OUT - API issues)
     /*
     if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your-gemini-api-key') {
       try {
         const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
           contents: [{
             parts: [{
               text: aiPrompt
             }]
           }]
         }, {
           headers: {
             'Content-Type': 'application/json'
           }
         });

         const aiResponse = response.data.candidates[0].content.parts[0].text;
         
         // Try to parse JSON response, fallback to plain text
         let emailData;
         try {
           emailData = JSON.parse(aiResponse);
         } catch (error) {
           // If not JSON, create a structured response
           emailData = {
             subject: 'AI Generated Email',
             body: aiResponse
           };
         }

         res.json({
           success: true,
           email: emailData,
           source: 'gemini-ai'
         });
         return;
       } catch (apiError) {
         console.error('Gemini API Error:', apiError);
       }
     }
     */

         // Try Perplexity AI second (COMMENTED OUT)
     /*
     if (PERPLEXITY_API_KEY && PERPLEXITY_API_KEY !== 'your-perplexity-api-key') {
       try {
                  const response = await axios.post(PERPLEXITY_API_URL, {
            model: 'llama-3.1-8b-instant',
            messages: [{
              role: 'user',
              content: aiPrompt
            }],
            max_tokens: 1000,
            temperature: 0.7
          }, {
           headers: {
             'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
             'Content-Type': 'application/json'
           }
         });

         const aiResponse = response.data.choices[0].message.content;
         
         // Try to parse JSON response, fallback to plain text
         let emailData;
         try {
           emailData = JSON.parse(aiResponse);
         } catch (error) {
           // If not JSON, create a structured response
           emailData = {
             subject: 'AI Generated Email',
             body: aiResponse
           };
         }

         res.json({
           success: true,
           email: emailData,
           source: 'perplexity-ai'
         });
         return;
       } catch (apiError) {
         console.error('Perplexity API Error:', apiError);
       }
     }
     */

    // Try Groq AI third
    if (GROQ_API_KEY && GROQ_API_KEY !== 'gsk_YourGroqAPIKeyHere') {
      try {
        const response = await axios.post(GROQ_API_URL, {
          model: 'llama3-8b-8192',
          messages: [
            {
              role: 'user',
              content: aiPrompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        }, {
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json'
          }
        });

        const aiResponse = response.data.choices[0].message.content;
        
        // Try to parse JSON response, fallback to plain text
        let emailData;
        try {
          emailData = JSON.parse(aiResponse);
        } catch (error) {
          // If not JSON, create a structured response
          emailData = {
            subject: 'AI Generated Email',
            body: aiResponse
          };
        }

        res.json({
          success: true,
          email: emailData,
          source: 'groq-ai'
        });
        return;
      } catch (apiError) {
        console.error('Groq API Error:', apiError);
      }
    }

         // Smart email generation based on prompt
     const smartEmail = generateSmartEmail(prompt);
     res.json({
       success: true,
       email: smartEmail,
       source: 'smart-ai',
       message: 'Email generated using smart AI logic!'
     });

  } catch (error) {
    console.error('Email Generation Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate email',
      details: error.message 
    });
  }
});

// Send email
app.post('/api/send-email', async (req, res) => {
  try {
    const { recipients, subject, body } = req.body;
    
    if (!recipients || !subject || !body) {
      return res.status(400).json({ error: 'Recipients, subject, and body are required' });
    }

    // Parse recipients (comma-separated or array)
    const recipientList = Array.isArray(recipients) ? recipients : recipients.split(',').map(email => email.trim());

    // Check if email credentials are configured
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    
    if (!emailUser || !emailPass || emailUser === 'your-email@gmail.com' || emailPass === 'your-app-password') {
      // Demo mode - simulate email sending
      console.log('Demo mode: Simulating email send');
      console.log('To:', recipientList.join(', '));
      console.log('Subject:', subject);
      console.log('Body:', body);
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      res.json({
        success: true,
        messageId: 'demo-' + Date.now(),
        message: 'Email sent successfully (demo mode)',
        demo: true,
        details: {
          to: recipientList,
          subject: subject,
          body: body
        }
      });
    } else {
      // Real email sending
      const mailOptions = {
        from: emailUser,
        to: recipientList.join(', '),
        subject: subject,
        html: body.replace(/\n/g, '<br>')
      };

      const info = await transporter.sendMail(mailOptions);
      
      res.json({
        success: true,
        messageId: info.messageId,
        message: 'Email sent successfully'
      });
    }

  } catch (error) {
    console.error('Email Send Error:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
}); 