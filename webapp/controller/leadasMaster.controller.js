sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/g4s/util/Formatter",
	"com/g4s/util/Grouper"

], function(Controller) {
	"use strict";

	return Controller.extend("com.g4s.controller.leadasMaster", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.g4s.view.leadasMaster
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.g4s.view.leadasMaster
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.g4s.view.leadasMaster
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.g4s.view.leadasMaster
		 */
		//	onExit: function() {
		//
		//	}

		handleListItemPress: function(evt) {
			var context = evt.getSource().getBindingContext();
			var _oRouter = sap.ui.core.UIComponent.getRouterFor(this);  
			_oRouter.navTo("leadasDetail",  {addressPath: context.getPath().substr(9, (context.getPath().length - 10))});
		},

		handleNavButtonPress: function(evt) {
			history.go(-1);
		},

		handleListSelect: function(evt) {
			var context = evt.getParameter("listItem").getBindingContext();
			this.nav.to("leadasDetail", context);
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
		}

	});

});