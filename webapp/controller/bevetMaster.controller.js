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
		/*onInit: function() {
		},*/
		onBeforeRendering: function() { // binding model synchronisation
			window.globalAktualis = this;
			this.getView().addDelegate({
				onAfterShow: function(evt) {
					document.addEventListener("backbutton", window.globalAktualis.handleNavButtonPress, false);
					var d = new Date();
					var day = d.getDate();
					var month = d.getMonth() + 1;
					var year = d.getFullYear();

					if (month < 10) {
						month = "0" + month;
					}
					if (day < 10) {
						day = "0" + day;
					}

					var today = year + '-' + month + '-' + day + 'T00:00';
					var oFilters = [new sap.ui.model.Filter("PickupStatus", "EQ", "M", true),
						new sap.ui.model.Filter("Address/DeliveryDate", "EQ", today, true)
					];
					window.globalAktualis.getView().byId("list").getBinding("items").filter(oFilters);
					window.globalAktualis.getView().getModel().refresh();
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
			var paramurl = "$filter=Today eq '1'";

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
		},

		onUpdateFinished: function(){
			var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
			var oModel = this.getView().getModel();
			oStorage.put("oModel", oModel);
		}

	});

});