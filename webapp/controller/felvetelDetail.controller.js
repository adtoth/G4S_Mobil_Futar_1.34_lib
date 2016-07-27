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

		onBeforeRendering: function() { // binding model synchronisation
			//this.onBeforeShow();
			window.globalleadasDetail = this;
			this.getView().addDelegate({
				onAfterShow: function(evt) {
					globalleadasDetail.getView().byId("idIconTabBarMulti").setSelectedKey("addr");
					globalleadasDetail.getView().byId("idIconTabBarMulti").setExpanded(true);
					var a = globalleadasDetail.getView().getBindingContext();
					window.signeeCounter = 0;
					var total = 0;

					var myView = globalleadasDetail.getView();
					//var model = sap.ui.getCore().getModel();
					var oElementBinding = myView.getElementBinding();
					var path = oElementBinding.getBoundContext().getPath();
					var object = myView.getModel().getObject(path);
					var model = myView.getModel();

					//folytat/aktivál gombok beállítása 
					// if (sap.ui.getCore().getModel().getProperty(a.sPath + "/DelStatus") == "111") {
					if (object.DelStatus === 111) {
						myView.byId("setActive").setVisible(true);
						myView.byId("setContinue").setVisible(false);
					} else if (object.DelStatus === 999) {
						myView.byId("setContinue").setVisible(true);
						myView.byId("setActive").setVisible(false);
					} else if (object.DelStatus === 555) {
						myView.byId("setActive").setVisible(false);
						myView.byId("setContinue").setVisible(true);
					} else {
						myView.byId("setActive").setVisible(false);
						myView.byId("setContinue").setVisible(false);
					}

					//$("#signature").jSignature("disable");

					if (object.DelStatus === 222) {
						myView.byId("grpA01").setSelected(true);
						myView.byId("grpB").setVisible(false);
					} else if (model.getProperty(a.sPath + "/COD_Collected") == '1') {
						myView.byId("grpA01").setSelected(true);
					} else if (model.getProperty(a.sPath + "/DelStatus") == '1') {
						myView.byId("grpA01").setSelected(false);
						myView.byId("grpA02").setSelected(true);
						myView.byId("grpB").setVisible(true);
						myView.byId("grpB01").setSelected(true);
						myView.byId("grpB01").setVisible(true);
						myView.byId("grpB02").setVisible(false);
						myView.byId("grpB03").setVisible(false);
						myView.byId("grpB04").setVisible(false);
						myView.byId("grpB05").setVisible(false);
						myView.byId("grpB06").setVisible(false);
						myView.byId("grpB07").setVisible(false);
						myView.byId("grpB08").setVisible(false);
						myView.byId("grpB09").setVisible(false);
						myView.byId("grpB10").setVisible(false);

					} else if (model.getProperty(a.sPath + "/DelStatus") == '2') {
						myView.byId("grpA01").setSelected(false);
						myView.byId("grpA02").setSelected(true);
						myView.byId("grpB").setVisible(true);
						myView.byId("grpB01").setVisible(false);
						myView.byId("grpB02").setSelected(true);
						myView.byId("grpB02").setVisible(true);
						myView.byId("grpB03").setVisible(false);
						myView.byId("grpB04").setVisible(false);
						myView.byId("grpB05").setVisible(false);
						myView.byId("grpB06").setVisible(false);
						myView.byId("grpB07").setVisible(false);
						myView.byId("grpB08").setVisible(false);
						myView.byId("grpB09").setVisible(false);
						myView.byId("grpB10").setVisible(false);

					} else if (model.getProperty(a.sPath + "/DelStatus") == '3') {
						myView.byId("grpA01").setSelected(false);
						myView.byId("grpA02").setSelected(true);
						myView.byId("grpB").setVisible(true);
						myView.byId("grpB01").setVisible(false);
						myView.byId("grpB02").setVisible(false);
						myView.byId("grpB03").setSelected(true);
						myView.byId("grpB03").setVisible(true);
						myView.byId("grpB04").setVisible(false);
						myView.byId("grpB05").setVisible(false);
						myView.byId("grpB06").setVisible(false);
						myView.byId("grpB07").setVisible(false);
						myView.byId("grpB08").setVisible(false);
						myView.byId("grpB09").setVisible(false);
						myView.byId("grpB10").setVisible(false);

					} else if (model.getProperty(a.sPath + "/DelStatus") == '4') {
						myView.byId("grpA01").setSelected(false);
						myView.byId("grpA02").setSelected(true);
						myView.byId("grpB").setVisible(true);
						myView.byId("grpB01").setVisible(false);
						myView.byId("grpB02").setVisible(false);
						myView.byId("grpB03").setVisible(false);
						myView.byId("grpB04").setSelected(true);
						myView.byId("grpB04").setVisible(true);
						myView.byId("grpB05").setVisible(false);
						myView.byId("grpB06").setVisible(false);
						myView.byId("grpB07").setVisible(false);
						myView.byId("grpB08").setVisible(false);
						myView.byId("grpB09").setVisible(false);
						myView.byId("grpB10").setVisible(false);

					} else if (model.getProperty(a.sPath + "/DelStatus") == '5') {
						myView.byId("grpA01").setSelected(false);
						myView.byId("grpA02").setSelected(true);
						myView.byId("grpB").setVisible(true);
						myView.byId("grpB01").setVisible(false);
						myView.byId("grpB02").setVisible(false);
						myView.byId("grpB03").setVisible(false);
						myView.byId("grpB04").setVisible(false);
						myView.byId("grpB05").setSelected(true);
						myView.byId("grpB05").setVisible(true);
						myView.byId("grpB06").setVisible(false);
						myView.byId("grpB07").setVisible(false);
						myView.byId("grpB08").setVisible(false);
						myView.byId("grpB09").setVisible(false);
						myView.byId("grpB10").setVisible(false);

					} else if (model.getProperty(a.sPath + "/DelStatus") == '6') {
						myView.byId("grpA01").setSelected(false);
						myView.byId("grpA02").setSelected(true);
						myView.byId("grpB").setVisible(true);
						myView.byId("grpB01").setVisible(false);
						myView.byId("grpB02").setVisible(false);
						myView.byId("grpB03").setVisible(false);
						myView.byId("grpB04").setVisible(false);
						myView.byId("grpB05").setVisible(false);
						myView.byId("grpB06").setSelected(true);
						myView.byId("grpB06").setVisible(true);
						myView.byId("grpB07").setVisible(false);
						myView.byId("grpB08").setVisible(false);
						myView.byId("grpB09").setVisible(false);
						myView.byId("grpB10").setVisible(false);

					} else if (model.getProperty(a.sPath + "/DelStatus") == '7') {
						myView.byId("grpA01").setSelected(false);
						myView.byId("grpA02").setSelected(true);
						myView.byId("grpB").setVisible(true);
						myView.byId("grpB01").setVisible(false);
						myView.byId("grpB02").setVisible(false);
						myView.byId("grpB03").setVisible(false);
						myView.byId("grpB04").setVisible(false);
						myView.byId("grpB05").setVisible(false);
						myView.byId("grpB06").setVisible(false);
						myView.byId("grpB07").setSelected(true);
						myView.byId("grpB07").setVisible(true);
						myView.byId("grpB08").setVisible(false);
						myView.byId("grpB09").setVisible(false);
						myView.byId("grpB10").setVisible(false);

					} else if (model.getProperty(a.sPath + "/DelStatus") == '8') {
						myView.byId("grpA01").setSelected(false);
						myView.byId("grpA02").setSelected(true);
						myView.byId("grpB").setVisible(true);
						myView.byId("grpB01").setVisible(false);
						myView.byId("grpB02").setVisible(false);
						myView.byId("grpB03").setVisible(false);
						myView.byId("grpB04").setVisible(false);
						myView.byId("grpB05").setVisible(false);
						myView.byId("grpB06").setVisible(false);
						myView.byId("grpB07").setVisible(false);
						myView.byId("grpB08").setVisible(true);
						myView.byId("grpB08").setSelected(true);
						myView.byId("grpB09").setVisible(false);
						myView.byId("grpB10").setVisible(false);

					} else if (model.getProperty(a.sPath + "/DelStatus") == '9') {
						myView.byId("grpA01").setSelected(false);
						myView.byId("grpA02").setSelected(true);
						myView.byId("grpB").setVisible(true);
						myView.byId("grpB01").setVisible(false);
						myView.byId("grpB02").setVisible(false);
						myView.byId("grpB03").setVisible(false);
						myView.byId("grpB04").setVisible(false);
						myView.byId("grpB05").setVisible(false);
						myView.byId("grpB06").setVisible(false);
						myView.byId("grpB07").setVisible(false);
						myView.byId("grpB08").setVisible(false);
						myView.byId("grpB09").setSelected(true);
						myView.byId("grpB09").setVisible(true);
						myView.byId("grpB10").setVisible(false);
						myView.byId("otherText").setVisible(false);

					} else if (model.getProperty(a.sPath + "/DelStatus") == '10') {
						myView.byId("grpA01").setSelected(false);
						myView.byId("grpA02").setSelected(true);
						myView.byId("grpB").setVisible(true);
						myView.byId("grpB01").setVisible(false);
						myView.byId("grpB02").setVisible(false);
						myView.byId("grpB03").setVisible(false);
						myView.byId("grpB04").setVisible(false);
						myView.byId("grpB05").setVisible(false);
						myView.byId("grpB06").setVisible(false);
						myView.byId("grpB07").setVisible(false);
						myView.byId("grpB08").setVisible(false);
						myView.byId("grpB09").setVisible(false);
						myView.byId("grpB10").setSelected(true);
						myView.byId("grpB10").setVisible(true);
						myView.byId("otherText").setVisible(true);
						myView.byId("otherText").setValue(model.getProperty(a.sPath + "/Comment"));
					} else {
						myView.byId("grpB").setVisible(false);
						myView.byId("otherText").setVisible(false);
						myView.byId("grpA01").setSelected(false);
						myView.byId("grpA02").setSelected(false);
						//				if(model.getProperty(a.sPath + "/DelStatus") == '999'){
						//					myView.byId("setActive").setText("Folytat");
						//				}
						//			myView.byId("setActive").setText("Aktivál");
					}

				}
			});
		},

		handleNavButtonPress: function(evt) {
			this.nav.back("felvetelMaster");
		},

		onSelect: function(evt) {
			if (this.getView().byId("grpA02").getSelected() === true) {
				this.getView().byId("grpB").setVisible(true);
				this.getView().byId("otherText").setVisible(false);
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