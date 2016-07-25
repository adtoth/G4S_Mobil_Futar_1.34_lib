jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
		"sap/ui/test/Opa5",
		"com/g4s/test/integration/pages/Common",
		"sap/ui/test/opaQunit",
		"com/g4s/test/integration/pages/Worklist",
		"com/g4s/test/integration/pages/Object",
		"com/g4s/test/integration/pages/NotFound",
		"com/g4s/test/integration/pages/Browser",
		"com/g4s/test/integration/pages/App"
	], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "com.g4s.view."
	});

	sap.ui.require([
		"com/g4s/test/integration/WorklistJourney",
		"com/g4s/test/integration/ObjectJourney",
		"com/g4s/test/integration/NavigationJourney",
		"com/g4s/test/integration/NotFoundJourney"
	], function () {
		QUnit.start();
	});
});
