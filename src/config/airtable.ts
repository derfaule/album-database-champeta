// Airtable Configuration
export const AIRTABLE_CONFIG = {
  BASE_ID: 'appVYEMXc3C7Qc32u', // Replace with your Airtable Base ID
  accessToken: 'patVKKpTTPwGejb4S', // Replace with your Personal Access Token (PAT)
  TABLE_NAME: 'Imported_table', // Replace with your table name if different
  API_URL: `https://api.airtable.com/v0`
};
patVKKpTTPwGejb4S
export const getAirtableUrl = () => 
  `${AIRTABLE_CONFIG.API_URL}/${AIRTABLE_CONFIG.BASE_ID}/${AIRTABLE_CONFIG.TABLE_NAME}`;

export const getHeaders = () => ({
  'Authorization': `Bearer ${AIRTABLE_CONFIG.accessToken}`,
  'Content-Type': 'application/json'
});