sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/g4s/util/Formatter"
], function(Controller) {
	"use strict";

	return Controller.extend("com.g4s.controller.lezartLeadasMaster", {

		handleListItemPress: function(evt) {
			var context = evt.getSource().getBindingContext();
			var _oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			_oRouter.navTo("lezartLeadasDetail", {
				lezartLeadasDetailPath: context.getPath().substr(9, (context.getPath().length - 10))
			});
		},

<<<<<<< HEAD
	handleNavButtonPress : function(evt) {
		sap.ui.core.UIComponent.getRouterFor(this).navTo("launchPage");
	},
=======
		handleNavButtonPress: function(evt) {
			history.go(-1);
		},
>>>>>>> branch 'master' of https://github.com/adtoth/G4S_Mobil_Futar_1.34_lib

		/*handleListSelect : function(evt) {
			var context = evt.getParameter("listItem").getBindingContext();
			this.nav.to("lezartLeadasDetail", context);
		},*/

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
		}

	});

});
