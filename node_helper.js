var NodeHelper = require("node_helper");
const axios = require('axios');

module.exports = NodeHelper.create({
    
   
    socketNotificationReceived: function (notification, payload) {
        if (notification === "KVB_STATION_REQUEST_DATA") {
            this.request_apidata();
        }
    },

    request_apidata: function(){
        let self = this;
        var url= 'http://127.0.0.1:6000/stations/254/departures/';

        axios.get(url)
        .then(function (response) {
    
            if(response.data != undefined ) self.sendSocketNotification("KVB_STATION_DATA", response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }

});

function isJSON(str) {
    try { return (JSON.parse(str) && !!str); }
    catch (e) { return false; }
}