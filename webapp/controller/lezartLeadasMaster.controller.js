sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/g4s/util/Formatter"
], function(Controller) {
	"use strict";

	return Controller.extend("com.g4s.controller.lezartLeadasMaster", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.g4s.view.lezartLeadasMaster
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.g4s.view.lezartLeadasMaster
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.g4s.view.lezartLeadasMaster
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.g4s.view.lezartLeadasMaster
		 */
		//	onExit: function() {
		//
		//	}
		
		handleListItemPress: function(evt) {
			var context = evt.getSource().getBindingContext();
			var _oRouter = sap.ui.core.UIComponent.getRouterFor(this);  
			_oRouter.navTo("lezartLeadasDetail",  {lezartLeadasDetailPath: context.getPath().substr(9, (context.getPath().length - 10))});
		},

	handleNavButtonPress : function(evt) {
		history.go(-1)
	},

	/*handleListSelect : function(evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		this.nav.to("lezartLeadasDetail", context);
	},*/

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
	
	handleSearch : function (evt) {
		
		// create model filter
		var filters = [];
		var query = evt.getParameter("query");
		if (query && query.length > 0) {
			var filter = new sap.ui.model.Filter("BPId", sap.ui.model.FilterOperator.Contains, query);
			filters.push(filter);
		}
		
		// update list binding
		var list = this.getView().byId("list");
		var binding = list.getBinding("items");
		binding.filter(filters);
	}

	});

});