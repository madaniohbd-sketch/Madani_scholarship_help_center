# মাদানি স্কলারশিপ হেল্প সেন্টার — Telegram Website

এই ভার্সনে website form থেকে আবেদনকারীর তথ্য এবং Documents সরাসরি Telegram Bot-এর মাধ্যমে আপনার Private Channel-এ পাঠানো হবে।

## Telegram তথ্য
- Channel ID: `-1004267834660`
- Bot অবশ্যই Channel Administrator হতে হবে এবং Post Messages permission থাকতে হবে।
- **Bot Token কখনো public HTML/JS-এ রাখবেন না।**

## চালানোর নিয়ম

### 1) Node.js 18+ ইনস্টল করুন

### 2) এই folder-এ Terminal/CMD খুলুন
```bash
npm install
```

### 3) Environment variable সেট করুন
`.env.example` কপি করে `.env` বানান এবং নিজের Bot Token বসান:

```env
PORT=3000
TELEGRAM_BOT_TOKEN=YOUR_REAL_BOT_TOKEN
TELEGRAM_CHAT_ID=-1004267834660
```

### 4) চালু করুন
```bash
npm start
```

তারপর browser-এ:
`http://localhost:3000`

## গুরুত্বপূর্ণ
- Telegram Bot Token কাউকে দেবেন না।
- Public internet-এ website চালাতে HTTPS ব্যবহার করুন।
- এই version Telegram-কে operational inbox হিসেবে ব্যবহার করে; আলাদা database/CRM নেই।
- Sensitive passport information নেওয়া হচ্ছে, তাই hosting/server security ও access control ঠিকভাবে সেট করা জরুরি।
