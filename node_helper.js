// node_helper.js

var NodeHelper = require("node_helper");
var request = require("request"); // Require the request module

module.exports = NodeHelper.create({
	// Override start method.
	start () {
		console.log(`Starting node helper for: ${this.name}`);
	},

	// Override socketNotificationReceived method.
	socketNotificationReceived (notification, payload) {
		var self = this;
		if (notification === "AACPS_REQUEST") {
			// The main module requested the website string
			// Get the https url from the payload
			var httpsUrl = payload.url;
			// Make a GET request to the https url
			request(httpsUrl, function (error, response, body) {
				if (!error && response.statusCode === 200) {
					// The request was successful
					// Send the website string to the main module
					self.sendSocketNotification("AACPS_RESPONSE", body);
				} else {
					// The request failed
					// Send an error message to the main module
					self.sendSocketNotification("AACPS_ERROR", error);
				}
			});
		}
	}
});
