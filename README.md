# 🎂 Birthday Hub

Automated birthday email system for HR managers — beautiful AI-generated emails, delivered to your team every morning at 8 AM.

## Features

- **Auto-send** birthday emails every morning via Vercel Cron (8 AM UTC)
- **AI-generated messages** — Claude writes warm, personalized messages for each employee
- **Gorgeous email template** — colorful balloon design, far better than boring plain-text emails
- **Team management** — add, edit, delete employees with birthday dates
- **CSV import** — bulk import from a spreadsheet in seconds
- **Send history** — track every email sent or failed
- **Manual compose** — write & send individual emails at any time

---

## Quick Deploy to Vercel

### 1. Clone and push to GitHub

```bash
git clone <this-repo>
cd birthday-hub
git push
```

### 2. Create a Vercel project

1. Go to [vercel.com](https://vercel.com) → New Project → import your repo
2. Deploy once (it will fail — that's OK, we need to add env vars and storage)

### 3. Add Vercel KV Storage

1. In your Vercel project dashboard → **Storage** tab → **Create Database** → choose **KV**
2. Name it `birthday-hub-kv` → Create
3. Click **Connect to Project** — this auto-adds the `KV_*` env vars

### 4. Set Environment Variables

In Vercel → Settings → Environment Variables, add:

| Variable | Value |
|---|---|
| `ANTHROPIC_API_KEY` | Your key from [console.anthropic.com](https://console.anthropic.com) |
| `GMAIL_USER` | HR manager's Gmail address |
| `GMAIL_APP_PASSWORD` | Gmail App Password (see below) |
| `GMAIL_FROM_NAME` | Display name, e.g. `The HR Team` |
| `CRON_SECRET` | A random string — copy and save it |

### 5. Gmail App Password Setup

> Gmail App Passwords let apps send email on your behalf without your main password.

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. **Security** → **2-Step Verification** (must be enabled)
3. Search for **App passwords** at the bottom
4. Create one: App = "Mail", Device = "Other" → type `Birthday Hub`
5. Copy the 16-character password (no spaces) → paste as `GMAIL_APP_PASSWORD`

### 6. Redeploy

```bash
# Or just click "Redeploy" in Vercel dashboard
vercel --prod
```

---

## Local Development

```bash
cp .env.example .env.local
# Fill in your values

npm install
npm run dev
```

For local KV, run `vercel env pull .env.local` after linking the project with `vercel link`.  
Without KV env vars, the app uses in-memory storage (resets on restart — fine for dev).

---

## Cron Schedule

`vercel.json` configures the cron to run at **8:00 AM UTC** daily:

```json
{ "crons": [{ "path": "/api/cron", "schedule": "0 8 * * *" }] }
```

**Adjust for your timezone:**
- 8 AM Eastern (UTC-5): `"0 13 * * *"`
- 8 AM Central European (UTC+1): `"0 7 * * *"`
- 8 AM India (UTC+5:30): `"30 2 * * *"`

The cron job:
1. Finds all employees whose birthday is today
2. Checks they haven't received an email this year
3. Generates a personalized message with Claude
4. Sends the beautiful HTML email via Gmail
5. Logs the result

---

## CSV Import Format

Headers (case-insensitive): `name`, `email`, `department`, `birthday`, `notes`

```csv
name,email,department,birthday,notes
Sarah Chen,sarah.chen@company.com,Engineering,05-19,Team lead
Marcus Williams,marcus@company.com,Marketing,August 14,Loves coffee
Priya Patel,priya@company.com,Design,2000-03-25,
```

**Accepted birthday formats:** `MM-DD`, `YYYY-MM-DD`, `MM/DD`, `March 25`, `25 March`

Duplicate emails are automatically skipped on re-import.

---

## API Reference

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/employees` | List all employees |
| `POST` | `/api/employees` | Add an employee |
| `PUT` | `/api/employees/:id` | Update an employee |
| `DELETE` | `/api/employees/:id` | Delete an employee |
| `POST` | `/api/import` | Bulk import employees |
| `POST` | `/api/generate` | Generate AI birthday message |
| `POST` | `/api/send` | Send a birthday email |
| `GET` | `/api/logs` | Get send history |
| `GET` | `/api/cron` | Trigger the daily job (protected) |
