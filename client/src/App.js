import React, { useState } from 'react';
import axios from 'axios';
import { Send, Sparkles, Edit3, Copy } from 'lucide-react';
import { API_BASE_URL } from './config';
import './App.css';

function App() {
  const [recipients, setRecipients] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState(null);
  const [editedSubject, setEditedSubject] = useState('');
  const [editedBody, setEditedBody] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const generateEmail = async () => {
    if (!prompt.trim()) {
      setMessage('Please enter a prompt for email generation');
      setMessageType('error');
      return;
    }

    setIsGenerating(true);
    setMessage('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/generate-email`, { prompt });
      
      if (response.data.success) {
        const email = response.data.email;
        setGeneratedEmail(email);
        setEditedSubject(email.subject || '');
        setEditedBody(email.body || '');
        
        // Show appropriate message based on source
        if (response.data.source === 'demo') {
          setMessage('Demo email generated! Configure GEMINI_API_KEY, PERPLEXITY_API_KEY, or GROQ_API_KEY for real AI generation.');
          setMessageType('success');
        } else if (response.data.source === 'demo-fallback') {
          setMessage('Email generated using demo response due to API error. Configure AI API keys for real AI.');
          setMessageType('success');
        } else if (response.data.source === 'gemini-ai') {
          setMessage('Email generated successfully using Gemini AI! You can now edit and send it.');
          setMessageType('success');
        } else if (response.data.source === 'perplexity-ai') {
          setMessage('Email generated successfully using Perplexity AI! You can now edit and send it.');
          setMessageType('success');
        } else if (response.data.source === 'groq-ai') {
          setMessage('Email generated successfully using Groq AI! You can now edit and send it.');
          setMessageType('success');
        } else {
          setMessage('Email generated successfully using AI! You can now edit and send it.');
          setMessageType('success');
        }
      }
    } catch (error) {
      console.error('Error generating email:', error);
      setMessage(error.response?.data?.error || 'Failed to generate email. Please try again.');
      setMessageType('error');
    } finally {
      setIsGenerating(false);
    }
  };

  const sendEmail = async () => {
    if (!recipients.trim() || !editedSubject.trim() || !editedBody.trim()) {
      setMessage('Please fill in all fields: recipients, subject, and body');
      setMessageType('error');
      return;
    }

    setIsSending(true);
    setMessage('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/send-email`, {
        recipients: recipients.split(',').map(email => email.trim()),
        subject: editedSubject,
        body: editedBody
      });

             if (response.data.success) {
         setMessage('Email sent successfully!');
         setMessageType('success');
         if (response.data.demo) {
           console.log('Demo email details:', response.data.details);
         }
        // Reset form
        setRecipients('');
        setPrompt('');
        setGeneratedEmail(null);
        setEditedSubject('');
        setEditedBody('');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setMessage(error.response?.data?.error || 'Failed to send email. Please check your email configuration.');
      setMessageType('error');
    } finally {
      setIsSending(false);
    }
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    // Clear message when user starts typing
    if (message) {
      setMessage('');
      setMessageType('');
    }
  };

  const handleRecipientsChange = (e) => {
    setRecipients(e.target.value);
    // Clear message when user starts typing
    if (message) {
      setMessage('');
      setMessageType('');
    }
  };

  const copyEmailToClipboard = async () => {
    const emailContent = `Subject: ${editedSubject}\n\n${editedBody}`;
    
    try {
      await navigator.clipboard.writeText(emailContent);
      setCopySuccess(true);
      setMessage('Email copied to clipboard!');
      setMessageType('success');
      
      // Reset copy success after 2 seconds
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      setMessage('Failed to copy email to clipboard');
      setMessageType('error');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>AI Email Sender</h1>
          <p>Generate professional emails with AI and send them to multiple recipients</p>
        </div>

        {message && (
          <div className={`${messageType}-message`}>
            {message}
          </div>
        )}

        <div className="card">
          <h2>Email Configuration</h2>
          
          <div className="form-group">
            <label htmlFor="recipients">Recipients (comma-separated emails)</label>
            <input
              type="text"
              id="recipients"
              value={recipients}
              onChange={handleRecipientsChange}
              placeholder="example@email.com, another@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="prompt">Email Prompt</label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={handlePromptChange}
              placeholder="Describe what kind of email you want to generate. For example: 'Write a professional follow-up email after a job interview'"
              rows="4"
            />
          </div>

          <button
            className="btn"
            onClick={generateEmail}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <div className="loading"></div>
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate Email
              </>
            )}
          </button>
        </div>

        {generatedEmail && (
          <div className="card">
            <h2>Generated Email</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              Review and edit the generated email before sending
            </p>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                value={editedSubject}
                onChange={(e) => setEditedSubject(e.target.value)}
                placeholder="Email subject"
              />
            </div>

            <div className="form-group">
              <label htmlFor="body">Email Body</label>
              <textarea
                id="body"
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
                placeholder="Email body content"
                rows="8"
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                className="btn"
                onClick={sendEmail}
                disabled={isSending}
              >
                {isSending ? (
                  <>
                    <div className="loading"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Email
                  </>
                )}
              </button>

              <button
                className={`btn ${copySuccess ? 'btn-success' : 'btn-secondary'}`}
                onClick={copyEmailToClipboard}
                disabled={!editedSubject && !editedBody}
              >
                <Copy size={18} />
                {copySuccess ? 'Copied!' : 'Copy Email'}
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => {
                  setGeneratedEmail(null);
                  setEditedSubject('');
                  setEditedBody('');
                  setMessage('');
                }}
              >
                <Edit3 size={18} />
                Generate New Email
              </button>
            </div>

            <div className="email-preview">
              <h3>Email Preview</h3>
              <div className="subject">
                <strong>Subject:</strong> {editedSubject || 'No subject'}
              </div>
              <div className="body">
                {editedBody || 'No content'}
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <h2>How to Use</h2>
          <ol style={{ lineHeight: '1.8', color: '#555' }}>
            <li><strong>Enter Recipients:</strong> Add email addresses separated by commas</li>
            <li><strong>Write a Prompt:</strong> Describe what kind of email you want to generate</li>
            <li><strong>Generate Email:</strong> Click the button to create an AI-generated email</li>
            <li><strong>Edit & Review:</strong> Modify the subject and body as needed</li>
            <li><strong>Send Email:</strong> Click send to deliver the email to all recipients</li>
          </ol>
          
          <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef' }}>
            <h4 style={{ marginBottom: '10px', color: '#495057' }}>Setup Required:</h4>
            <p style={{ fontSize: '14px', color: '#6c757d', lineHeight: '1.6' }}>
              To send emails, you need to configure your email settings in the server's <code>.env</code> file:
              <br />
              • Add your Gmail address and app password
              <br />
              • Add your Groq API key for AI generation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 