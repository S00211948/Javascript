// A namespace defined for the sample code
// As a best practice, you should always define 
// a unique namespace for your libraries
var Revenue = window.Revenue || {};
(function () {
    // Define some global variables
    var myUniqueId = "_myUniqueId"; // Define an ID for the notification
    var currentUserName = Xrm.Utility.getGlobalContext().userSettings.userName; // get current user name
    var message = currentUserName + ": Your JavaScript code in action!";

    // Code to run in the form OnLoad event
    this.formOnLoad = function (executionContext) {
        var formContext = executionContext.getFormContext();

        // Display the form level notification as an INFO
        formContext.ui.setFormNotification(message, "INFO", myUniqueId);

        // Wait for 5 seconds before clearing the notification
        window.setTimeout(function () { formContext.ui.clearFormNotification(myUniqueId); }, 5000);
    }

    // Code to run in the column OnChange event 
    this.attributeOnChange = function (executionContext) {
        var formContext = executionContext.getFormContext();

        // Automatically set some column values if the account name contains "Contoso"
        var startDate = formContext.getAttribute("cr30a_startdate").getValue();
        // Create a new date object with the year and month from the input date
        const endOfMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
  
        // Set the date to the last day of the month
        endOfMonth.setDate(endOfMonth.getDate());
  
        // Return the end of the month date object 
        formContext.getAttribute("cr30a_enddate").setValue(endOfMonth);
    }

    // Code to run in the form OnSave event 
    this.formOnSave = function () {
        // Display an alert dialog
        Xrm.Navigation.openAlertDialog({ text: "Record saved." });
    }
}).call(Revenue);