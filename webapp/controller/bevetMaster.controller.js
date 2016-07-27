jQuery.sap.require("com.g4s.util.Formatter");
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
		//	onInit: function() {
		//
		//	},

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
	
	handleNavButtonPress : function(evt) {
		sap.ui.core.UIComponent.getRouterFor(this).navTo("worklist");
	},

	scan : function(evt) {
		var a = evt.getSource().getBindingContext();
        window.globalVariable = this.getView();
        window.globalBevetMaster = this;
        window.globalFoundItems = 0;    
		window.scanner = cordova.require("cordova/plugin/BarcodeScanner");
        scanner.scan(this.loopScan, function(fail) {
            alert("encoding failed: " + fail);
        });
        
	},
		loopScan: function(result){
			var foundItems = 0;
			var allItems = 0;
			var closedItems = 0;
			var paramurl = "$filter=Today eq '1'";
			
			window.globalVariable.getModel().read("/Item", null, paramurl, true, function(response) {	
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
						sap.ui.getCore().getModel().read("/Address", null, paramurl, true, function(response) {
							lengthOfAddresses = response.results.length;
							//startOfIndex = response.results[0].Id;
							for(var i = 0; i <  lengthOfAddresses ; i++){
								sap.ui.getCore().getModel().read("/Address(" + response.results[i].Id + ")" , null, {
									"$expand" : "Items"
								}, true, function(response) {
									var itemCount = 0;
									for(var z = 0; z < response.Items.results.length; z++){
										if(response.Items.results[z].PickupStatus === 'A'){
											itemCount++;
										}
										if(itemCount == response.Items.results.length){
											var b = response.Id;
											var m = sap.ui.getCore().getModel();
											//sap.ui.getCore().getModel().update("/Address(" + response.Id + ")/SzallitasStatus", 'R'); 
											var asd = sap.ui.getCore().getModel().getProperty("/Address(" + response.Id + ")/SzallitasStatus");
											sap.ui.getCore().getModel().setProperty("/Address(" + response.Id + ")/SzallitasStatus", 'R');
											sap.ui.getCore().getModel().submitChanges();
											sap.ui.getCore().getModel().updateBindings(true);
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
				
					
			});



	}

	});

});