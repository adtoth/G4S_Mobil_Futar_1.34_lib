sap.ui.define([
		"com/g4s/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("com.g4s.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);