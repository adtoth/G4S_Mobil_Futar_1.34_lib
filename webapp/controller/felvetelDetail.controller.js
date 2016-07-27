sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"com/g4s/controller/BaseController",
	"sap/ui/core/format/NumberFormat",
	"com/g4s/util/jSignature",
	"com/g4s/util/Formatter"

], function(Controller, BaseController, JSONModel, jSignature) {
	"use strict";

	return Controller.extend("com.g4s.controller.felvetelDetail", {

	
	handleNavButtonPress : function(evt) {
		sap.ui.core.UIComponent.getRouterFor(this).navTo("felvetMaster");
	},
	
	onSelect: function(evt){
		if(this.getView().byId("grpA02").getSelected() === true){
			this.getView().byId("grpB").setVisible(true);
			this.getView().byId("otherText").setVisible(false);
		}
		
		if(this.getView().byId("grpA01").getSelected() === true){
			this.getView().byId("grpB").setVisible(false);
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
	
	activate: function(evt){
		var a = evt.getSource().getBindingContext();
		var bundle = this.getView().getModel("i18n").getResourceBundle();
		var context = evt.getSource().getBindingContext();
		var myself = this;
		var isActive = 0;
		var amIActive = false;
		if(sap.ui.getCore().getModel().getProperty(a.sPath + "/DelStatus") == "999"){
			amIActive = true;
		}
		for(i = 0; i < 1000; i++){
			if(sap.ui.getCore().getModel().getProperty("/Address(" + i + ")/DelStatus") == "999"){
				isActive++;
			}

			if (this.getView().byId("grpA01").getSelected() === true) {
				this.getView().byId("grpB").setVisible(false);
			}

		},

		onSelectOther: function(evt) {
			if (this.getView().byId("grpB10").getSelected() === true) {
				this.getView().byId("otherText").setVisible(true);
			} else {
				this.getView().byId("otherText").setVisible(false);
			}
		},

		activate: function(evt) {
			var a = evt.getSource().getBindingContext();
			var bundle = this.getView().getModel("i18n").getResourceBundle();
			var context = evt.getSource().getBindingContext();
			var myself = this;
			var isActive = 0;
			var amIActive = false;
			if (sap.ui.getCore().getModel().getProperty(a.sPath + "/DelStatus") == "999") {
				amIActive = true;
			}
			for (i = 0; i < 1000; i++) {
				if (sap.ui.getCore().getModel().getProperty("/Address(" + i + ")/DelStatus") == "999") {
					isActive++;
				}
			}
			if (isActive == 0 && amIActive == false) {
				if (sap.ui.getCore().getModel().getProperty(a.sPath + "/DelStatus") == '111' || sap.ui.getCore().getModel().getProperty(a.sPath +
						"/DelStatus") == '555') {
					if (sap.ui.getCore().getModel().getProperty(a.sPath + "/DelStatus") == '555') { //ha fel van függesztve akkor továbbemgyünk
						sap.ui.getCore().getModel().setProperty(a.sPath + "/DelStatus", '999');
						sap.ui.getCore().getModel().submitChanges();
						sap.ui.getCore().getModel().updateBindings(true);
						sap.ui.getCore().getModel().forceNoCache(true);
						myself.nav.to("aktualis", context);
					} else {
						sap.m.MessageBox.confirm(bundle.getText("ActivateDialogMsg"), function( // ha nincs, akkor megkérdezzük, h aktiváljuk-e
								oAction) {
								if (sap.m.MessageBox.Action.OK === oAction) {
									sap.ui.getCore().getModel().setProperty(a.sPath + "/DelStatus", '999');
									sap.ui.getCore().getModel().submitChanges();
									sap.ui.getCore().getModel().updateBindings(true);
									sap.ui.getCore().getModel().forceNoCache(true);
									myself.nav.to("aktualis", context);
								}
							},

							bundle.getText("ActivateDialogTitle")
						);
					}
				} else {
					sap.m.MessageToast.show("Szállítás lezárva, nem aktiválható!");
				}
			} else if (amIActive == false) {
				sap.m.MessageToast.show("Van már aktív szállítás!");
			}

			if (amIActive == true) {
				myself.nav.to("aktualis", context);
			}

		},

		signee: function(evt) {
			//		if(signeeCounter === 0){ // ha most jöttünk ide, töröljük az előző aláírást, egyébként megtartjuk, counter az onBeforeRenderingben
			//			//$("#signature").jSignature();
			//			$("#signature").jSignature("reset");
			//			signeeCounter++;
			//		}
			var a = evt.getSource().getBindingContext();
			var total = 0;
			var myView = this.getView();

			// $("#signature").jSignature();
			//$("#signature").jSignature("reset");

			// totál utánvét összeg számítás
			var oNumberFormat = sap.ui.core.format.NumberFormat.getIntegerInstance({
				maxFractionDigits: 1,
				minFractionDigits: 0,
				groupingEnabled: true,
				groupingSeparator: " ",
				decimalSeparator: "."
			});
			sap.ui.getCore().getModel().read(a.sPath, null, {
				"$expand": "Items"
			}, true, function(response) {
				for (var i = 0; i < response.Items.results.length; i++) {
					total += sap.ui.getCore().getModel().getProperty("/Item(" + response.Items.results[i].Id + ")/Price");
					myView.byId("total_id").setNumber(oNumberFormat.format(total));
				}
			});

			/*   	if(sap.ui.getCore().getModel().getProperty(a.sPath + "/DelStatus") == "111"){
			   		myView.byId("setActive").setText("Folytat");
					}
					else{
						myView.byId("setActive").setText("Aktivál");
					}*/

		},

		clear: function() {
			$("#signature").jSignature("reset");

		},

		handlePhonePress: function() {
			var b = this.getView().byId("phoneLink").getHref();
			window.open(this.getView().byId("phoneLink").getHref(), "_blank");
		},

	});

});