// server side script fetching remote data and preparing report data source
const https = require('https');

// call remote http rest api
function fetchOrders() {
    return new Promise((resolve, reject) => {
        https.get('https://jsonplaceholder.typicode.com/users',
        (result) => {
            var str ;
            result.on('data',b=> str+=b);
            result.on('error', reject);
            result.on('end', () => resolve(str));
            console.log(str);
        });
    })
}

// group the data for report


// add jsreport hook which modifies the report input data
async function beforeRender(req, res) {
    req.data.orders = await fetchOrders()
}