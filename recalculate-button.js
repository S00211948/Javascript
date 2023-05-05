function RecalculateEarnings(FirstSelectedItemId, SelectedEntityTypeName)
{
    // Global Action Unique Name - this name is Case Sensitive
    var actionName = "new_testRevenueAction";
    var input = FirstSelectedItemId.toString();
    var inputType = SelectedEntityTypeName.toString();

    var contactID = input.substring(1, input.length - 1);
    var message = "Recalculating for: " + contactID + "\n"+inputType;
    // Display an alert dialog
    Xrm.Navigation.openAlertDialog({ text: message});
    //get the current organization url
    var globalContext = Xrm.Utility.getGlobalContext();
    var serverURL = globalContext.getClientUrl();
    
    //Pass the input parameters to action
    var data = {
        "contact":{
            "@odata.type": "Microsoft.Dynamics.CRM." + inputType,
            "contactid": contactID,
            "fullname":"placeholder"
        }
    };
    //Create the HttpRequestObject to send WEB API Request 
    var req = new XMLHttpRequest();
    req.open("POST", serverURL + "/api/data/v9.2/" + actionName, true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");

    req.onreadystatechange = function () {
        if (this.readyState == 4 /* complete */)
        {
            req.onreadystatechange = null;
        
            if (this.status == 200 || this.status == 204)
            {
                alert("Action Called Successfully...");

            //Get the output parameter of the action (if any)
            result = JSON.parse(this.response);

            alert(result.MyOutputParam);
            }
            else
            {
                var error = JSON.parse(this.response).error;
                alert("Error in Action: "+error.message +"\n"+serverURL);
            }
        }
    };
    //Execute request passing the input parameter of the action 
    req.send(JSON.stringify(data));
}