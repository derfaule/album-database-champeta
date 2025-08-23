// Airtable Configuration
export const AIRTABLE_CONFIG = {
  BASE_ID: 'appVYEMXc3C7Qc32u', // Replace with your Airtable Base ID
  API_KEY: 'patVKKpTTPwGejb4S', // Replace with your Airtable API Key
  TABLE_NAME: 'Imported table', // Replace with your table name if different
  API_URL: `https://api.airtable.com/v0`
};

export const getAirtableUrl = () => 
  `${AIRTABLE_CONFIG.API_URL}/${AIRTABLE_CONFIG.BASE_ID}/${AIRTABLE_CONFIG.TABLE_NAME}`;

export const getHeaders = () => ({
  'Authorization': `Bearer ${AIRTABLE_CONFIG.API_KEY}`,
  'Content-Type': 'application/json'
});