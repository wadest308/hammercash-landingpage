import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formatdate, make_msgid
import os
import random
import time

app = FastAPI()

# Allow CORS so the dashboard on :8080 can call this API on :8001
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data model for sending an email
class EmailRequest(BaseModel):
    sender_email: str
    sender_password: str
    receiver_email: str
    subject: str
    body: str
    sender_name: str = "Wade Lieu"

@app.get("/")
async def read_index():
    return FileResponse('index.html')

@app.post("/api/send-email")
async def send_email(request: EmailRequest):
    """
    Sends a single email with deliverability best-practices baked in:
    - Plain text only (no HTML tracking pixels)
    - Proper Reply-To header
    - List-Unsubscribe header (required by Gmail since Feb 2024)
    - Message-ID and Date headers to look legitimate
    - Random micro-delay to mimic human sending
    """
    # --- Build the message ---
    message = MIMEMultipart()

    # Sender display name (e.g., "Wade <wadelieu17@gmail.com>")
    from_display = f"{request.sender_name} <{request.sender_email}>"
    message['From'] = from_display
    message['To'] = request.receiver_email
    message['Subject'] = request.subject

    # Deliverability headers
    message['Reply-To'] = request.sender_email
    message['Date'] = formatdate(localtime=True)
    message['Message-ID'] = make_msgid(domain=request.sender_email.split('@')[1])

    # List-Unsubscribe header — REQUIRED by Gmail for bulk senders since Feb 2024
    message['List-Unsubscribe'] = f"<mailto:{request.sender_email}?subject=unsubscribe>"

    # Plain text body only — NO HTML, NO tracking pixels
    message.attach(MIMEText(request.body, 'plain'))

    try:
        # Random micro-delay (1-3 seconds) to mimic human pacing
        delay = random.uniform(1.0, 3.0)
        time.sleep(delay)

        # Connect to Gmail SMTP
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(request.sender_email, request.sender_password)
        server.sendmail(request.sender_email, request.receiver_email, message.as_string())
        server.quit()

        return {
            "status": "success",
            "message": f"Email sent to {request.receiver_email}",
            "delay_seconds": round(delay, 1)
        }
    except smtplib.SMTPAuthenticationError:
        raise HTTPException(
            status_code=401,
            detail="Authentication failed. Check your email/app-password."
        )
    except smtplib.SMTPRecipientsRefused:
        raise HTTPException(
            status_code=400,
            detail=f"Recipient {request.receiver_email} was refused. Email may be invalid."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    print("🔨 HammerCash Outreach Engine starting on http://localhost:8001")
    print("   Dashboard: http://localhost:8080/index.html")
    print("   API Docs:  http://localhost:8001/docs")
    uvicorn.run(app, host="0.0.0.0", port=8001)
