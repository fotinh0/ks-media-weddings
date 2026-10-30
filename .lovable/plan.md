# Switch inquiries from FormSubmit to Web3Forms

## What changes for you
- The inquiry form (home, packages, contact pages) sends through Web3Forms instead of FormSubmit.
- Emails still go to ksanxhakumedia@gmail.com, laid out the same: names, email, date, venue, guests, package, how they heard, message. Pressing "Reply" answers the couple directly.
- Nothing is stored on the site, same as now.
- Free plan: 250 inquiries a month and no activation link to click.

## One step from you
1. Go to web3forms.com, enter ksanxhakumedia@gmail.com, and click "Create Access Key".
2. Paste the key they email you here in the chat. The key is meant to be public, so sharing it is safe.

## What I'll do once I have the key
- Point the form at Web3Forms, keeping the same fields, messages and "Thank you" screen.
- Add a hidden spam trap so bots get filtered out.
- Send one test inquiry and confirm it lands in the inbox, then update the project notes and memory so they say Web3Forms.

## Technical details
- `InquiryForm.tsx`: POST JSON to `https://api.web3forms.com/submit` with `access_key`, `subject`, `from_name`, `replyto` and the fields. Success means `json.success === true`. Add a `botcheck` honeypot.
- The access key is a public, client-side value, so it lives as a constant in the component. No server code or secret needed.
- Remove the FormSubmit-specific fields (`_template`, `_captcha`).
