import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';

emailjs.init(EMAILJS_CONFIG.publicKey);

export const sendMilestoneApprovalRequest = async ({
  toEmail,
  toName,
  projectName,
  milestoneTitle,
  milestoneAmount,
  dueDate,
}) => {
  try {
    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.milestoneApprovalTemplateId,
      {
        to_email: toEmail,
        to_name: toName,
        project_name: projectName,
        milestone_title: milestoneTitle,
        milestone_amount: `$${parseFloat(milestoneAmount).toFixed(2)}`,
        due_date: dueDate || 'Not set',
        message: 'Please log in to your HammerCash dashboard to review and approve this milestone.',
      }
    );
    console.log('Approval request email sent to', toEmail);
  } catch (error) {
    console.error('Failed to send approval email:', error);
  }
};

export const sendMilestoneReleasedNotification = async ({
  toEmail,
  toName,
  projectName,
  milestoneTitle,
  milestoneAmount,
}) => {
  try {
    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.milestoneReleasedTemplateId,
      {
        to_email: toEmail,
        to_name: toName,
        project_name: projectName,
        milestone_title: milestoneTitle,
        milestone_amount: `$${parseFloat(milestoneAmount).toFixed(2)}`,
        released_at: new Date().toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric'
        }),
        message: 'Both parties have approved this milestone. Payment has been queued for release.',
      }
    );
    console.log('Released notification sent to', toEmail);
  } catch (error) {
    console.error('Failed to send released email:', error);
  }
};