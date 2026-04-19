import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import sys

def send_test_email(sender_email, sender_password, receiver_email):
    # Setup the MIME
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = receiver_email
    message['Subject'] = "HammerCash Test Outreach"

    body = """Hi Wade,

This is a test email from your HammerCash Cold Outreach tool. 

If you are reading this, the SMTP connection is working correctly.

Best,
Wade
Founder, HammerCash"""

    message.attach(MIMEText(body, 'plain'))

    try:
        # Create server object with SSL option
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls() # Secure the connection
        server.login(sender_email, sender_password)
        text = message.as_string()
        server.sendmail(sender_email, receiver_email, text)
        server.quit()
        print("Success: Email sent!")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    # You will need to provide an App Password if you have 2FA enabled on Gmail
    # Go to Google Account Settings -> Security -> App Passwords to generate one.
    SENDER_EMAIL = "wadelieu17@gmail.com"
    SENDER_PASSWORD = "chmw aaac xlpd zvpo"
    RECEIVER_EMAIL = "wade.lieu@gmail.com"
    
    print(f"Attempting to send test email from {SENDER_EMAIL} to {RECEIVER_EMAIL}...")
    send_test_email(SENDER_EMAIL, SENDER_PASSWORD, RECEIVER_EMAIL)
