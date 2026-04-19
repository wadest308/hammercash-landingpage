import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import time

def send_email(sender_email, sender_password, receiver_email, subject, body):
    message = MIMEMultipart()
    message['From'] = f"Wade Lieu <{sender_email}>"
    message['To'] = receiver_email
    message['Subject'] = subject
    message.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, receiver_email, message.as_string())
        server.quit()
        return True
    except Exception as e:
        print(f"Error sending to {receiver_email}: {e}")
        return False

# Templates from index.html
templates = [
    {
        "name": "Template 1 — The Appointment Guarantee",
        "subject": "Wade, quick question about HammerCash",
        "body": "Hi Wade,\n\nI found you on LinkedIn & thought I'd reach out.\n\nI'm the founder of HammerCash, and I built a system for contractors that secures payment BEFORE the job starts — so you never chase a client again.\n\nI helped one roofing company eliminate 3 payment disputes in just 30 days. Based on what I've seen, I think I could do something similar for HammerCash.\n\nWe'd even set up your first job for free so you can see how it works.\n\nCould I show you over a 10-min call this week?\n\n—\nWade Lieu\nFounder, HAMMERCASH\n403-402-8896\nwade.lieu17@gmail.com\nCalgary, AB"
    },
    {
        "name": "Template 2 — The Niche Contractor Approach",
        "subject": "Wade, quick question",
        "body": "Hi Wade,\n\nI know this is a long shot, but I work specifically with contractors and trades businesses across Canada. Basically, I built HammerCash — a payment protection system that secures funds upfront before the job starts, then releases them in milestones as work gets done.\n\nI run HammerCash and have personally helped a number of contractors eliminate payment disputes and late invoices entirely.\n\nFully aware we haven't talked prior to this and you'll probably think this is cold outreach. To be frank, HammerCash was one of the first businesses I found when looking into Calgary contractors, and I think you'd be a great fit.\n\nAlso, in my experience, getting protected on your next job is super easy to set up — and I could walk you through it totally upfront at no cost.\n\nWould this make sense for you? If so — do you want me to just send an example contract setup, or would you rather get on a quick call?\n\n—\nWade Lieu\nFounder, HAMMERCASH\n403-402-8896\nwade.lieu17@gmail.com\nCalgary, AB"
    },
    {
        "name": "Template 3 — The Low-Risk Demo Offer",
        "subject": "Wade, quick question",
        "body": "Hi Wade,\n\nAm new to reaching out like this, so please bear with me. But I put something together that works really well for contractors.\n\nTo make a long story short — it's a payment protection system that secures your money BEFORE the job starts and releases it in milestones. Costs literally nothing unless you actually get paid.\n\nI ran into this problem myself when I was doing contract work in Vancouver — clients were slow to pay, and one bad job wiped out a month of profit. So I built HammerCash to solve it.\n\nI know this is completely out of left field, but I'm fairly confident we could protect HammerCash on your very next job.\n\nJust wanted to see if there was interest — you were one of the first contractors I found when looking into Calgary.\n\nWould this be of any value? Wouldn't cost you anything upfront. I'd even set it up for your first job for free so you can see how it works.\n\n—\nWade Lieu\nFounder, HAMMERCASH\n403-402-8896\nwade.lieu17@gmail.com\nCalgary, AB\nhammercash.com"
    }
]

if __name__ == "__main__":
    SENDER = "wadelieu17@gmail.com"
    PASSWORD = "chmw aaac xlpd zvpo"
    RECEIVER = "wadelieu@gmail.com"
    
    print(f"🚀 Starting test run: Sending 3 templates from {SENDER} to {RECEIVER}...")
    
    for i, t in enumerate(templates):
        print(f"Sending Email {i+1}: {t['name']}...")
        success = send_email(SENDER, PASSWORD, RECEIVER, t['subject'], t['body'])
        if success:
            print(f"✅ Success!")
        else:
            print(f"❌ Failed.")
        
        if i < len(templates) - 1:
            print("Waiting 2 seconds to avoid rate limit...")
            time.sleep(2)
    
    print("\n✨ Test run complete!")
