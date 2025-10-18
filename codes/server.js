const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from current directory

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Replace with your Gmail
        pass: 'your-app-password'      // Replace with your Gmail App Password
    }
});

// Order endpoint
app.post('/api/place-order', async (req, res) => {
    try {
        const { 
            customerName, 
            customerEmail, 
            customerPhone, 
            customerAddress, 
            items, 
            subtotal, 
            delivery, 
            discount, 
            total,
            paymentMethod 
        } = req.body;

        // Create order details HTML
        let itemsHTML = '';
        items.forEach(item => {
            itemsHTML += `
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.qty}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">₹${item.price}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">₹${item.price * item.qty}</td>
                </tr>
            `;
        });

        const emailHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; }
                    .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                    h1 { color: #d91a7a; text-align: center; }
                    h2 { color: #333; border-bottom: 2px solid #d91a7a; padding-bottom: 10px; }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    th { background-color: #d91a7a; color: white; padding: 12px; text-align: left; }
                    td { padding: 10px; }
                    .info-box { background-color: #fef2f8; padding: 15px; border-radius: 5px; margin: 15px 0; }
                    .total-box { background-color: #d91a7a; color: white; padding: 15px; border-radius: 5px; margin: 20px 0; font-size: 20px; font-weight: bold; text-align: center; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>🎂 New Order Received - SweetHome Delights</h1>
                    
                    <h2>Customer Details</h2>
                    <div class="info-box">
                        <p><strong>Name:</strong> ${customerName}</p>
                        <p><strong>Email:</strong> ${customerEmail}</p>
                        <p><strong>Phone:</strong> ${customerPhone}</p>
                        <p><strong>Address:</strong> ${customerAddress}</p>
                        <p><strong>Payment Method:</strong> ${paymentMethod.toUpperCase()}</p>
                    </div>

                    <h2>Order Items</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHTML}
                        </tbody>
                    </table>

                    <h2>Order Summary</h2>
                    <div class="info-box">
                        <p><strong>Subtotal:</strong> ₹${subtotal}</p>
                        <p><strong>Delivery Charge:</strong> ₹${delivery}</p>
                        <p><strong>Discount:</strong> -₹${discount}</p>
                    </div>

                    <div class="total-box">
                        Total Amount: ₹${total}
                    </div>

                    <p style="text-align: center; color: #666; margin-top: 30px;">
                        This is an automated email from SweetHome Delights order system.
                    </p>
                </div>
            </body>
            </html>
        `;

        // Send email to shop owner
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: 'rushikeshlokhande723@gmail.com',
            subject: `🎂 New Order from ${customerName} - ₹${total}`,
            html: emailHTML
        };

        await transporter.sendMail(mailOptions);

        // Send confirmation email to customer
        const customerMailOptions = {
            from: 'your-email@gmail.com',
            to: customerEmail,
            subject: '✅ Order Confirmed - SweetHome Delights',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; }
                        .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; }
                        h1 { color: #d91a7a; text-align: center; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>🎉 Thank You for Your Order!</h1>
                        <p>Dear ${customerName},</p>
                        <p>Your order has been successfully placed and confirmed!</p>
                        <p><strong>Order Total: ₹${total}</strong></p>
                        <p>We will deliver your delicious cakes soon!</p>
                        <br>
                        <p>Best Regards,<br><strong>SweetHome Delights Team</strong></p>
                    </div>
                </body>
                </html>
            `
        };

        await transporter.sendMail(customerMailOptions);

        res.json({ 
            success: true, 
            message: 'Order placed successfully! Email notifications sent.' 
        });

    } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to process order',
            error: error.message 
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📧 Email notifications will be sent to: rushikeshlokhande723@gmail.com`);
});
