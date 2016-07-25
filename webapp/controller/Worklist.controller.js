sap.ui.define([
		"com/g4s/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"com/g4s/model/formatter",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/ui/core/routing/History"
	], function (BaseController, JSONModel, formatter, Filter, FilterOperator, History) {
		"use strict";

		return BaseController.extend("com.g4s.controller.Worklist", {

			formatter: formatter,

			/* =========================================================== */
			/* lifecycle methods                                           */
			/* =========================================================== */

			/**
			 * Called when the worklist controller is instantiated.
			 * @public
			 */
			onInit : function () {
				var oViewModel;
					//iOriginalBusyDelay,
					//oTable = this.byId("table");

				// Put down worklist table's original value for busy indicator delay,
				// so it can be restored later on. Busy handling on the table is
				// taken care of by the table itself.
				//iOriginalBusyDelay = oTable.getBusyIndicatorDelay();
				//this._oTable = oTable;
				// keeps the search state
				//this._oTableSearchState = [];

				// Model used to manipulate control states
				oViewModel = new JSONModel({
					worklistTableTitle : this.getResourceBundle().getText("worklistTableTitle"),
					saveAsTileTitle: this.getResourceBundle().getText("worklistViewTitle"),
					shareOnJamTitle: this.getResourceBundle().getText("worklistViewTitle"),
					shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
					shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
					tableNoDataText : this.getResourceBundle().getText("tableNoDataText"),
					tableBusyDelay : 0
				});
				this.setModel(oViewModel, "worklistView");

				// Make sure, busy indication is showing immediately so there is no
				// break after the busy indication for loading the view's meta data is
				// ended (see promise 'oWhenMetadataIsLoaded' in AppController)
				//oTable.attachEventOnce("updateFinished", function(){
					// Restore original busy indicator delay for worklist's table
				//	oViewModel.setProperty("/tableBusyDelay", iOriginalBusyDelay);
				//});
			},

			/**
			 * Event handler for navigating back.
			 * We navigate back in the browser historz
			 * @public
			 */
			onNavBack : function() {
				history.go(-1);
			},


		

			
			_showObject : function (oItem) {
				this.getRouter().navTo("object", {
					objectId: oItem.getBindingContext().getProperty("Id")
				});
			},

			onBeforeRendering: function(){
		window.globalMaster = this;
		this.getView().attachBeforeRendering(this.doMagic());
		var busyDialog = new sap.m.BusyDialog({text:'Loading Data', title: 'Loading'});
		//this.getView().attachBeforeRendering(this.doMagic(busyDialog));
		//this.getView().attachAfterRendering(this.stopMagic(busyDialog));
		this.getView().addDelegate({ onBeforeShow: function(evt) {
			globalMaster.doMagic();
        }});
	},
	
	getNumberOfItems: function(){  
		 var b =this.getView().getModel().getProperty("/Item");  
		return b;  
	}, 
	
	doMagic: function(rsp){
		//this.getView().getModel().updateBindings(true);
		//sap.getModel().forceNoCache(true);
		this.getView().byId("leadTile").setNumber(0);
		this.getView().byId("leadLezartTile").setNumber(0);
		this.getView().byId("felvetTile").setNumber(0);
		this.getView().byId("felvetLezartTile").setNumber(0);
		this.getView().byId("aktualisTile").setNumber(0);

		// Get the number of unpicked items from the server and set it for the tile 
		this.getView().getModel().read("/Item?$filter=Today eq '1' and PickupStatus eq 'M'", null, "$inlinecount=allpages", true, function(response){
			this.getView().byId("bevetTile").setNumber(response.__count);
		});
		//globalMaster.getView().byId("bevetTile").setNumber(bevet);
		
		this.getView().getModel().read("/Address?$filter=Today eq '1' and PicType eq 'D' and (DelStatus eq '999' or DelStatus eq '555' or DelStatus eq '111')", null, "$inlinecount=allpages", false, function(response){
			var leadas = response.__count;
		});
		//globalMaster.getView().byId("leadTile").setNumber(leadas);
		
		this.getView().getModel().read("/Address?$filter=Today eq '1' and PicType eq 'U' and (DelStatus eq '999' or DelStatus eq '555' or DelStatus eq '111')", null, "$inlinecount=allpages", false, function(response){
			var felvet = response.__count;
		});
		//globalMaster.getView().byId("felvetTile").setNumber(felvet);
		
		this.getView().getModel().read("/Address?$filter=Today eq '1' and DelStatus eq '999'", null, "$inlinecount=allpages", false, function(response){
			var aktualis = response.__count;
		});
		//globalMaster.getView().byId("aktualisTile").setNumber(aktualis);
		
		this.getView().getModel().read("/Address?$filter=Today eq '1' and PicType eq 'U' and (DelStatus ne '999' and DelStatus ne '555' and DelStatus ne '111')", null, "$inlinecount=allpages", false, function(response){
			var lezartFelvet = response.__count;
		});
		//globalMaster.getView().byId("felvetLezartTile").setNumber(lezartFelvet);
		
		this.getView().getModel().read("/Address?$filter=Today eq '1' and PicType eq 'D' and (DelStatus ne '999' and DelStatus ne '555' and DelStatus ne '111')", null, "$inlinecount=allpages", false, function(response){
			var lezartLead = response.__count;
		});
		//globalMaster.getView().byId("leadLezartTile").setNumber(lezartLead);
		
		this.getView().getModel().read("/Item?$filter=Address/DelStatus eq 222 and Address/PicType eq 'U' or (Address/DelStatus ne 222 and PicType eq 'D') and Today eq '1'", null, "$inlinecount=allpages", false, function(response){
			var depo = response.__count;
		});
		//globalMaster.getView().byId("depoTile").setNumber(depo);
	},
	
	getAddress: function(response) {

			var leadas = globalMaster.getView().byId("leadTile").getNumber();
			var lezartLeadas = globalMaster.getView().byId("leadLezartTile").getNumber();
			var lezartFelvetel = globalMaster.getView().byId("felvetLezartTile").getNumber();
			var felvetel = globalMaster.getView().byId("felvetTile").getNumber();
			var bevet = globalMaster.getView().byId("bevetTile").getNumber();
			var aktualis = globalMaster.getView().byId("aktualisTile").getNumber();

		for(var i = 0; i < response.results.length; i++){
				if(response.results[i].PicType == 'D' && (response.results[i].DelStatus == '999' || response.results[i].DelStatus == '555' || response.results[i].DelStatus == '111')){
					leadas++;
				}
				if(response.results[i].PicType == 'D' && !(response.results[i].DelStatus == '999' || response.results[i].DelStatus == '555' || response.results[i].DelStatus == '111')){
					lezartLeadas++;
				}
				if(response.results[i].PicType == 'U' && (response.results[i].DelStatus == '999' || response.results[i].DelStatus == '555' || response.results[i].DelStatus == '111')){
					felvetel++;
				}
				if(response.results[i].PicType == 'U' && !(response.results[i].DelStatus == '999' || response.results[i].DelStatus == '555' || response.results[i].DelStatus == '111')){
					lezartFelvetel++;
				}
				if(response.results[i].DelStatus == '999' ){
					aktualis++;
				}
		}
		
		globalMaster.getView().byId("leadTile").setNumber(leadas);
		globalMaster.getView().byId("leadLezartTile").setNumber(lezartLeadas);
		globalMaster.getView().byId("felvetTile").setNumber(felvetel);
		globalMaster.getView().byId("felvetLezartTile").setNumber(lezartFelvetel);
		globalMaster.getView().byId("aktualisTile").setNumber(aktualis);
		
	},
	
	handleBevetelezesPress : function (evt) {
		var context = evt.getSource().getBindingContext();
	//	if(globalMaster.getView().byId("bevetTile").getNumber() >= 1){
			//this.nav.to("bevetMaster", context);
			this.getRouter().navTo("bevetMaster");
	//	}
	},
	
	handleFelvetelPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		if(globalMaster.getView().byId("felvetTile").getNumber() >= 1){
			this.nav.to("felvetelMaster", context);
		}
	},
	
	handleAktualisPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		if(globalMaster.getView().byId("aktualisTile").getNumber() >= 1){
			this.nav.to("aktualisMaster", context);
		}
	},
	
	handleLeadasPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		//if(globalMaster.getView().byId("leadTile").getNumber() >= 1){
			this.getRouter().navTo("leadasMaster");
		//}
	},
	
	handleUtanvetPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("utanvet", context);
	},
	
	handleLezartFelvetelPress: function(evt){
		var context = evt.getSource().getBindingContext();
		if(globalMaster.getView().byId("felvetLezartTile").getNumber() >= 1){
			this.nav.to("lezartFelvetelMaster", context);
		}
	},
	
	handleLezartLeadasPress: function(evt){
		var context = evt.getSource().getBindingContext();
		if(globalMaster.getView().byId("leadLezartTile").getNumber() >= 1){
			this.nav.to("lezartLeadasMaster", context);
		}
	},
	
	handleDepoPress: function(evt){
		var context = evt.getSource().getBindingContext();
		if(globalMaster.getView().byId("depoTile").getNumber() >= 1){
			this.nav.to("depoMaster", context);
		}
	},	 

	handlePosPress: function(){
		navigator.geolocation.getCurrentPosition(function onSuccess(position){
			var lat = position.coords.latitude;
			var long = position.coords.longitude; 
			alert('Latitude: '          + position.coords.latitude          + '\n' +
			          'Longitude: '         + position.coords.longitude         + '\n' +
			          'Altitude: '          + position.coords.altitude          + '\n' +
			          'Accuracy: '          + position.coords.accuracy          + '\n' +
			          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
			          'Heading: '           + position.coords.heading           + '\n' +
			          'Speed: '             + position.coords.speed             + '\n' +
			          'Timestamp: '         + position.timestamp                + '\n');
		});
	},
	
	logoff: function(){
		window.UI5Storage.remove("Auth");
		sap.ui.getCore().setModel(undefined);
		this.nav.to("login");
	}

		});
	}
);