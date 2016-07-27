sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/g4s/util/Formatter",
	"com/g4s/util/Grouper"
], function(Controller) {
	"use strict";

	return Controller.extend("com.g4s.controller.lezartFelvetelMaster", {

		handleListItemPress: function(evt) {
			var context = evt.getSource().getBindingContext();
			var _oRouter = sap.ui.core.UIComponent.getRouterFor(this);  
			_oRouter.navTo("lezartFelvetelDetail",  {lezartFelvetelDetailPath: context.getPath().substr(9, (context.getPath().length - 10))});
		},

		handleNavButtonPress: function(evt) {
			sap.ui.core.UIComponent.getRouterFor(this).navTo("launchPage");
		},

		handleGroup: function(evt) {

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

		handleSearch: function(evt) {

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
		},

	});

});