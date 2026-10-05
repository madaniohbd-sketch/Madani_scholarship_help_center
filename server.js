import express from 'express';
import multer from 'multer';

const app = express();
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || '-1004267834660';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { files: 10, fileSize: 20 * 1024 * 1024 }
});
app.use(express.static('public'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/index.html');
});
function esc(value='') {
  return String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

async function telegram(method, body) {
  if (!BOT_TOKEN) throw new Error('TELEGRAM_BOT_TOKEN is not configured');
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, { method:'POST', body });
  const data = await res.json();
  if (!data.ok) throw new Error(data.description || 'Telegram API error');
  return data;
}

app.post('/api/apply', upload.array('documents', 10), async (req, res) => {
  try {
    const { name, father, grandfather, mother, passport, phone, email, service, message } = req.body;
    if (!name || !father || !mother || !passport || !phone || !service) {
      return res.status(400).json({ ok:false, message:'প্রয়োজনীয় তথ্য পূরণ করুন।' });
    }

    const text = `🆕 <b>নতুন স্কলারশিপ আবেদন</b>\n\n` +
      `👤 <b>নাম:</b> ${esc(name)}\n` +
      `👨 <b>পিতার নাম:</b> ${esc(father)}\n` +
      `👴 <b>দাদার নাম:</b> ${esc(grandfather || '—')}\n` +
      `👩 <b>মায়ের নাম:</b> ${esc(mother)}\n` +
      `🛂 <b>পাসপোর্ট নাম্বার:</b> ${esc(passport)}\n` +
      `📱 <b>ফোন:</b> ${esc(phone)}\n` +
      `📧 <b>Email:</b> ${esc(email || '—')}\n` +
      `🎓 <b>সেবা:</b> ${esc(service)}\n` +
      `📝 <b>বার্তা:</b> ${esc(message || '—')}\n` +
      `📎 <b>Documents:</b> ${(req.files || []).length}টি`;

    const form = new FormData();
    form.append('chat_id', CHAT_ID);
    form.append('text', text);
    form.append('parse_mode', 'HTML');
    await telegram('sendMessage', form);

    for (const file of (req.files || [])) {
      const f = new FormData();
      f.append('chat_id', CHAT_ID);
      f.append('document', new Blob([file.buffer], { type: file.mimetype }), file.originalname);
      f.append('caption', `📎 ${file.originalname}\nআবেদনকারী: ${name}`);
      await telegram('sendDocument', f);
    }

    res.json({ ok:true, message:'আপনার আবেদন সফলভাবে পাঠানো হয়েছে।' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok:false, message:'আবেদন পাঠানো যায়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।' });
  }
});

app.listen(PORT, () => console.log(`Madani website running on http://localhost:${PORT}`));
