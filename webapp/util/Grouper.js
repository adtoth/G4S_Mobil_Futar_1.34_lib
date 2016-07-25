jQuery.sap.declare("com.g4s.util.Grouper");

com.g4s.utilGrouper = {

	bundle : null, // somebody has to set this

	Number : function (oContext) {
		var status = oContext.getProperty("Number");
		var text = com.g4s.util.Grouper.bundle.getText(status);
		return {
			key: status,
			text: text
		};
	},
	
	To : function (oContext) {
		var status = oContext.getProperty("To");
		var text = com.g4s.util.Grouper.bundle.getText(status);
		return {
			key: status,
			text: text
		};
	},
	
	TStreet : function (oContext) {
		var status = oContext.getProperty("TStreet");
		var text = com.g4s.util.Grouper.bundle.getText(status);
		return {
			key: status,
			text: text
		};
	}
	

};