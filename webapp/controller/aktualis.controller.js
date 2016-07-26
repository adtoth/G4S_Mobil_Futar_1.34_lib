sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"com/g4s/controller/BaseController",
	"sap/ui/core/format/NumberFormat",
	"com/g4s/util/jSignature",
	"com/g4s/util/Formatter"
	
], function(Controller, BaseController, JSONModel, jSignature) {
	"use strict";

	return Controller.extend("com.g4s.controller.aktualis", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.g4s.view.aktualis
		 */
		onInit: function() {
			$("#signature").jSignature();
			var oViewModel = new JSONModel({
				busy: false,
				delay: 0
			});

			sap.ui.core.UIComponent.getRouterFor(this).getRoute("aktualis").attachPatternMatched(this._onObjectMatched, this);
			this.getView().setModel(oViewModel, "aktualisVew");
			this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));
			//var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			//oRouter.getRoute("leadasDetail").attachPatternMatched(this._onObjectMatched, this);
		},
		
		_onObjectMatched: function(oEvent) {
			/*this.getView().bindElement({
				path: "/" + oEvent.getParameter("arguments").invoicePath,
				model: "Address"
			});*/

			var aktualisPath = oEvent.getParameter("arguments").aktualisPath;
			this.getView().getModel().metadataLoaded().then(function() {
				var sObjectPath = this.getView().getModel().createKey("Address", {
					Id: aktualisPath
				});
				this._bindView("/" + sObjectPath);
			}.bind(this));

		},

		_bindView: function(sObjectPath) {
			// Set busy indicator during view binding
			var oViewModel = this.getView().getModel();

			// If the view was not bound yet its not busy, only if the binding requests data it is set to busy again
			oViewModel.setProperty("/busy", false);

			this.getView().bindElement({
				path: sObjectPath,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function() {
						oViewModel.setProperty("/busy", true);
					},
					dataReceived: function() {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		},

		_onBindingChange: function() {
			var oView = this.getView(),
				oElementBinding = oView.getElementBinding();

			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("detailObjectNotFound");
				// if object could not be found, the selection in the master list
				// does not make sense anymore.
				this.getOwnerComponent().oListSelector.clearMasterListSelection();
				return;
			}
			var sPath = oElementBinding.getPath(),
				//oResourceBundle = this.getView().getResourceBundle(),
				oObject = oView.getModel().getObject(sPath),
				Id = oObject.Id,
				oViewModel = this.getView().getModel();

			//	this.getOwnerComponent().oListSelector.selectAListItem(sPath);

		},

		_onMetadataLoaded: function() {
			// Store original busy indicator delay for the detail view
			var iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
				oViewModel = this.getView().getModel("leadasDetailView");

			// Make sure busy indicator is displayed immediately when
			// detail view is displayed for the first time
			//oViewModel.setProperty("/delay", 0);

			// Binding the view will set it to not busy - so the view is always busy if it is not bound
			//oViewModel.setProperty("/busy", true);
			// Restore original busy indicator delay for the detail view
			//oViewModel.setProperty("/delay", iOriginalViewBusyDelay);
		},



		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.g4s.view.aktualis
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.g4s.view.aktualis
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.g4s.view.aktualis
		 */
		//	onExit: function() {
		//
		//	}
		
	/*
	onBeforeRendering: function(){ // binding model synchronisation
		window.globalAktualis = this;
        this.getView().addDelegate({ onAfterShow: function(evt) {
        	var a = globalAktualis.getView().getBindingContext();
        	globalAktualis.getView().byId("idIconTabBarMulti").setSelectedKey("addr");
        	globalAktualis.getView().byId("idIconTabBarMulti").setExpanded(true);
		     var myView = globalAktualis.getView();   	
		     var model = sap.ui.getCore().getModel();
		     window.signeeCounter = 0;
		     myView.byId("clr").setVisible(false);
		     myView.byId("cls").setVisible(true);
		     myView.byId("susp").setVisible(true);
		     myView.byId("recipient").setValue(this.getView().getModel().getProperty(a.sPath + "/To"));
		     myView.byId("grpA01").setSelected(false);
		     myView.byId("grpA02").setSelected(false);
		     myView.byId("grpB01").setSelected(false);
		     myView.byId("grpB02").setSelected(false);
		     myView.byId("grpB03").setSelected(false);
		     myView.byId("grpB04").setSelected(false);
		     myView.byId("grpB05").setSelected(false);
		     myView.byId("grpB06").setSelected(false);
		     myView.byId("grpB07").setSelected(false);
		     myView.byId("grpB08").setSelected(false);
		     myView.byId("grpB09").setSelected(false);
		     myView.byId("grpB10").setSelected(false);
		     myView.byId("otherText").setValue("");
		     myView.byId("newZIP").setValue("");
		     myView.byId("newCity").setValue("");
		     myView.byId("newStreet").setValue("");		     
		     
        }});
       
	},	
	*/
	handleNavButtonPress : function(evt) {
			history.go(-1);
	},
	
	
	onSelect: function(evt){
		if(this.getView().byId("grpA02").getSelected() === true){
			this.getView().byId("grpB").setVisible(true);
			this.getView().byId("otherText").setVisible(false);
		}
		
		if(this.getView().byId("grpA01").getSelected() === true){
			this.getView().byId("grpB").setVisible(false);
			this.getView().byId("otherText").setVisible(true);
		}
		
	},
	
	onSelectOther: function(evt){
		if(this.getView().byId("grpB10").getSelected() === true){
			this.getView().byId("otherText").setVisible(true);
		}
		else {
			this.getView().byId("otherText").setVisible(false);
		}
	},
	
	close : function(evt) {
		var a = evt.getSource().getBindingContext();
		var myRouter = sap.ui.core.UIComponent.getRouterFor(this);
		var myView = this.getView();
		var bundle = this.getView().getModel("i18n").getResourceBundle();
		var data = this.getView().getModel().getProperty(a.sPath + "/DelStatus");
		if (data != '111' && data != '999') { //999-as státusz: aktív, 111-es Még nincs kiszállítva
			sap.m.MessageToast.show("Már le van zárva!");
		} else {
		sap.m.MessageBox.confirm(bundle.getText("CloseDialogMsg"), function(
				oAction) {			
			if (sap.m.MessageBox.Action.OK === oAction){
				if(myView.byId("grpB10").getSelected() === true){
					myView.getModel().setProperty(a.sPath + "/Comment", myView.byId("otherText").getValue());
					myView.getModel().setProperty(a.sPath + "/DelStatus", "10");
					myView.getModel().setProperty(a.sPath + "/Signature", $("#signature").jSignature("getData"));
					myView.getModel().submitChanges();
					
					sap.m.MessageToast.show("Lezárva");
					if(myView.getModel().getProperty(a.sPath + "/PicType") === "D"){
						myRouter.navTo("leadasMaster");
					}
					else myRouter.navTo("felvetelMaster");

				}
				else if (myView.byId("grpB01").getSelected() === true){
					myView.getModel().setProperty(a.sPath + "/DelStatus", "1");
					myView.getModel().setProperty(a.sPath + "/Signature", $("#signature").jSignature("getData"));
					myView.getModel().submitChanges();
					
					sap.m.MessageToast.show("Lezárva");
					if(myView.getModel().getProperty(a.sPath + "/PicType") === "D"){
						myRouter.navTo("leadasMaster");
					}
					else myRouter.navTo("felvetelMaster");
				}
				else if (myView.byId("grpB02").getSelected() === true){
					myView.getModel().setProperty(a.sPath + "/DelStatus", "2");
					myView.getModel().setProperty(a.sPath + "/Signature", $("#signature").jSignature("getData"));
					myView.getModel().submitChanges();

					sap.m.MessageToast.show("Lezárva");
					if(myView.getModel().getProperty(a.sPath + "/PicType") === "D"){
						myRouter.navTo("leadasMaster");
					}
					else myRouter.navTo("felvetelMaster");
				}
				else if (myView.byId("grpB03").getSelected() === true){
					myView.getModel().setProperty(a.sPath + "/DelStatus", "3");
					myView.getModel().setProperty(a.sPath + "/Signature", $("#signature").jSignature("getData"));
					myView.getModel().submitChanges();

					sap.m.MessageToast.show("Lezárva");
					if(myView.getModel().getProperty(a.sPath + "/PicType") === "D"){
						myRouter.navTo("leadasMaster");
					}
					else myRouter.navTo("felvetelMaster");
				}
				else if (myView.byId("grpB04").getSelected() === true){
					myView.getModel().setProperty(a.sPath + "/DelStatus", "4");
					myView.getModel().setProperty(a.sPath + "/Signature", $("#signature").jSignature("getData"));
					myView.getModel().submitChanges();

					sap.m.MessageToast.show("Lezárva");
					if(myView.getModel().getProperty(a.sPath + "/PicType") === "D"){
						myRouter.navTo("leadasMaster");
					}
					else myRouter.navTo("felvetelMaster");
				}
				else if (myView.byId("grpB05").getSelected() === true){
					myView.getModel().setProperty(a.sPath + "/DelStatus", "5");
					myView.getModel().setProperty(a.sPath + "/Signature", $("#signature").jSignature("getData"));
					myView.getModel().submitChanges();

					sap.m.MessageToast.show("Lezárva");
					if(myView.getModel().getProperty(a.sPath + "/PicType") === "D"){
						myRouter.navTo("leadasMaster");
					}
					else myRouter.navTo("felvetelMaster");
				}
				else if (myView.byId("grpB06").getSelected() === true){
					myView.getModel().setProperty(a.sPath + "/DelStatus", "6");
					myView.getModel().setProperty(a.sPath + "/Signature", $("#signature").jSignature("getData"));
					myView.getModel().submitChanges();

					sap.m.MessageToast.show("Lezárva");
					if(myView.getModel().getProperty(a.sPath + "/PicType") === "D"){
						myRouter.navTo("leadasMaster");
					}
					else myRouter.navTo("felvetelMaster");
				}
				else if (myView.byId("grpB07").getSelected() === true){
					myView.getModel().setProperty(a.sPath + "/DelStatus", "7");
					myView.getModel().setProperty(a.sPath + "/Signature", $("#signature").jSignature("getData"));
					myView.getModel().submitChanges();

					sap.m.MessageToast.show("Lezárva");
					if(myView.getModel().getProperty(a.sPath + "/PicType") === "D"){
						myRouter.navTo("leadasMaster");
					}
					else myRouter.navTo("felvetelMaster");
				}
				else if (myView.byId("grpB08").getSelected() === true){
					myView.getModel().setProperty(a.sPath + "/DelStatus", "8");					
					myView.getModel().setProperty(a.sPath + "/Signature", $("#signature").jSignature("getData"));
					myView.getModel().submitChanges();

					sap.m.MessageToast.show("Lezárva");
					if(myView.getModel().getProperty(a.sPath + "/PicType") === "D"){
						myRouter.navTo("leadasMaster");
					}
					else myRouter.navTo("felvetelMaster");
				}
				else if (myView.byId("grpB09").getSelected() === true){
					myView.getModel().setProperty(a.sPath + "/DelStatus", "9");
					myView.getModel().setProperty(a.sPath + "/Signature", $("#signature").jSignature("getData"));
					myView.getModel().submitChanges();

					sap.m.MessageToast.show("Lezárva");
					if(myView.getModel().getProperty(a.sPath + "/PicType") === "D"){
						myRouter.navTo("leadasMaster");
					}
					else myRouter.navTo("felvetelMaster");
				}
				else if (myView.byId("grpA01").getSelected() === true){
					if(myView.byId("recipient").getValue().length > 4){
					myView.getModel().setProperty(a.sPath + "/DelStatus", "222");
					myView.getModel().setProperty(a.sPath + "/Signature", $("#signature").jSignature("getData"));
					myView.getModel().setProperty(a.sPath + "/Recipient", myView.byId("recipient").getValue());
					myView.getModel().setProperty(a.sPath + "/Comment", myView.byId("otherText").getValue());
					/*if(myView.byId("uv01").getSelected() == true ){
						myView.getModel().setProperty(a.sPath + "/COD_Collected", 1);
					}
					else this.getView().getModel().setProperty(a.sPath + "/COD_Collected", 0);*/
					
					myView.getModel().submitChanges();

					
					sap.m.MessageToast.show("Lezárva");
					
					if(myView.getModel().getProperty(a.sPath + "/PicType") === "D"){
						myRouter.navTo("leadasMaster");
					}
					else myRouter.navTo("felvetelMaster");
					
					}
					else sap.m.MessageToast.show("Túl rövid átvevő név!");
				}
				
				else {
					sap.m.MessageToast.show("Válassz státuszt!");
				}
				if(myView.byId("newZIP").getValue() != '' && myView.byId("newCity").getValue() != '' && myView.byId("newStreet").getValue() != ''){
					
					myView.getModel().setProperty(a.sPath + "/TPostalCode", myView.byId("newZIP").getValue());
					myView.getModel().setProperty(a.sPath + "/TCity", myView.byId("newCity").getValue());
					myView.getModel().setProperty(a.sPath + "/TStreet", myView.byId("newStreet").getValue());
					myView.getModel().submitChanges();
				}
				else if((myView.byId("newZIP").getValue() != '') && (myView.byId("newCity").getValue() == '' || myView.byId("newStreet").getValue() == '')){
					sap.m.MessageToast.show("Hiányzó címadat!");
				}
				else if((myView.byId("newCity").getValue() != '') && (myView.byId("newZIP").getValue() == '' || myView.byId("newStreet").getValue() == '')){
					sap.m.MessageToast.show("Hiányzó címadat!");
				}
				else if((myView.byId("newStreet").getValue() != '') && (myView.byId("newCity").getValue() == '' || myView.byId("newStreet").getValue() == '')){
					sap.m.MessageToast.show("Hiányzó címadat!");
				}

			}
		},
		   
		   bundle.getText("CloseDialogTitle")
			);
		}
	},
	
	suspend: function(evt){
		var a = evt.getSource().getBindingContext();
		var myView = this.getView();
		var myRouter = sap.ui.core.UIComponent.getRouterFor(this);
		var bundle = this.getView().getModel("i18n").getResourceBundle();
		sap.m.MessageBox.confirm(bundle.getText("SuspendDialogMsg"), function(
				oAction) {			
			if (sap.m.MessageBox.Action.OK === oAction){
	
				myView.getModel().setProperty(a.sPath + "/DelStatus", "555");
				myView.getModel().submitChanges();
				if(myView.getModel().getProperty(a.sPath + "/PicType") === "D"){
					myRouter.navTo("leadasMaster");
				}
				else myRouter.navTo("felvetelMaster");
				
				
			}
		},
		   
		   bundle.getText("CloseDialogTitle")
			);
	},
	
	signee: function(evt) {
		 if(this.getView().byId("idIconTabBarMulti").getSelectedKey() == "sig"){
			 $("#signature").jSignature();
			 $("#signature").jSignature("reset");
	        }
		
		 var a = evt.getSource().getBindingContext();
	     var total = 0;
	     var myView = this.getView();
	    	     
        if(this.getView().byId("idIconTabBarMulti").getSelectedKey() == "sig"){
        	this.getView().byId("cls").setVisible(true);
        	this.getView().byId("clr").setVisible(true);
        	this.getView().byId("susp").setVisible(false);
        }
        else{
        	this.getView().byId("cls").setVisible(true);
        	this.getView().byId("clr").setVisible(false);
        	this.getView().byId("susp").setVisible(true);
        }
        
        function fSuccess(response){ 
        	var oNumberFormat = sap.ui.core.format.NumberFormat.getIntegerInstance({maxFractionDigits: 1, minFractionDigits: 0, groupingEnabled: true, groupingSeparator: " ",
			  decimalSeparator: "."});
            for(var i = 0; i < response.results.length; i++){
            	total += response.results[i].Price;
				myView.byId("total_id").setNumber(oNumberFormat.format(total));
            }

            }  
            function fError(oEvent){  
             console.log("oModel: An error occured while reading Employees!");  
            } 
        
        // totál utánvét összeg számítás
        
			  
			   this.getView().getModel().read(a.sPath + "/Items", {  
					success: jQuery.proxy(fSuccess, this),  
                	error: jQuery.proxy(fError, this)  
				});  
            
        /*this.getView().getModel().read(a.sPath, null, {
			"$expand" : "Items"
		}, true, function(response) {
			for(var i = 0; i < response.Items.results.length; i++){
				total += myView.getModel().getProperty("/Item(" + response.Items.results[i].Id + ")/Price");
				myView.byId("total_id").setNumber(oNumberFormat.format(total));
			}		
		});*/
    
    },
    
    clear: function(){
    	 $("#signature").jSignature("reset");
    },
		
    handlePhonePress: function(){
    	var b = this.getView().byId("phoneLink").getHref();
		window.open(this.getView().byId("phoneLink").getHref(), "_blank");
	}

	});

});