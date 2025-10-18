# SweetHome Delights - Email Server Setup

## 📧 Email Configuration Steps

### 1. Gmail App Password Setup

To use Gmail for sending emails, you need to create an **App Password**:

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** (left sidebar)
3. Enable **2-Step Verification** (if not already enabled)
4. Scroll down to **App passwords**
5. Click **App passwords**
6. Select **Mail** and **Other (Custom name)**
7. Enter "SweetHome Delights Server"
8. Click **Generate**
9. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

### 2. Update server.js Configuration

Open `server.js` and update lines 13-14:

```javascript
auth: {
    user: 'your-email@gmail.com',     // Replace with YOUR Gmail address
    pass: 'your-app-password'          // Replace with the App Password from step 1
}
```

**Example:**
```javascript
auth: {
    user: 'yourgmail@gmail.com',
    pass: 'abcdefghijklmnop'  // Remove spaces from App Password
}
```

### 3. Install Dependencies

Open terminal in this folder and run:

```bash
npm install
```

### 4. Start the Server

```bash
npm start
```

Server will run on: **http://localhost:3000**

---

## 🎯 How It Works

1. Customer fills checkout form and places order
2. Server receives order data via POST request to `/api/place-order`
3. **Two emails are sent:**
   - ✅ **To rushikeshlokhande723@gmail.com** - Complete order details
   - ✅ **To Customer** - Order confirmation

---

## 📝 Email Contains:

- Customer Name, Email, Phone, Address
- Payment Method
- All ordered items with quantities and prices
- Subtotal, Delivery, Discount, Total
- Beautiful HTML formatted email

---

## ⚠️ Important Notes

- Use Gmail App Password, NOT your regular Gmail password
- Keep your App Password secure (add to .gitignore if using git)
- Server must be running for emails to work
- Both shop owner AND customer receive emails

---

## 🔧 Testing

After setup, test by:
1. Starting server: `npm start`
2. Opening checkout.html in browser
3. Adding items to cart
4. Completing checkout form
5. Placing order
6. Check both email inboxes!

---

## 🚨 Troubleshooting

**Email not sending?**
- Verify Gmail App Password is correct
- Check 2-Step Verification is enabled
- Ensure server is running (no errors in terminal)
- Check spam folder

**Server not starting?**
- Run `npm install` first
- Check if port 3000 is available
- Look for error messages in terminal
