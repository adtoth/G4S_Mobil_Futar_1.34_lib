jQuery.sap.require("com.g4s.util.Formatter");
jQuery.sap.require("jquery.sap.storage");
sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.g4s.controller.bevetMaster", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.g4s.view.bevetMaster
		 */
		onInit: function() {
			var that = this;
			this.getView().addEventDelegate({
				onBeforeShow: function(evt) {
					if (typeof(window.oStorage) === "undefined") {
						window.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
					}
					var networkState;
					if (typeof(navigator.connection) != "undefined") {
						networkState = navigator.connection.type;
						if (networkState == Connection.UNKNOWN || networkState == Connection.NONE) {
							var data = window.oStorage.get("data");
							that.getView().getModel().oData = data;
						}
					}

				}
			});
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.g4s.view.bevetMaster
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.g4s.view.bevetMaster
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.g4s.view.bevetMaster
		 */
		//	onExit: function() {
		//
		//	}

		handleNavButtonPress: function(evt) {
			sap.ui.core.UIComponent.getRouterFor(this).navTo("launchPage");
		},

		scan: function(evt) {
			var a = evt.getSource().getBindingContext();
			window.globalVariable = this.getView();
			window.globalBevetMaster = this;
			window.globalFoundItems = 0;
			window.scanner = cordova.plugins.barcodeScanner;
			scanner.scan(this.loopScan, function(fail) {
				console.log("encoding failed: " + fail);
			});

		},
		loopScan: function(result) {
			if (result.cancelled == true) { // ha megszakítottuk a scannelést
				return;
			}
			var foundItems = 0;
			var allItems = 0;
			var closedItems = 0;
			//var paramurl = "$filter=Today eq '1'";
			var isOnline = true;
			if (typeof(navigator.connection) != "undefined") {
				var networkState = navigator.connection.type;
				if (networkState == Connection.UNKNOWN || networkState == Connection.NONE) {
					isOnline = false;
				}
			}

			function fSuccess(response) {
				if (response.results.length != 0) { // ha találtunk ilyen csomagot
					if (response.results[0].PickupStatus == 'M') { // még nem volt felvéve, felvesszük
						window.globalFoundItems++;
						window.globalVariable.getModel().setProperty("/Item(" + response.results[0].Id + ")/PickupStatus", 'A');
						
						window.globalVariable.getModel().submitChanges();
						

						sap.m.MessageToast.show("Csomag felvéve");

					} else if (response.results[0].PickupStatus == 'A') { // ha már fel lett léve
						sap.m.MessageToast.show("Ez a csomag már fel van véve");
					}
				} else {
					sap.m.MessageToast.show("Nincs ilyen csomag");
				}
				window.scanner.scan(window.globalBevetMaster.loopScan, function(fail) {
					console.log(fail);
				});

			}

			function fError(oEvent) {
				console.log("oModel: An error occured while reading Items!");
			}

			if (isOnline) { // if the app is online, we read use the normal read operation
				var filters = [];
				var filter1 = new sap.ui.model.Filter({
					path: "Today",
					operator: sap.ui.model.FilterOperator.EQ,
					value1: '1',
					and: true
				});
				var filter2 = new sap.ui.model.Filter({
					path: "ProductId",
					operator: sap.ui.model.FilterOperator.EQ,
					value1: result.text,
					and: true
				});

				filters.push(filter1);
				filters.push(filter2);
				window.globalVariable.getModel().read("/Item", {
					async: false,
					success: jQuery.proxy(fSuccess, this),
					error: jQuery.proxy(fError, this),
					filters: filters
				});
			}
			else {
				var itemFound = false;
				var i = 0;
				while(!itemFound){
					if(window.globalBevetMaster.getView().getModel().getProperty("/Item(" + i + ")/ProductId") === result.text){
						window.globalBevetMaster.getView().getModel().setProperty("/Item(" + i + ")/PickupStatus", "A");
						itemFound = true;
						sap.m.MessageToast.show("Csomag felvéve");
						var modifiedItems = [];
						modifiedItems.push(window.globalBevetMaster.getView().getModel().getProperty("/Item(" + i + ")"));
						//var data =  //this.getView().getModel().oData;
						window.oStorage.put("modifiedItems", modifiedItems);
						window.oStorage.put("oData", window.globalBevetMaster.getView().getModel().oData);
					}
					i++;
				}
			}

			/*window.globalVariable.getModel().read("/Item", null, paramurl, true, function(response) {	
				for(var i = 0; i < response.results.length; i++){
					allItems = response.results.length;
					if(response.results[i].PickupStatus == 'A'){
						closedItems++;
					}
					if(response.results[i].ProductId === result.text){
						window.globalFoundItems++;
						if(response.results[i].PickupStatus != 'A'){
							window.globalVariable.getModel().setProperty("/Item(" + response.results[i].Id + ")/PickupStatus", 'A');
							window.globalVariable.getModel().submitChanges();
							window.globalVariable.getModel().updateBindings(true);
							window.globalVariable.getModel().forceNoCache(true);
						sap.m.MessageToast.show("Csomag felvéve");
						

						//var startOfIndex = 0;
						var lengthOfAddresses = 0;
						window.globalVariable.getModel().read("/Address", null, paramurl, true, function(response) {
							lengthOfAddresses = response.results.length;
							//startOfIndex = response.results[0].Id;
							for(var i = 0; i <  lengthOfAddresses ; i++){
								window.globalVariable.getModel().read("/Address(" + response.results[i].Id + ")" , null, {
									"$expand" : "Items"
								}, true, function(response) {
									var itemCount = 0;
									for(var z = 0; z < response.Items.results.length; z++){
										if(response.Items.results[z].PickupStatus === 'A'){
											itemCount++;
										}
										if(itemCount == response.Items.results.length){
											var b = response.Id;
											var m = window.globalVariable.getModel();
											//window.globalVariable.getModel().update("/Address(" + response.Id + ")/SzallitasStatus", 'R'); 
											var asd = window.globalVariable.getModel().getProperty("/Address(" + response.Id + ")/SzallitasStatus");
											window.globalVariable.getModel().setProperty("/Address(" + response.Id + ")/SzallitasStatus", 'R');
											window.globalVariable.getModel().submitChanges();
											window.globalVariable.getModel().updateBindings(true);
										}
									}
								});
									}
							
						});
						
						}
						else if(response.results[i].PickupStatus == 'A'){
							sap.m.MessageToast.show("Ez a csomag már fel van véve!");
						}
						else{
							sap.m.MessageToast.show("Nincs ilyen csomag");
						}
					}
					
				}
				
				
				if(window.globalFoundItems != allItems && result.text != ""){
					//var scanner = cordova.require("cordova/plugin/BarcodeScanner");
					window.scanner.scan(window.globalBevetMaster.loopScan, function(fail){ alert(fail);});
				}
				
					
			});*/
		},

		onUpdateFinished: function() {
			if (typeof(window.oStorage) == "undefined") {
				window.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
			}
			var data = this.getView().getModel();
			window.oStorage.put("data", data);
			var fetched = window.oStorage.get("data");

		}

	});

});