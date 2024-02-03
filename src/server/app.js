const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
const bluebird = require('bluebird')
app.use(express.json()); //parsing response from lg api
const headers = {
  "Content-Type": "application/json",
  "Authorization": "Bearer Bj8YrhQMj", //validation of user
};
app.get("/example", (req, res) => {
  res.send("Hello World!");
});

app.get("/pixel/sample", (req, res) => {
  axios
    .get("https://cla-pixel.lgads.tv/sample", { headers })
    .then((data) => {
      console.log("data", data);
      res.status(200).send(data.data);
      // res.json(data)
    })
    .catch((err) => res.send(err));
});

app.get("/pixel/list/date", (req, res) => {
  axios
    .get("https://cla-pixel.lgads.tv/list/date", { headers })
    .then((data) => {
      console.log("data", data);
      res.status(200).send(data.data);
      // res.json(data)
    })
    .catch((err) => res.send(err));
});
app.get("/pixel/list/deviceId", (req, res) => {
  axios
    .get("https://cla-pixel.lgads.tv/list/deviceId", { headers })
    .then((data) => {
      console.log("data", data);
      res.status(200).send(data.data);
      // res.json(data)
    })
    .catch((err) => res.send(err));
});


app.get("/pixel/list/stationId", (req, res) => {
  axios
    .get("https://cla-pixel.lgads.tv/list/stationId", { headers })
    .then((data) => {
      console.log("data", data);
      res.status(200).send(data.data);
      // res.json(data)
    })
    .catch((err) => res.send(err));
});
app.get('/epg/recommendation', (req, res) => {
    const deviceId = req.query.deviceId;
const date = req.query.date;
    axios.get(`https://cla-pixel.lgads.tv/pixels?deviceId=${deviceId}&date=${date}`, { headers })
      .then( data => {
        // console.log("Pixel data....", data);
        res.status(200).json(data.data);
        // console.log("Pixel data....", data);
      // hit EPG Listing looping over the array received in above pixel request, pick each stationId. Collect all promises.
    //   const promises = data.data.map((pixelItem, index) => {//promises array of all api calls
    //     // console.log("Pixel itemm....", pixelItem);
    //         return axios.get(`https://cla-epg.lgads.tv/epg/listings?src=tms&stationId=${pixelItem.stationId}`, { headers }).then((data) => {
    //       return data.data;
    //     });
        
    //   })
    //   console.log("Pixel promisees...", promises.slice(0,5));
    //   bluebird.mapSeries(promises.slice(0, 5)).then((values) => {
    //     console.log("EPG Listing data...", values)
    //     res.status(200).json(values)
    //   }).catch(err => console.log("EPG LISting error......"))

      //Bluebird mapSeries
      bluebird.mapSeries(data.data, function(value, index, arrayLength) {
        return axios.get(`https://cla-epg.lgads.tv/epg/listings?src=tms&stationId=${value.stationId}`, { headers }).then((data) => {
          return data.data;
      })}).then(result => {
        console.log("Done!...", result);
        res.status(200).json(result);
      }).catch(err => console.log("EPG LISting error......"))
    //   const recommendedEpgList = await Promise.all(promises).then(values => { //waiting for promises to resolve/reject
    //     console.log("EPG Listing Values.....", values);
    //     return values;//all promises resolved
    //   }).catch(err => {
    //     console.log(err);
    //     res.send("Error while fetching EPG listing")
    //   })
    //   res.status(200).json(values)
      }).catch(err => {
        console.log(err);
        res.status(400).send("error while fetching pixel data");
      })
  })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
