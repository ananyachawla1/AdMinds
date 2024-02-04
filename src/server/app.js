const express = require("express");
const app = express();
const port = 3001;
const axios = require("axios");
const cors = require("cors");
const bluebird = require("bluebird");
//const { findDOMNode } = require("react-dom");
app.use(express.json()); //parsing response from lg api
app.use(cors());
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer Bj8YrhQMj", //validation of user
};
app.get("/example", (req, res) => {
  res.send("Hello World!");
});

app.get("/pixel/sample", (req, res) => {
  -axios
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
app.get("/epg/recommendation", (req, res) => {
  function mode(array) {
    if (array.length == 0) return null;
    var modeMap = {};
    var maxEl = array[0],
      maxCount = 1;
    for (var i = 0; i < array.length; i++) {
      var el = array[i];
      if (modeMap[el] == null) modeMap[el] = 1;
      else modeMap[el]++;
      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      }
    }
    return maxEl;
  }
  const deviceId = req.query.deviceId;
  const date = req.query.date;
  axios
    .get(
      `https://cla-pixel.lgads.tv/pixels?deviceId=${deviceId}&date=${date}`,
      { headers }
    )
    .then((data) => {
      // console.log("Pixel data....", data);
      // res.status(200).json(data.data);
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
      bluebird
        .mapSeries(data.data, function (value, index, arrayLength) {
          //Set startTime as the time received in pixel API and convert to iSO standard string.
          const startTime = new Date(value.time);
          // Set endtime as 48 hours after startTime (add 48 hrs to startTime)
          const endTime = new Date(value.time);
          endTime.setUTCHours(startTime.getUTCHours() + 1);
          // Convert to iSO standard string
          //const endTimeConverted = new Date(endTime);
          console.log(
            "url",
            `https://cla-epg.lgads.tv/epg/listings?src=tms&stationId=${
              value.stationId
            }&startTime=${startTime.toISOString()}&endTime=${endTime.toISOString()}`
          );
          return axios
            .get(
              `https://cla-epg.lgads.tv/epg/listings?src=tms&stationId=${
                value.stationId
              }&startTime=${startTime.toISOString()}&endTime=${endTime.toISOString()}`,
              { headers }
            )
            .then((data) => {
              return data.data;
            });
        })
        .then((result) => {
          console.log("Done!...", JSON.stringify(result));

          const arrayOfResponses = [];
          let genreArray = [];

          result.forEach((element) => {
            console.log("element", JSON.stringify(element));
            // const result = { key: value };
            element.result.forEach((result) => {
              genreArray.push(...result.programInfo.genre);
            });

            // const maxGenre = mode(genreArray);
            // console.log(genreArray);
            arrayOfResponses.push(...element.result);
          });
          console.log("topGenre2", genreArray);
          const topGenre2 = mode(genreArray);
          const genreMap = {
            News: "Action",
            Children: "Comedy",
          };
          const topGenre = genreMap[topGenre2] || "Thriller";
          console.log(
            "topGenre",
            topGenre,
            `https://cla-epg.lgads.tv/epg/ott?genre=${topGenre}`
          );
          return axios
            .get(
              `https://cla-epg.lgads.tv/epg/ott?genre=${topGenre}&limit=10`,
              { headers }
            )
            .then((data) => {
              res.status(200).json(data.data);
              //   return data.data;
            });
          //   res.status(200).json({ result: arrayOfResponses });
        })
        .catch((err) => console.log("EPG LISting error......", err));
      //   const recommendedEpgList = await Promise.all(promises).then(values => { //waiting for promises to resolve/reject
      //     console.log("EPG Listing Values.....", values);
      //     return values;//all promises resolved
      //   }).catch(err => {
      //     console.log(err);
      //     res.send("Error while fetching EPG listing")
      //   })
      //   res.status(200).json(values)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("error while fetching pixel data");
    });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
