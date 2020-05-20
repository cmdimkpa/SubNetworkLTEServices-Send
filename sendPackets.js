// send X IP packets to network every burst interval

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3200

let burstSize = 10;
let burstInterval = 10000;
let events = 0;

const sendPackets = async () => {
    events++;
    await axios.get(`https://sub-network-lte.herokuapp.com/SubNetworkLTE/AirInterface/UERegistration/${burstSize}`).then(response => {
      console.log(`${response.data} (${events})`)
    }).catch(err => {
      console.log(err)
    })
}

app.listen(PORT, () => {
    console.log(`@emitter service: now running on port ${PORT}`);
    let emitter = setInterval(sendPackets, burstInterval);
});
