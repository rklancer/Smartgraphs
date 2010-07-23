// ==========================================================================
// Project:   Smartgraphs.authoringController
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class
 Controls authoring mode and business logic
 @extends SC.Object
 */
sc_require('models/dialog_turn');
sc_require('models/guide_page');

Smartgraphs.authoringController = SC.ObjectController.create(
/** @scope Smartgraphs.authoringController.prototype */
{
    isAuthoring: NO,
    pane: null,
    authoringPassword: "reflectpt", // TODO: use a password from a database
    enterredPassword: "",

    /** Cribbed from SampleControls.PaneController of git://github.com/sproutit/sproutcore-samples.git
	*/
    showPanelPane: function() {
        var pane = SC.PanelPane.create({
            layout: {
                width: 400,
                height: 200,
                centerX: 0,
                centerY: 0
            },
            contentView: SC.View.extend({
                layout: {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                },
                childViews: 'labelView passwordView buttonView'.w(),

                labelView: SC.LabelView.extend({
                    layout: {
                        top: 5,
                        left: 5,
                        right: 5,
                        height: 24,
                        centerX: 0
                    },
                    textAlign: SC.ALIGN_CENTER,
                    controlSize: SC.LARGE_CONTROL_SIZE,
                    value: "Enter an Authoring Password:"
                    /*,
                    valueBinding: 'Smartgraphs.authoringController.enterredPassword'*/
                }),

                passwordView: SC.TextFieldView.extend({
                    layout: {
                        top: 50,
                        height: 30,
                        left: 5,
                        right: 5,
                        centerX: 0
                    },
                    isPassword: YES,
                    textAlign: SC.ALIGN_CENTER,
                    controlSize: SC.LARGE_CONTROL_SIZE,
                    value: ""
                }),

                buttonView: SC.ButtonView.extend({
                    layout: {
                        top: 100,
                        width: 80,
                        height: 24,
                        centerX: 0
                    },
                    title: "OK",
                    action: "closingOperations"
                    /*,
                    target: "Smartgraphs.authoringController.pane"*/
                }),

                closingOperations: function() {
                    SC.Logger.log('closingOperations called');
                    Smartgraphs.authoringController.enterredPassword = this.passwordView.get('value');
                    SC.Logger.log('checking Smartgraphs.authoringController.enterredPassword:', Smartgraphs.authoringController.enterredPassword);
                    if (! (Smartgraphs.authoringController.enterredPassword === "")) {
                        SC.Logger.log('calling Smartgraphs.authoringController.toggleAuthoring()');
                        Smartgraphs.authoringController.toggleAuthoring();
                    }
                    SC.Logger.log('calling remove()');
                    Smartgraphs.authoringController.pane.remove();
                }
            })
        });
        pane.append();
        this.set('pane', pane);
    },

    checkEnterredPassword: function() {
        SC.Logger.log('checkEnterredPassword called');
        if (this.enterredPassword && this.authoringPassword) {
            var result = (this.enterredPassword === this.authoringPassword);
            if (!result) {
				// Clear enterredPassword so the user can try again later
                this.enterredPassword = "";
            }
            SC.Logger.log('checkEnterredPassword is returning result:', result);
            return result;
        }
        SC.Logger.log('checkEnterredPassword is returning false');
        return false;
    },

    isAuthorized: function() {
        SC.Logger.log('this.enterredPassword:', this.enterredPassword);
        if (this.enterredPassword === "") {
            // Don't toggle athoring mode yet, 
            // just show the modal panel to get a password from the user
            this.showPanelPane();
            return false;
        } else {
            return this.checkEnterredPassword();
        }
    },

    toggleAuthoring: function() {
        if (this.isAuthorized()) {
            this.toggleAuthoringMode();
        }
    },

    toggleAuthoringMode: function() {
        this.set('isAuthoring', !this.get('isAuthoring'));
    }
});
