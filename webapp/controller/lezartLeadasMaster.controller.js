sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/g4s/util/Formatter"
], function(Controller) {
	"use strict";

	return Controller.extend("com.g4s.controller.lezartLeadasMaster", {
		
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
					var oFilters = [new sap.ui.model.Filter("DeliveryDate", "EQ", today, true)
					];
					window.globalAktualis.getView().byId("list").getBinding("items").filter(oFilters);
					window.globalAktualis.getView().getModel().refresh();
				}
			});

		},

		handleListItemPress: function(evt) {
			var context = evt.getSource().getBindingContext();
			var _oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			_oRouter.navTo("lezartLeadasDetail", {
				lezartLeadasDetailPath: context.getPath().substr(9, (context.getPath().length - 10))
			});
		},

	handleNavButtonPress : function(evt) {
		sap.ui.core.UIComponent.getRouterFor(this).navTo("launchPage");
	},


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
				var bundle = jQuery.sap.resources({
					url: "i18n/messageBundle.properties"
				});
				var grouper = bundle[key];
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