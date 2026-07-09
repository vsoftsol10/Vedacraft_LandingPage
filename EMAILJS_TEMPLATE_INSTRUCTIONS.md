EmailJS Template Setup for VedaCraft
=================================

Follow these exact steps so the template accepts the dynamic recipient address we send from the app.

1. Open EmailJS dashboard and go to "Email Templates".
2. Create a new template (or open the admin notification template you already use).
3. In the template editor **set the To field to a template variable**. Use one of the variable names we send from the app, for example:

   {{to_email}}

   (If you prefer a different name, edit the app to send that same key.)

4. In the email body use the following variable names to show requester data:

   - {{requester_name}}
   - {{requester_email}}
   - {{requester_phone}}
   - {{requester_city}}
   - {{requester_business_type}}

5. Save the template and note its Template ID. Make sure the template is associated with the same Service you use in the app.

Example template params the app sends:

{
  to_email: 'vedaconnecttvl@gmail.com',
  admin_email: 'vedaconnecttvl@gmail.com',
  recipient_email: 'vedaconnecttvl@gmail.com',
  to: 'vedaconnecttvl@gmail.com',
  to_name: 'VedaCraft Admin',
  requester_name: 'Alice',
  requester_email: 'alice@example.com',
  requester_phone: '123',
  requester_city: 'City',
  requester_business_type: 'Retail'
}

Notes and troubleshooting
- If the API still returns "The recipients address is empty", confirm the template's "To" field exactly contains `{{to_email}}` (or the matching variable you chose).
- As a fallback, you can set `VITE_EMAILJS_ADMIN_EMAIL` in your project's `.env` file to a valid address — the client code will use that when `to_email` is not provided.
- If you use a custom key (not `to_email`), update the `sendAdminNotificationEmail()` call in `src/Components/Form.jsx` to include that key.

EmailJS docs: https://www.emailjs.com/docs/
