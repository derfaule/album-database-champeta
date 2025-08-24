// Airtable Configuration
export const AIRTABLE_CONFIG = {
  BASE_ID: 'YOUR_BASE_ID_HERE', // Replace with your Airtable Base ID
  accessToken: 'YOUR_PAT_HERE', // Replace with your Personal Access Token (PAT)
  TABLE_NAME: 'Albums', // Replace with your table name if different
  API_URL: `https://api.airtable.com/v0`
};

export const getAirtableUrl = () => 
  `${AIRTABLE_CONFIG.API_URL}/${AIRTABLE_CONFIG.BASE_ID}/${AIRTABLE_CONFIG.TABLE_NAME}`;

export const getHeaders = () => ({
  'Authorization': `Bearer ${AIRTABLE_CONFIG.accessToken}`,
  'Content-Type': 'application/json'
});