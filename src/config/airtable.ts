// Airtable Configuration
export const AIRTABLE_CONFIG = {
  BASE_ID: 'appVYEMXc3C7Qc32u', // Your Airtable Base ID
  accessToken: 'patVKKpTTPwGejb4S', // Replace with your Personal Access Token (PAT)
  TABLE_NAME: 'Imported_table', // Replace with your actual table name
  API_URL: `https://api.airtable.com/v0`
};

export const getAirtableUrl = () => 
  `${AIRTABLE_CONFIG.API_URL}/${AIRTABLE_CONFIG.BASE_ID}/${AIRTABLE_CONFIG.TABLE_NAME}`;

export const getHeaders = () => ({
  'Authorization': `Bearer ${AIRTABLE_CONFIG.accessToken}`,
  'Content-Type': 'application/json'
});