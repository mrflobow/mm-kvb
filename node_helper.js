var NodeHelper = require("node_helper");
const axios = require('axios');

module.exports = NodeHelper.create({
    
   
    socketNotificationReceived: function (notification, payload) {
        if (notification === "KVB_STATION_REQUEST_DATA") {
            this.request_apidata(payload);
        }
    },

    request_apidata: function(config){
        let self = this;
        

        axios.get(config.api_url)
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

