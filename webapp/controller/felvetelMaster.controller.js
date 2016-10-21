sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/g4s/util/Formatter",
	"com/g4s/util/Grouper"

], function(Controller) {
	"use strict";

	return Controller.extend("com.g4s.controller.felvetelMaster", {

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
			//		this.nav.to("felvetelDetail", context);
			_oRouter.navTo("felvetelDetail", {
				addressPath: context.getPath().substr(9, (context.getPath().length - 10))
			});

		},

		handleNavButtonPress: function(evt) {
			sap.ui.core.UIComponent.getRouterFor(this).navTo("launchPage");
		},

		handleListSelect: function(evt) {
			var context = evt.getParameter("listItem").getBindingContext();
			this.nav.to("felvetelDetail", context);
		},

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

	});

});