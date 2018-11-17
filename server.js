const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000;
const url = require('url');

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')

    .get('/calc', function (request, response) {
        calcRate(request, response);
    })

    .get('/', (req, res) => res.render('pages/index'))    
    .listen(PORT, () => console.log(`Listening on ${PORT}`))

    function calcRate(request, response) {
        var requestUrl = url.parse(request.url, true);
       // console.log("Query parameters: " + JSON.stringify(requestUrl.query));

        var mailType = requestUrl.query.mailType;
        var weight = Number(requestUrl.query.weight);

        calculateRate(response, mailType, weight);
    }

    function calculateRate(response, mailType, weight) {
        mailType = mailType.toLowerCase();
        var result = 0.0;

        switch (mailType) {
            case "stamped":
                if (weight <= 1.0)
                    result = 0.50;
                else if (weight <= 2.0)
                    result = 0.71;
                else if (weight <= 3.0)
                    result = 0.92;
                else if (weight <= 3.5)
                    result = 1.13;
                else
                    result = NaN;
                break;
            case "metered":
                if (weight <= 1.0)
                    result = 0.47;
                else if (weight <= 2.0)
                    result = 0.68;
                else if (weight <= 3.0)
                    result = 0.89;
                else if (weight <= 3.5)
                    result = 1.10;
                else
                    result = NaN;
                break;
            case "flats":
                if (weight <= 1.0)
                    result = 1.00;
                else if (weight <= 2.0)
                    result = 1.21;
                else if (weight <= 3.0)
                    result = 1.42;
                else if (weight <= 4.0)
                    result = 1.63;
                else if (weight <= 5.0)
                    result = 1.84;
                else if (weight <= 6.0)
                    result = 2.05;
                else if (weight <= 7.0)
                    result = 2.26;
                else if (weight <= 8.0)
                    result = 2.47;
                else if (weight <= 9.0)
                    result = 2.68;
                else if (weight <= 10.0)
                    result = 2.89;
                else if (weight <= 11.0)
                    result = 3.10;
                else if (weight <= 12.0)
                    result = 3.31;
                else if (weight <= 13.0)
                    result = 3.52;
                else
                    result = NaN;
                break;
            case "retail":
                if (weight <= 4.0)
                    result = 3.50;
                else if (weight <= 8.0)
                    result = 3.75;
                else if (weight <= 9.0)
                    result = 4.10;
                else if (weight <= 10.0)
                    result = 4.45;
                else if (weight <= 11.0)
                    result = 4.80;
                else if (weight <= 12.0)
                    result = 5.15;
                else if (weight <= 13.0)
                    result = 5.50;
                else
                    result = NaN;
                break;
            default:
                result = NaN;
        }

    var params = { mailType: mailType, weight: weight, result: result };

    response.render('pages/result', params);

}
