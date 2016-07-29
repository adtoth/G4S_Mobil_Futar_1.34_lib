sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.g4s.controller.launchPage", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.g4s.view.launchPage
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.g4s.view.launchPage
		 */
		onBeforeRendering: function(){ // binding model synchronisation
		//this.onBeforeShow();
		window.globalleadasDetail = this;
		 this.getView().addDelegate({onBeforeShow: function(evt) {
				window.globalleadasDetail.getView().getModel().updateBindings(true);
			}});
		 	
		 },

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.g4s.view.launchPage
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.g4s.view.launchPage
		 */
		//	onExit: function() {
		//
		//	}
		
		getBevetItems: function(evt) {
			var that = this;
			function fSuccess(response) {
				that.getView().byId("bevetTileNum").setValue(response);
			}

			function fError(oEvent) {
				console.log("oModel: An error occured while reading Employees!");
			}
			var filters = [];
			var filter1 = new sap.ui.model.Filter({  
                     path: "Today",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '1',
                     and: true
              }); 
            var filter2 = new sap.ui.model.Filter({  
                     path: "PickupStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: 'M',
                     and: true
              });
              
            filters.push(filter1); 
            filters.push(filter2); 
            
			this.getView().getModel().read("/Item/$count", {
				async: false,
				success: jQuery.proxy(fSuccess, this),
				error: jQuery.proxy(fError, this),
				filters: filters
			});
		},
		
		getAktualisNum: function(evt) {
			var that = this;
			function fSuccess(response) {
				that.getView().byId("aktualisTileNum").setValue(response);
			}

			function fError(oEvent) {
				console.log("oModel: An error occured while reading Employees!");
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
                     value1: '999',
                     and: true
              });
              
            filters.push(filter1); 
            filters.push(filter2); 
            
			this.getView().getModel().read("/Address/$count", {
				async: false,
				success: jQuery.proxy(fSuccess, this),
				error: jQuery.proxy(fError, this),
				filters: filters
			});
		},
		
		getLeadasNum: function(evt) {
			var that = this;
			function fSuccess(response) {
				that.getView().byId("leadasTileNum").setValue(response);
			}

			function fError(oEvent) {
				console.log("oModel: An error occured while reading Employees!");
			}
			var filters = [];
			var filter1 = new sap.ui.model.Filter({  
                     path: "Today",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '1',
                     and: true
              }); 
            var filter2 = new sap.ui.model.Filter({  
                     path: "PicType",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: 'D',
                     and: true
              });
              var filter3 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '111'
              });
              var filter4 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '555'
              });
              var filter5 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '999'
              });

            filters.push(filter1); 
            filters.push(filter2); 
            filters.push(filter3); 
            filters.push(filter4); 
            filters.push(filter5); 
            
			this.getView().getModel().read("/Address/$count", {
				async: false,
				success: jQuery.proxy(fSuccess, this),
				error: jQuery.proxy(fError, this),
				filters: filters
			});
		},
		
		getFelvetNum: function(evt) {
			var that = this;
			function fSuccess(response) {
				that.getView().byId("felvetTileNum").setValue(response);
			}

			function fError(oEvent) {
				console.log("oModel: An error occured while reading Employees!");
			}
			var filters = [];
			var filter1 = new sap.ui.model.Filter({  
                     path: "Today",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '1',
                     and: true
              }); 
            var filter2 = new sap.ui.model.Filter({  
                     path: "PicType",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: 'U',
                     and: true
              });
              var filter3 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '111'
              });
              var filter4 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '555'
              });
              var filter5 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '999'
              });

            filters.push(filter1); 
            filters.push(filter2); 
            filters.push(filter3); 
            filters.push(filter4); 
            filters.push(filter5); 
            
			this.getView().getModel().read("/Address/$count", {
				async: false,
				success: jQuery.proxy(fSuccess, this),
				error: jQuery.proxy(fError, this),
				filters: filters
			});
		},
		
		getLezartFelvetNum: function(evt) {
			var that = this;
			function fSuccess(response) {
				that.getView().byId("felvetLezartTileNum").setValue(response);
			}

			function fError(oEvent) {
				console.log("oModel: An error occured while reading Employees!");
			}
			var filters = [];
			var filter1 = new sap.ui.model.Filter({  
                     path: "Today",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '1',
                     and: true
              }); 
            var filter2 = new sap.ui.model.Filter({  
                     path: "PicType",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: 'U',
                     and: true
              });
              var filter3 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '222',
                     and: false
              });
              var filter4 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '1',
                     and: false
              });
              var filter5 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '2',
                     and: false
              });
              var filter6 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '3',
                     and: false
              });
              var filter7 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '4',
                     and: false
              });
              var filter8 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '5',
                     and: false
              });
              var filter9 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '6',
                     and: false
              });
              var filter10 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '7',
                     and: false
              });
              var filter11 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '8',
                     and: false
              });
              var filter12 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '9',
                     and: false
              });
              var filter13 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '10',
                     and: false
              });

            filters.push(filter1); 
            filters.push(filter2); 
            filters.push(filter3); 
            filters.push(filter4); 
            filters.push(filter5); 
            filters.push(filter6); 
            filters.push(filter7); 
            filters.push(filter8); 
            filters.push(filter9); 
            filters.push(filter10); 
            filters.push(filter11); 
            filters.push(filter12); 
            filters.push(filter13); 
            
			this.getView().getModel().read("/Address/$count", {
				async: false,
				success: jQuery.proxy(fSuccess, this),
				error: jQuery.proxy(fError, this),
				filters: filters
			});
		},
		
		getLezartLeadNum: function(evt) {
			var that = this;
			function fSuccess(response) {
				that.getView().byId("leadLezartTileNum").setValue(response);
			}

			function fError(oEvent) {
				console.log("oModel: An error occured while reading Employees!");
			}
						var filters = [];
			var filter1 = new sap.ui.model.Filter({  
                     path: "Today",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '1',
                     and: true
              }); 
            var filter2 = new sap.ui.model.Filter({  
                     path: "PicType",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: 'D',
                     and: true
              });
              var filter3 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '222',
                     and: false
              });
              var filter4 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '1',
                     and: false
              });
              var filter5 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '2',
                     and: false
              });
              var filter6 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '3',
                     and: false
              });
              var filter7 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '4',
                     and: false
              });
              var filter8 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '5',
                     and: false
              });
              var filter9 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '6',
                     and: false
              });
              var filter10 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '7',
                     and: false
              });
              var filter11 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '8',
                     and: false
              });
              var filter12 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '9',
                     and: false
              });
              var filter13 = new sap.ui.model.Filter({  
                     path: "DelStatus",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '10',
                     and: false
              });

            filters.push(filter1); 
            filters.push(filter2); 
            filters.push(filter3); 
            filters.push(filter4); 
            filters.push(filter5); 
            filters.push(filter6); 
            filters.push(filter7); 
            filters.push(filter8); 
            filters.push(filter9); 
            filters.push(filter10); 
            filters.push(filter11); 
            filters.push(filter12); 
            filters.push(filter13); 
            
			this.getView().getModel().read("/Address/$count", {
				async: false,
				success: jQuery.proxy(fSuccess, this),
				error: jQuery.proxy(fError, this),
				filters: filters
			});
		},
		
		getDepoNum: function(evt) {
			var that = this;
			function fSuccess(response) {
				that.getView().byId("depoTileNum").setValue(response);
			}

			function fError(oEvent) {
				console.log("oModel: An error occured while reading Employees!");
			}
			var filters = [];
			var filter1 = new sap.ui.model.Filter({  
                     path: "Today",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: '1',
                     and: true
              }); 
            var filter2 = new sap.ui.model.Filter({  
                     path: "PicType",  
                     operator: sap.ui.model.FilterOperator.EQ,  
                     value1: 'D',
                     and: true
              });
              var filter3 = new sap.ui.model.Filter({  
                     path: "PickupStatus",  
                     operator: sap.ui.model.FilterOperator.NE,  
                     value1: 'M',
                     and: false
              });
              var filter4 = new sap.ui.model.Filter({  
                     path: "PicType",  
                     operator: sap.ui.model.FilterOperator.NE,  
                     value1: 'U'
              });
              var filter5 = new sap.ui.model.Filter({  
                     path: "PickupStatus",  
                     operator: sap.ui.model.FilterOperator.NE,  
                     value1: 'A',
                     and: false
              });

            filters.push(filter1); 
            filters.push(filter2); 
            filters.push(filter3); 
            filters.push(filter4); 
            filters.push(filter5); 
    ///Item?$filter=Address/DelStatus eq 222 and Address/PicType eq 'U' or (Address/DelStatus ne 222 and PicType eq 'D') and Today eq '1'"
			this.getView().getModel().read("/Item/$count", {
				urlParameters: "$expand=Address&$filter=Address/DelStatus eq 222 and Address/PicType eq 'U' or (Address/DelStatus ne 222 and PicType eq 'D') and Today eq '1'",
				async: false,
				success: jQuery.proxy(fSuccess, this),
				error: jQuery.proxy(fError, this)
				//filters: filters
			});
		},

/*		getAddress: function(response) {

			var leadas = globalMaster.getView().byId("leadTile").getNumber();
			var lezartLeadas = globalMaster.getView().byId("leadLezartTile").getNumber();
			var lezartFelvetel = globalMaster.getView().byId("felvetLezartTile").getNumber();
			var felvetel = globalMaster.getView().byId("felvetTile").getNumber();
			var bevet = globalMaster.getView().byId("bevetTile").getNumber();
			var aktualis = globalMaster.getView().byId("aktualisTile").getNumber();

			for (var i = 0; i < response.results.length; i++) {
				if (response.results[i].PicType == 'D' && (response.results[i].DelStatus == '999' || response.results[i].DelStatus == '555' ||
						response.results[i].DelStatus == '111')) {
					leadas++;
				}
				if (response.results[i].PicType == 'D' && !(response.results[i].DelStatus == '999' || response.results[i].DelStatus == '555' ||
						response.results[i].DelStatus == '111')) {
					lezartLeadas++;
				}
				if (response.results[i].PicType == 'U' && (response.results[i].DelStatus == '999' || response.results[i].DelStatus == '555' ||
						response.results[i].DelStatus == '111')) {
					felvetel++;
				}
				if (response.results[i].PicType == 'U' && !(response.results[i].DelStatus == '999' || response.results[i].DelStatus == '555' ||
						response.results[i].DelStatus == '111')) {
					lezartFelvetel++;
				}
				if (response.results[i].DelStatus == '999') {
					aktualis++;
				}
			}

			globalMaster.getView().byId("leadTile").setNumber(leadas);
			globalMaster.getView().byId("leadLezartTile").setNumber(lezartLeadas);
			globalMaster.getView().byId("felvetTile").setNumber(felvetel);
			globalMaster.getView().byId("felvetLezartTile").setNumber(lezartFelvetel);
			globalMaster.getView().byId("aktualisTile").setNumber(aktualis);

		},
*/
		handleBevetelezesPress: function(evt) {
			//	if(globalMaster.getView().byId("bevetTile").getNumber() >= 1){
			//this.nav.to("bevetMaster", context);
							sap.ui.core.UIComponent.getRouterFor(this).navTo("bevetMaster");
			//	}
		},

		handleFelvetelPress: function(evt) {
			var context = evt.getSource().getBindingContext();
			//	if(globalMaster.getView().byId("felvetTile").getNumber() >= 1){
							sap.ui.core.UIComponent.getRouterFor(this).navTo("felvetelMaster");
			//	}
		},

		handleAktualisPress: function(evt) {
			/*var item = this.getView().byId("aktualisList").getItems();
			if (item.length !== 0) {
				var context = item[0].getBindingContext();
				sap.ui.core.UIComponent.getRouterFor(this).navTo("aktualis", {
					aktualisPath: context.getPath().substr(9, (context.getPath().length - 10))
				});
			}*/
			
			var that = this;
			function fSuccess(response) {
				if(response.results.length !== 0){
					sap.ui.core.UIComponent.getRouterFor(that).navTo("aktualis", {
					aktualisPath: response.results[0].Id
				});
				}
			}

			function fError(oEvent) {
				console.log("oModel: An error occured while reading Actual address!");
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
                     value1: '999',
                     and: true
              });
              
            filters.push(filter1); 
            filters.push(filter2); 
            
			this.getView().getModel().read("/Address", {
				async: false,
				success: jQuery.proxy(fSuccess, this),
				error: jQuery.proxy(fError, this),
				filters: filters
			});
		},

		handleLeadasPress: function(evt) {
			var context = evt.getSource().getBindingContext();
			//if(globalMaster.getView().byId("leadTile").getNumber() >= 1){
			sap.ui.core.UIComponent.getRouterFor(this).navTo("leadasMaster");
			//}
		},

		handleUtanvetPress: function(evt) {
			sap.ui.core.UIComponent.getRouterFor(this).navTo("utanvet");
		},

		handleLezartFelvetelPress: function(evt) {
			var context = evt.getSource().getBindingContext();
			sap.ui.core.UIComponent.getRouterFor(this).navTo("lezartFelvetelMaster");
			
		},

		handleLezartLeadasPress: function(evt) {
			sap.ui.core.UIComponent.getRouterFor(this).navTo("lezartLeadasMaster");

		},

		handleDepoPress: function(evt) {
			sap.ui.core.UIComponent.getRouterFor(this).navTo("depo");

		},

		/*handlePosPress: function() {
			navigator.geolocation.getCurrentPosition(function onSuccess(position) {
				var lat = position.coords.latitude;
				var long = position.coords.longitude;
				alert('Latitude: ' + position.coords.latitude + '\n' +
					'Longitude: ' + position.coords.longitude + '\n' +
					'Altitude: ' + position.coords.altitude + '\n' +
					'Accuracy: ' + position.coords.accuracy + '\n' +
					'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
					'Heading: ' + position.coords.heading + '\n' +
					'Speed: ' + position.coords.speed + '\n' +
					'Timestamp: ' + position.timestamp + '\n');
			});
		},*/

		/*logoff: function() {
			window.UI5Storage.remove("Auth");
			sap.ui.getCore().setModel(undefined);
			this.nav.to("login");
		}*/


	});

});