import { google } from 'googleapis';

const authenticate = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: '/Users/pranavdhawan/Projects/admin/client_secret_228493226597-sbca4o4h2msc6q3m5rd26l7v4gviibgm.apps.googleusercontent.com.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const client = await auth.getClient();
  return client;
};

export default authenticate;
