Module.register("mm-kvb",{
	// Default module config.
	defaults: {
        station:"Subbelrather",
        stationid: 254,
        port: 6000,
        host: "127.0.0.1"
	},

    start: function() {
        Log.log(this.name + ' is started!');
        this.config.api_url = 'http://'+this.config.host+':'+this.config.port+'/stations/'+this.config.stationid+'/departures/';
        this.sendSocketNotification("KVB_STATION_REQUEST_DATA", this.config);
    },
	// Override dom generator.
	getDom: function() {
        console.log("DOM called")
        let wrapper = document.createElement("div");
        wrapper.id="kvbstations";
        //wrapper.innerHTML = this.config.text;
        wrapper.innerHTML = "Loading KVB Data";
		return wrapper;
    },
    

    getStyles: function() {
        return [
            this.file("css/mm-kvb.css")
        ];
    },

    notificationReceived: function(notification, payload, sender) {
        if (notification === "DOM_OBJECTS_CREATED") {
            Log.log("KVB DOM CREATED");
        }
        /*
        if (sender) {
            Log.log(this.name + " received a module notification: " + notification + " from sender: " + sender.name);
        } else {
            Log.log(this.name + " received a system notification: " + notification);
        }*/
    },

    socketNotificationReceived: function(notification, payload) {
        switch (notification) {
            case "KVB_STATION_DATA":
                table="<div class=\"station\">"+this.config.station+"</div>";
                table+= "<div class=\"header_row\"><div class=\"direction\">Direction</div><div class=\"lineid\">Line</div><div class=\"waittime\">Wait Time</div></div>";
                payload.forEach(element => {
                    item = "<div class=\"row\"><div class=\"direction\">"+element.direction+"</div><div class=\"lineid\">"+element.line_id+"</div><div class=\"waittime\">"+element.wait_time+"</div></div>";
                    table += item;
                });

                let wrapper = document.getElementById('kvbstations');
                wrapper.innerHTML = table;

                Log.log("KVB NEW DATA");
            break;
        }
    },



});