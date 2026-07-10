# 🐺 Happy Birthday Jimmy — Alpha Wolf

صفحة هدية بمناسبة عيد ميلاد "Jimmy" بأسلوب سينمائي ليلي (HTML/CSS/JS بسيط، بدون أي إعدادات build).

## بنية المشروع
```
project/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── images/
    │   ├── wolf-birthday.jpeg        ← صورة "Happy Birthday from Alpha Wolf"
    │   └── portrait-twentynine.jpeg  ← صورة "Twenty Nine"
    └── audio/
        └── AUDIO-README.md           ← تفاصيل أسماء ملفات الصوت المطلوبة
```

## 1) إضافة الأصوات (مهم قبل الرفع)
افتح `assets/audio/AUDIO-README.md` وحط ملفات الصوت فيه بنفس الأسماء المطلوبة بالضبط:
- `wind.mp3`
- `howl.mp3`
- `forest.mp3`
- `ambient.mp3`
- `favorite.mp3`

إذا ما ضفتها الموقع رح يشتغل عادي بدون صوت (الكود مكتوب بشكل ما يكسر الصفحة إذا الملف مش موجود).

## 2) الرفع على GitHub
```bash
cd project
git init
git add .
git commit -m "Initial commit: Alpha Wolf birthday page"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git push -u origin main
```
(بدّل `USERNAME/REPO-NAME` باسم حسابك واسم المستودع اللي بتسويه على GitHub.)

## 3) النشر على Vercel
1. روح على https://vercel.com وسجّل دخول بحساب GitHub.
2. اضغط **Add New Project**.
3. اختر المستودع اللي رفعته.
4. Framework Preset: اختر **Other** (لأنه HTML عادي، ما في build step).
5. اضغط **Deploy** وخلص — رح ياخذك رابط مباشر للموقع.

## ملاحظات
- الموقع مبني بالكامل بملف واحد (`index.html`) + CSS/JS منفصلين، وما يحتاج أي مكتبات أو npm install.
- فيه شاشة دخول ("Enter the Night") قبل بداية القصة، لأن المتصفحات ما بتسمح بتشغيل صوت تلقائي بدون تفاعل من الزائر.
- تقدر تغيّر النصوص والألوان من ملف `style.css` (المتغيرات بأول الملف) و`index.html`.
