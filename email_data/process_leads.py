import csv
import glob
import os

google_places_pattern = "dataset_crawler-google-places_*.csv"
apollo_pattern = "dataset_lead-scraper-apollo-zoominfo-lusha_*.csv"
master_file = "Cleaned_Leads_Master.csv"

all_leads = []
seen_emails = set()
initial_rows = 0
email_missing_rows = 0
duplicates_removed = 0

def add_lead(lead):
    global initial_rows, email_missing_rows, duplicates_removed
    initial_rows += 1
    
    email = lead.get('Email') or ''
    email = email.lower().strip()
    
    if not email:
        email_missing_rows += 1
        return
        
    if email in seen_emails:
        duplicates_removed += 1
        return
        
    seen_emails.add(email)
    
    # Proper Case and defaults
    for col in ['Company', 'First Name', 'Last Name', 'City']:
        val = str(lead.get(col) or 'N/A').strip()
        if val.lower() == 'nan':
            val = 'N/A'
        elif val != 'N/A':
            val = val.title()
        lead[col] = val
        
    for k in lead:
        if not lead[k]:
            lead[k] = 'N/A'
            
    lead['Email'] = email
    all_leads.append(lead)

# 1. Process Google Places CSVs
for f in glob.glob(google_places_pattern):
    try:
        with open(f, 'r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                if 'emails/0' in row:
                    lead = {
                        'Email': row.get('emails/0', ''),
                        'Company': row.get('title', ''),
                        'Phone': row.get('phone', ''),
                        'City': row.get('city', ''),
                        'State': row.get('state', ''),
                        'Website': row.get('website', '')
                    }
                    add_lead(lead)
    except Exception as e:
        pass

# 2. Process Apollo/Zoominfo CSVs
for f in glob.glob(apollo_pattern):
    try:
        with open(f, 'r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                if 'email' in row:
                    lead = {
                        'Email': row.get('email', ''),
                        'Company': row.get('companyName', ''),
                        'First Name': row.get('firstName', ''),
                        'Last Name': row.get('lastName', ''),
                        'Phone': row.get('phone', ''),
                        'City': row.get('companyCity', ''),
                        'State': row.get('companyState', ''),
                        'Website': row.get('companyDomain', '')
                    }
                    add_lead(lead)
    except Exception as e:
        pass

# 3. Process Master CSV
if os.path.exists(master_file):
    try:
        with open(master_file, 'r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                if 'Email Address' in row:
                    lead = {
                        'Email': row.get('Email Address', ''),
                        'Company': row.get('Company Name', ''),
                        'First Name': row.get('firstName', ''),
                        'Last Name': row.get('lastName', ''),
                        'Phone': row.get('Phone Number', ''),
                        'City': row.get('companyCity', ''),
                        'State': row.get('companyState', ''),
                        'Website': row.get('Website', '')
                    }
                    add_lead(lead)
    except Exception as e:
        pass

if not all_leads:
    print("No valid CSV data found.")
    exit()

# Sort by Company ascending
all_leads.sort(key=lambda x: x.get('Company', ''))

output_fields = ['Email', 'Company', 'First Name', 'Last Name', 'Phone', 'City', 'State', 'Website']

with open('HammerCash_Leads.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=output_fields)
    writer.writeheader()
    for lead in all_leads:
        writer.writerow({k: lead.get(k, 'N/A') for k in output_fields})

print(f"Initial rows combined: {initial_rows}")
print(f"Rows removed due to missing email: {email_missing_rows}")
print(f"Duplicates removed: {duplicates_removed}")
print(f"Final valid leads: {len(all_leads)}")
