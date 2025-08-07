// Demo configuration for when no API keys are available
const demoResponses = {
  "follow-up interview": {
    subject: "Follow-up: Thank You for the Interview",
    body: `Dear [Interviewer Name],

Thank you for taking the time to interview me for the [Position] role at [Company Name] yesterday. I appreciated the opportunity to discuss my qualifications and learn more about the position and your organization.

I remain very interested in this opportunity and believe my skills and experience would be a great fit for your team. I am particularly excited about [specific aspect of the role/company that was discussed].

Please don't hesitate to reach out if you need any additional information from me. I look forward to hearing from you regarding the next steps in the hiring process.

Thank you again for your time and consideration.

Best regards,
[Your Name]
[Your Phone Number]
[Your Email]`
  },
  "meeting request": {
    subject: "Meeting Request: [Topic]",
    body: `Dear [Recipient Name],

I hope this email finds you well. I would like to schedule a meeting to discuss [specific topic or purpose].

I believe this would be a valuable opportunity to [explain the benefit or goal of the meeting].

I am available on the following dates and times:
- [Date and time option 1]
- [Date and time option 2]
- [Date and time option 3]

Please let me know which time works best for you, or if you'd prefer a different time slot. I'm happy to accommodate your schedule.

Looking forward to hearing from you.

Best regards,
[Your Name]
[Your Title]
[Your Contact Information]`
  },
  "project update": {
    subject: "Project Update: [Project Name]",
    body: `Dear [Team/Client Name],

I hope this email finds you well. I wanted to provide you with an update on the [Project Name] project.

Current Status:
- [Key milestone or achievement]
- [Progress made since last update]
- [Any challenges or issues encountered]

Next Steps:
- [Upcoming deliverables]
- [Timeline for next phase]
- [Action items or decisions needed]

Please let me know if you have any questions or if there's anything specific you'd like me to address in more detail.

Thank you for your continued support and collaboration.

Best regards,
[Your Name]
[Project Manager/Your Role]`
  },
  "general inquiry": {
    subject: "Inquiry: [Topic]",
    body: `Dear [Recipient Name],

I hope this email finds you well. I am reaching out regarding [specific topic or question].

[Provide context or background information about your inquiry]

I would appreciate any information or guidance you could provide on this matter.

Thank you for your time and consideration. I look forward to hearing from you.

Best regards,
[Your Name]
[Your Organization/Title]
[Your Contact Information]`
  }
};

// Function to generate demo response based on prompt
function generateDemoResponse(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  
  // Find the best matching demo response
  for (const [key, response] of Object.entries(demoResponses)) {
    if (lowerPrompt.includes(key)) {
      return response;
    }
  }
  
  // Default response if no specific match
  return {
    subject: "AI Generated Email",
    body: `Dear [Recipient],

Thank you for your inquiry. This is an AI-generated email based on your prompt: "${prompt}"

Please customize this email with specific details relevant to your situation.

Best regards,
[Your Name]`
  };
}

module.exports = { generateDemoResponse }; 