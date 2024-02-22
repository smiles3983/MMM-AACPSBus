/* Magic Mirror
*  Module: AACPS Bus
*
*  By James Wood
*/
var busData = "";

Module.register("MMM-AACPSBus", {

	defaults: {
		url: "", // The web page URL to check
		bus: "", // The string to look for
		image: "", // The image to display if the string is found
		updateInterval: 60 * 1000 // How often to check the web page (in milliseconds)
	},

	// Define the start function to initialize the module
	start: function () {
		// Log the module start
		Log.info(`Starting module: ${this.name}`);

		// Set the initial value of the boolean flag
		this.found = false;

		// Schedule the first update
		this.scheduleUpdate();
	},

	// Define the getDom function to create the module display
	getDom: function () {
		// Create a wrapper element
		var wrapper = document.createElement("div");

		// If the boolean flag is true, display the image
		if (this.found) {
			// Create an image element
			var image = document.createElement("img");

			// Set the image source and style
			image.src = this.config.image;
			image.style.width = "50%";
			image.style.height = "auto";

			var message = document.createElement("div");
			message.innerHTML = busData;
			message.id = 'busdata';
			// Append the image to the wrapper
			wrapper.appendChild(message);
			wrapper.appendChild(image);
		}

		// Return the wrapper
		return wrapper;
	},


	  // Define the update function to check the web page
	  update: function () {
		// Log the update
		Log.info(this.name + " is updating");
		this.sendSocketNotification("AACPS_REQUEST", this.config);
	  },

	// Define the scheduleUpdate function to set a timer for the next update
	scheduleUpdate: function () {
		// Log the schedule
		Log.info(`${this.name} is scheduling update`);

		// Set a timeout for the update function
		setTimeout(() => {
			this.update();

			// Schedule the next update
			this.scheduleUpdate();
		}, this.config.updateInterval);
	},

	// Override socket notification handler.
	socketNotificationReceived: function (notification, payload) {
		var re = new RegExp ('\\[\'' + this.config.bus + '.+?(?= \'<a)', 'm');
		if (notification === "AACPS_RESPONSE") {
		  // The node helper sent the website string
		  if (payload.includes(`['${this.config.bus}'`)) {
			this.found = true;
			const data = payload.match(re)[0].match(/'[^']*'/g);
			busData = `Bus ${data[0].replace('[','')} is not running </br>at Schools ${data[2]} </br>`
			if (data[1] !== "''"){
				busData = busData + `Backup Bus: ${data[1]} </br>`;
			}
			busData = busData + `in ${data[3]}`;
		  } else {
			this.found = false;
			busData = '';
		  }
		  // Update the dom
		  this.updateDom();
		} else if (notification === "AACPS_ERROR") {
		  // The node helper sent an error message
		  // Log it to the console
		  Log.error(this.name + ": " + payload);
		}
	  },
});
