//setting up the IIFE
(function (global) {

    //setting up a namespace (empty object)
    //to attach methods and other objects to it.
    var ajUtils = {};
    console.log("namespace for :");
    console.log({ajUtils});

    //returns an HTTP request OBJECT.
    //the returned object depents on what data is available 
    //this function must not be exposed like ajUtils will be.
    function getRequestObject() {
        if (window.XMLHttpRequest) {
            return (new XMLHttpRequest());
        }
        else {
            global.alert("AJ not supported!");
            return(null);
        }
    }

    //check if server is responding
    function handleResponse(req, respHandler, isJS) {
        if ((req.readyState == 4) && (req.status == 200)) {

            //default to isJS if true
            if (isJS == undefined) {
                isJS = true;
            }
            
            if (isJS) {
                respHandler(JSON.parse(req.responseText));
            }
            else {
                respHandler(req);
            }
        }
    }
    //MAIN function
    ajUtils.sendGetRequest =
        function(requestUrl, responseHandler, isJS) {

            //making new XMLHttpRequest object
            var request = getRequestObject();
            //invoke handleResponse function when ready?
            request.onreadystatechange = 
                function() {
                    handleResponse(request, responseHandler, isJS);
                };

            //making it a GET request, true for asynchronous
            request.open("GET", requestUrl, true);
            //actually sending the request to the server.
            request.send(null);
            // as it was a POST request
            // the params need to be put as
            //arguments in de send method
            //for GET's it's in de requestUrl
        };

//Expose AJ to global object
global.$AJ = ajUtils;    


})(window);