jQuery.sap.require("sap.ui.netlife.G4S.util.Formatter");
jQuery.sap.require("sap.ui.netlife.G4S.util.Grouper");
sap.ui.controller("sap.ui.netlife.G4S.view.lezartFelvetelMaster", {
	
	onBeforeRendering: function(){
        this.getView().addDelegate({ onAfterRendering: function(evt) {
        	 sap.ui.getCore().getModel().refresh(true);
        	 sap.ui.getCore().getModel().updateBindings(true);
 			 sap.ui.getCore().getModel().forceNoCache(true);
 			
        }});
	},
	
	handleListItemPress : function(evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("lezartFelvetelDetail", context);
	},

	handleNavButtonPress : function(evt) {
		this.nav.back("Master");
	},

/*	handleListSelect : function(evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		this.nav.to("lezartFelvetelDetail", context);
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
	},

});