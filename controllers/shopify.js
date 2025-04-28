const axios = require('axios');
const User = require('../models/User');

const API_URL = 'https://connectors.windsor.ai/all';
const API_KEY = '70d4527db6a5dd9c60cbf868da7c2cc41f98';
const PARAMS = {
    api_key: API_KEY,
    date_preset: 'last_10d',
    fields: 'account_name,campaign,clicks,datasource,date,opens,order_name,source,spend'
};

async function fetchDataWastage(req, res) {
    try {
        const { storeId } = req.params;
        const { start_date, end_date } = req.body;
        const getUser = await User.findOne({ where: { id: storeId } });
        console.log({ getUser: getUser });
        if(!getUser){
            return res.status(500).send({})
        }
        const response = await axios.get(API_URL, { params: PARAMS });
        let clicks = 0;
        let finalArray = [];

        // Parse start and end dates if provided
        const startDate = start_date ? new Date(start_date) : null;
        const endDate = end_date ? new Date(end_date) : null;
        console.log(getUser.name);
        response.data?.data.map(el => {
            if (el?.account_name && el.account_name.includes(getUser.name)) {
                // If date is null, include it; otherwise, check if it falls within the date range
                const elDate = el.date ? new Date(el.date) : null;
                const isWithinDateRange = 
                    (elDate === null) || 
                    (startDate && endDate ? elDate >= startDate && elDate <= endDate : true) || 
                    (startDate && !endDate ? elDate >= startDate : true) || 
                    (!startDate && endDate ? elDate <= endDate : true);

                if (isWithinDateRange) {
                    finalArray.push(el);
                    clicks += el.clicks;
                }
            }
        });
        console.log({clicks});
        const totalImpressions = clicks;
        const totalReach = clicks;

        const fileEmissionPerMB = 5;
        const averageDeliveryPerImpression = 466.52 * 1000 / 1000000;
        const averageConsumptionPerUserPerMB = 5 * 0.36;
        const electricityUsePerImpression = 0.001 * 554;

        const carbonFootprint = ((
            (totalImpressions * fileEmissionPerMB) +
            (averageDeliveryPerImpression * totalImpressions) +
            (totalReach * averageConsumptionPerUserPerMB) +
            (totalImpressions * electricityUsePerImpression)
        ) / 1000000) * 0.76;
        console.log(getUser.facebook ? (carbonFootprint * 1000000) : 'N/A');
        return res.send({ facebookCarbonFootprint: getUser.facebook ? (carbonFootprint * 1000000) : 'N/A', klaviyoCarbonFootprint: getUser.klavyio ? (carbonFootprint * 1000000) * 0.15 : 'N/A', shopifyCarbonFootprint: getUser.shopify ? (carbonFootprint * 1000000) * 0.66 : 'N/A', googleCarbonFootprint: 'N/A'});
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.send(error);
    }
}

async function fetchData(req, res) {
    try {
        const { storeId } = req.params;
        const { start_date, end_date } = req.body;
        const getUser = await User.findOne({ where: { id: storeId } });
        console.log({ getUser: getUser });
        if(!getUser){
            return res.status(500).send({})
        }
        let hasShopify;
        let hasKlaviyo;
        // await axios.post('')
        const response = await axios.get(API_URL, { params: PARAMS });
        let clicks = 0;
        let finalArray = [];

        // Parse start and end dates if provided
        const startDate = start_date ? new Date(start_date) : null;
        const endDate = end_date ? new Date(end_date) : null;

        response.data?.data.map(el => {
            if (el?.account_name && el.account_name.includes(getUser.name)) {
                // If date is null, include it; otherwise, check if it falls within the date range
                const elDate = el.date ? new Date(el.date) : null;
                const isWithinDateRange = 
                    (elDate === null) || 
                    (startDate && endDate ? elDate >= startDate && elDate <= endDate : true) || 
                    (startDate && !endDate ? elDate >= startDate : true) || 
                    (!startDate && endDate ? elDate <= endDate : true);

                if (isWithinDateRange) {
                    finalArray.push(el);
                    clicks += el.clicks;
                }
            }
        });

        const totalImpressions = clicks;
        const totalReach = clicks;

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
        return res.send({ facebookCarbonFootprint: getUser.facebook ? (carbonFootprint * 1000000) : 'N/A', klaviyoCarbonFootprint: getUser.klavyio ? (carbonFootprint * 1000000) * 0.15 : 'N/A', shopifyCarbonFootprint: getUser.shopify ? (carbonFootprint * 1000000) * 0.66 : 'N/A', googleCarbonFootprint: 'N/A'});
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.send(error);
    }
}


const getOne = () => {
    return 'Test from Shopify';
}

module.exports = {
    getOne,
    fetchData,
    fetchDataWastage
}