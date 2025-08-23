# Supabase Setup Guide for AnsuryX Challenge

## Prerequisites
- A Supabase account (free tier is sufficient)
- Basic knowledge of SQL

## Step 1: Create a New Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - Name: `ansuryx-challenge`
   - Database Password: (generate a secure password)
   - Region: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be set up (usually 2-3 minutes)

## Step 2: Configure Database Schema

1. In your Supabase dashboard, go to the "SQL Editor"
2. Copy the contents of `database-schema.sql` from this project
3. Paste it into the SQL editor
4. Click "Run" to execute the schema creation
5. Verify that the tables were created in the "Table Editor"

## Step 3: Configure Authentication

1. Go to "Authentication" > "Settings" in your Supabase dashboard
2. Under "Auth Providers", ensure "Email" is enabled
3. Configure email templates (optional):
   - Go to "Auth" > "Templates"
   - Customize the confirmation and recovery email templates
4. Set up redirect URLs:
   - Add your local development URL: `http://localhost:5173`
   - Add your production URL when deployed

## Step 4: Get Your Project Credentials

1. Go to "Settings" > "API" in your Supabase dashboard
2. Copy the following values:
   - Project URL
   - Anon (public) key
3. Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=your-project-url-here
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 5: Test the Connection

1. Start your development server: `pnpm run dev`
2. Try to sign up with a new account
3. Check your email for the confirmation link
4. Try to sign in after confirming your email

## Security Considerations

- Never commit your `.env` file to version control
- The anon key is safe to use in client-side code
- Row Level Security (RLS) is enabled to protect user data
- Each user can only access their own data

## Optional: Email Configuration

For production, you may want to configure a custom SMTP provider:

1. Go to "Settings" > "Auth" in Supabase
2. Scroll down to "SMTP Settings"
3. Configure your email provider (SendGrid, Mailgun, etc.)
4. Test the email functionality

## Troubleshooting

### Common Issues:

1. **"Invalid API key"**: Double-check your environment variables
2. **"Row Level Security policy violation"**: Ensure RLS policies are set up correctly
3. **Email not sending**: Check your email configuration and spam folder
4. **CORS errors**: Add your domain to the allowed origins in Supabase settings

### Getting Help:

- Check the [Supabase documentation](https://supabase.com/docs)
- Visit the [Supabase Discord community](https://discord.supabase.com)
- Review the browser console for detailed error messages

## Demo Mode

If you want to test the app without setting up Supabase, you can use the demo mode by keeping the placeholder values in your `.env` file. The app will simulate authentication and data storage locally.

