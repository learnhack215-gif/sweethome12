# 🚀 Quick Start Guide - Email Server Setup

## ⚡ Fast Setup (5 Minutes)

### Step 1: Install Dependencies
Open terminal in this folder and run:
```bash
npm install
```

### Step 2: Configure Gmail
1. **Get Gmail App Password:**
   - Go to: https://myaccount.google.com/security
   - Enable **2-Step Verification**
   - Scroll to **App passwords**
   - Create password for "Mail" → "Other (Custom)" → Name: "SweetHome"
   - Copy the 16-character password (remove spaces)

2. **Update server.js (Lines 13-14):**
   ```javascript
   auth: {
       user: 'your-gmail@gmail.com',    // Your Gmail
       pass: 'abcdefghijklmnop'         // App Password (no spaces)
   }
   ```

### Step 3: Start Server
```bash
npm start
```

You should see:
```
🚀 Server running on http://localhost:3000
📧 Email notifications will be sent to: rushikeshlokhande723@gmail.com
```

### Step 4: Test Order
1. Open `index.html` in browser
2. Add items to cart
3. Go to checkout
4. Fill form and place order
5. Check email at **rushikeshlokhande723@gmail.com**

---

## 📧 What Happens When Order Placed?

1. **Shop Owner Email** (rushikeshlokhande723@gmail.com):
   - Complete order details
   - Customer information
   - All items ordered
   - Payment method
   - Total amount

2. **Customer Email**:
   - Order confirmation
   - Thank you message
   - Order total

---

## ✅ Features

✨ **Automatic Email Notifications**
✨ **Beautiful HTML Formatted Emails**
✨ **Order Details with Items List**
✨ **Customer Confirmation Email**
✨ **Secure Gmail App Password**

---

## 🔧 Troubleshooting

**❌ Email not sending?**
- Check Gmail App Password is correct
- Verify 2-Step Verification is ON
- Ensure server is running (no errors)
- Check spam folder

**❌ Server not starting?**
- Run `npm install` first
- Check if port 3000 is available
- Look for errors in terminal

**❌ "Backend server not running" error?**
- Start server: `npm start`
- Keep terminal window open
- Server must run while testing

---

## 📝 Important Notes

⚠️ **Keep server running** while placing orders
⚠️ **Never share** your Gmail App Password
⚠️ **Check both** shop owner & customer emails
⚠️ Server runs on **localhost:3000**

---

## 🎯 Testing Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Gmail App Password configured
- [ ] Server started (`npm start`)
- [ ] Order placed via checkout
- [ ] Email received at rushikeshlokhande723@gmail.com
- [ ] Customer confirmation email received

---

**Need Help?** Check `EMAIL_SETUP.md` for detailed instructions.
