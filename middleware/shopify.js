const axios = require('axios');

const calculateCarbonFootprint = async (apiToken) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': apiToken,
        }
    };

    const impressionDataUrl = 'https://your-shopify-store.com/api/impressions';
    const reachDataUrl = 'https://your-shopify-store.com/api/reach';

    try {
        const impressionsResponse = await axios.get(impressionDataUrl, config);
        const reachResponse = await axios.get(reachDataUrl, config);

        const totalImpressions = impressionsResponse.data.count;
        const totalReach = reachResponse.data.sum;

        const fileEmissionPerMB = 5;
        const averageDeliveryPerImpression = 466.52 * 1000 / 1000000;
        const averageConsumptionPerUserPerMB = 5 * 0.36;
        const electricityUsePerImpression = 0.001 * 554;

        const carbonFootprint = (
            (totalImpressions * fileEmissionPerMB) +
            (averageDeliveryPerImpression * totalImpressions) +
            (totalReach * averageConsumptionPerUserPerMB) +
            (totalImpressions * electricityUsePerImpression)
        ) / 1000000;

        console.log(`Total Carbon Footprint: ${carbonFootprint.toFixed(3)} KG`);
        return carbonFootprint.toFixed(3);
    } catch (error) {
        console.error('Failed to calculate carbon footprint:', error);
        return null;
    }
}


module.exports = {
    calculateCarbonFootprint
}