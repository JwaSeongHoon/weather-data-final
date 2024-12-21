import express from "express";
import request from "request";
const app = express();
app.get("/weather", (req, res) => {
    // Query parameters destructuring
    const { serviceKey, numOfRows, pageNo, base_date, base_time, nx, ny } = req.query;
    // Check for missing query parameters
    if (!serviceKey ||
        !numOfRows ||
        !pageNo ||
        !base_date ||
        !base_time ||
        !nx ||
        !ny) {
        return res.status(400).json({ error: "Missing required query parameters" });
    }
    const api_url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?";
    const options = {
        url: api_url,
        qs: {
            serviceKey,
            numOfRows,
            pageNo,
            base_date,
            base_time,
            nx,
            ny,
        },
    };
    // Send the request to the external API
    request.get(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.writeHead(200, { "Content-Type": "application/xml;charset=utf-8" });
            res.end(body);
        }
        else {
            res
                .status(response?.statusCode || 500)
                .json({ error: "Failed to fetch weather data" });
            console.error("Error:", error || response.statusCode);
        }
    });
});
app.listen(3000, () => {
    console.log("Server running at http://127.0.0.1:3000/weather?serviceKey=DwCt5zffTtmNpWZ3DP7Nt/vr5OsoQU1UaosPeV/Iu3D9W6ELbv1Z/SqtlnqRpyQPi62EwUfcRrckHUT77hzfzw==&numOfRows=10&pageNo=1&base_date=20241028&base_time=0600&nx=61&ny=125");
});
