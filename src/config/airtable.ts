// Airtable Configuration
export const AIRTABLE_CONFIG = {
  BASE_ID: 'appVYEMXc3C7Qc32u', // Your Airtable Base ID
  accessToken: 'pat1FoVPSncGVJWb2.1527add7d762e8fcd364daeaa5a6442bd7c75242fb1c27568f61d7f1a68293f3', // Replace with your Personal Access Token (PAT)
  TABLE_NAME: 'Imported_table', // Replace with your actual table name
  API_URL: `https://api.airtable.com/v0`
};

export const getAirtableUrl = () => 
  `${AIRTABLE_CONFIG.API_URL}/${AIRTABLE_CONFIG.BASE_ID}/${AIRTABLE_CONFIG.TABLE_NAME}`;

export const getHeaders = () => ({
  'Authorization': `Bearer ${AIRTABLE_CONFIG.accessToken}`,
  'Content-Type': 'application/json'
});