jQuery.sap.require("com.g4s.util.Formatter");
jQuery.sap.require("com.g4s.util.Grouper");
sap.ui.controller("com.g4s.controller.leadasMaster", {
	 
	onBeforeRendering: function(){
	        //this.getView().addDelegate({ onAfterRendering: function(evt) {
	        	 //sap.ui.getCore().getModel().refresh(true);
	        	 //sap.ui.getCore().getModel().updateBindings(true);
	 			 //sap.ui.getCore().getModel().forceNoCache(true);
	 			
	       // }});
		},
	setCODNumber: function(evt){
		alert(43);
	},
	handleListItemPress : function(evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("leadasDetail", context);
	},

	handleNavButtonPress : function(evt) {
		this.nav.back("Master");
	},

	handleListSelect : function(evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		this.nav.to("leadasDetail", context);
	},

	handleGroup : function(evt) {

		// compute sorters
		var sorters = [];
		var item = evt.getParameter("selectedItem");
		var key = (item) ? item.getKey() : null;
		if ("TPostalCode" === key || "To" === key || "TStreet" === key) {
			com.g4s.util.Grouper.bundle = this.getView().getModel("i18n").getResourceBundle();
			var grouper = com.g4s.util.Grouper[key];
			sorters.push(new sap.ui.model.Sorter(key, false, grouper));
		}

		// update binding
		var list = this.getView().byId("list");
		var oBinding = list.getBinding("items");
		oBinding.sort(sorters);
	}

});