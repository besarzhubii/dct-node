const axios = require("axios");

// Replace with your valid Meta access token
const ACCESS_TOKEN = "YOUR_ACCESS_TOKEN";

// Function to fetch Ad Account ID
async function getAdAccountId() {
    const url = `https://graph.facebook.com/v18.0/me/adaccounts?fields=id,name&access_token=${ACCESS_TOKEN}`;

    try {
        const response = await axios.get(url);
        const adAccounts = response.data.data;

        if (adAccounts.length === 0) {
            console.log("No Ad Accounts found.");
            return null;
        }

        const adAccountId = adAccounts[0].id; // Get first Ad Account ID
        console.log("Ad Account ID:", adAccountId);
        return adAccountId;
    } catch (error) {
        console.error("Error fetching Ad Account ID:", error.response ? error.response.data : error.message);
        return null;
    }
}

// Function to fetch impressions and reach from Meta API
async function fetchAdInsights(adAccountId) {
    const url = `https://graph.facebook.com/v18.0/${adAccountId}/insights?fields=impressions,reach&access_token=${ACCESS_TOKEN}`;

    try {
        const response = await axios.get(url);
        const data = response.data.data;

        if (data.length === 0) {
            console.log("No insights data found.");
            return null;
        }

        let impressionsArray = data.map(item => parseInt(item.impressions, 10) || 0);
        let reachArray = data.map(item => parseInt(item.reach, 10) || 0);

        let COUNT_Impressions = impressionsArray.length;
        let SUM_Impressions = impressionsArray.reduce((a, b) => a + b, 0);
        let SUM_Reach = reachArray.reduce((a, b) => a + b, 0);

        return { COUNT_Impressions, SUM_Impressions, SUM_Reach };
    } catch (error) {
        console.error("Error fetching ad insights:", error.response ? error.response.data : error.message);
        return null;
    }
}

// Function to calculate the formula
function calculateFormula(COUNT_Impressions, SUM_Impressions, SUM_Reach) {
    return (
        (COUNT_Impressions * 5) +
        ((466520 / 1000000) * SUM_Impressions) +
        (SUM_Reach * 5 * 0.36) +
        (SUM_Impressions * 0.001 * 554)
    ) / 1000000;
}

// Main function to execute the workflow
async function getCalc() {
    const adAccountId = await getAdAccountId();
    if (!adAccountId) return;

    const insights = await fetchAdInsights(adAccountId);
    if (!insights) return;

    const result = calculateFormula(insights.COUNT_Impressions, insights.SUM_Impressions, insights.SUM_Reach);
    console.log("Calculated Value:", result);
}

