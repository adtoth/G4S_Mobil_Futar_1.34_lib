sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/g4s/util/Formatter",
	"com/g4s/util/Grouper"

], function(Controller) {
	"use strict";

	return Controller.extend("com.g4s.controller.felvetelMaster", {
	 
//	onBeforeRendering: function(){ // binding model synchronisation
			
//	        this.getView().addDelegate({ onAfterRendering: function(evt) {
//	        	 this.getView().getModel().refresh(true);
	        //	 sap.ui.getCore().getModel().updateBindings(true);
	 		//	 sap.ui.getCore().getModel().forceNoCache(true);
//	        }});
//		},
	 
	handleListItemPress : function(evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("felvetelDetail", context);
	},

	handleNavButtonPress : function(evt) {
			history.go(-1);
	},

	handleListSelect : function(evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		this.nav.to("felvetelDetail", context);
	},

	handleGroup : function(evt) {

		// compute sorters
		var sorters = [];
		var item = evt.getParameter("selectedItem");
		var key = (item) ? item.getKey() : null;
		if ("TPostalCode" === key || "To" === key || "TStreet" === key) {
			sap.ui.netlife.G4S.util.Grouper.bundle = this.getView().getModel("i18n").getResourceBundle();
			var grouper = sap.ui.netlife.G4S.util.Grouper[key];
			sorters.push(new sap.ui.model.Sorter(key, false, grouper));
		}

		// update binding
		var list = this.getView().byId("list");
		var oBinding = list.getBinding("items");
		oBinding.sort(sorters);
	},
	

	});

});