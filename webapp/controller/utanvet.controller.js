sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/format/NumberFormat"

], function(Controller) {
	"use strict";

	return Controller.extend("com.g4s.controller.utanvet", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.g4s.view.utanvet
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.g4s.view.utanvet
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.g4s.view.utanvet
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.g4s.view.utanvet
		 */
		//	onExit: function() {
		//
		//	}

		onBeforeRendering: function() { // binding model synchronisation
			window.globalUtanvetView = this.getView();
			this.getView().addDelegate({
				onAfterShow: function(evt) {
					var total = 0;
					var yesterdayTotal = 0;
					var today = new Date();
					var yesterday = new Date(today);
					yesterday.setDate(today.getDate() - 1);
					var oNumberFormat = sap.ui.core.format.NumberFormat.getIntegerInstance({
						maxFractionDigits: 1,
						minFractionDigits: 0,
						groupingEnabled: true,
						groupingSeparator: " ",
						decimalSeparator: "."
					});
					var dd = yesterday.getDate();
					var mm = yesterday.getMonth() + 1; //January is 0!
					if (mm < 10) {
						mm = '0' + mm;
					}
					
					if (dd < 10) {
						dd = '0' + dd;
					}

					var yyyy = yesterday.getFullYear();
					//var todayFilter = "$filter=Today eq '1' and DelStatus eq '222'"; // a mai sikeres csomagokat összegezzük
					//var lengthOfAddresses = 0;

					/*window.globalUtanvetView.getModel().read("/Address", null, todayFilter, true, function(response) {
        		lengthOfAddresses = response.results.length;
				for(var i = 0; i < lengthOfAddresses ; i++){
					window.globalUtanvetView.getModel().read("/Address(" + response.results[i].Id + ")" , null, {
						"$expand" : "Items"
					}, false, function(response) {
							for(var j = 0; j < response.Items.results.length; j++){
								total += response.Items.results[j].Price;
								globalUtanvetView.byId("total_id").setNumber(oNumberFormat.format(total));
							}	
						
					});
						}	
    		});*/

					function fSuccess(response) {
						for (var i = 0; i < response.results.length; i++) {
							for (var j = 0; j < response.results[i].Items.results.length; j++) {
								total += response.results[i].Items.results[j].Price;
							}
						}
						window.globalUtanvetView.byId("total_id").setNumber(oNumberFormat.format(total));

					}

					function fError(oEvent) {
						console.log("oModel: An error occured while reading Prices!");
					}
					var filters = [];
					var filter1 = new sap.ui.model.Filter({
						path: "Today",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: '1',
						and: true
					});
					var filter2 = new sap.ui.model.Filter({
						path: "DelStatus",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: '222',
						and: true
					});

					filters.push(filter1);
					filters.push(filter2);

					window.globalUtanvetView.getModel().read("/Address", {
						urlParameters: "$expand=Items",
						async: false,
						success: jQuery.proxy(fSuccess, this),
						error: jQuery.proxy(fError, this),
						filters: filters
					});

					function vSuccess(response) {
						for (var i = 0; i < response.results.length; i++) {
							for (var j = 0; j < response.results[i].Items.results.length; j++) {
								yesterdayTotal += response.results[i].Items.results[j].Price;
							}
						}
						window.globalUtanvetView.byId("yesterday").setNumber(oNumberFormat.format(yesterdayTotal));

					}

					function vError(oEvent) {
						console.log("oModel: An error occured while reading Prices!");
					}
					// filterezés kézzel, mert nem szereti a '-ket a filterben valamiért :(
					window.globalUtanvetView.getModel().read("/Address", {
						urlParameters: "$expand=Items&$filter=DelStatus eq 222 and DeliveryDate eq datetime'" + yyyy + "-" + mm + "-" + dd +
							"T00:00:00'",
						async: false,
						success: jQuery.proxy(vSuccess, this),
						error: jQuery.proxy(vError, this)
							//filters: filters_
					});

					/*var yesterdayFilter = "$filter=DeliveryDate eq datetime'" + yyyy + "-" + mm + "-" + dd + "T00:00:00' and DelStatus eq '222'"; //a tegnapi sikeres csomagokat összegezzük
        window.globalUtanvetView.getModel().read("/Address", null, yesterdayFilter, true, function(response) {
        		lengthOfAddresses = response.results.length;
				for(var i = 0; i < lengthOfAddresses ; i++){
					window.globalUtanvetView.read("/Address(" + response.results[i].Id + ")" , null, {
						"$expand" : "Items"
					}, false, function(response) {
							for(var j = 0; j < response.Items.results.length; j++){
								yesterdayTotal += response.Items.results[j].Price;
								globalUtanvetView.byId("yesterday").setNumber(oNumberFormat.format(yesterdayTotal));
							}		
					});
						}	
    		});*/

				}
			});
		},

		handleNavButtonPress: function(evt) {
			sap.ui.core.UIComponent.getRouterFor(this).navTo("launchPage");

		}

	});

});