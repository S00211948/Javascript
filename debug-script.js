function debug(FirstSelectedItemId)
{
    /*var context = FirstSelectedItemId;
    var message = "Input parameter: " + context;
    Xrm.Navigation.openAlertDialog({ text: message });*/

    const inputString = FirstSelectedItemId.toString();
    const contactID = inputString.substring(1, inputString.length - 1);
    var message = "Recalculating for: " + contactID;
    // Display an alert dialog
    Xrm.Navigation.openAlertDialog({ text: message});
}