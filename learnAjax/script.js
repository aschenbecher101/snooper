// $ Jquery function w/ domcontentloaded event baked in it.
$( function () {
    console.log("...fire...");
    //Jquery function has querySelector as arg
    $().addEventListener("onclick", function(event) {
        console("inside :" + this);
        document
        .querySelector("#input")
        .innerHTML = message;
    });       
});

document.addEventListener("DOMContentLoaded",   
    function (event) {
        console.log(this);
        console.log("content is loaded...");
        console.log("outer even is: " + event);

        function sayHello (event, text) {
            console.log("we are inside: " + this);
            console.log("passed event: ");
            console.log(event);
            var name = document.querySelector("#input").value;

            this.innerHTML = "I said hello to " + name;
            var message = "<h2> Hello " + text + "!<\h2>";
            
            if (text === "student") {
                document
                    .querySelector("#DOMtitle")
                    .innerHTML += " " + text;
            } else {
            document
                .querySelector("#responseMessage")
                .innerHTML = message;
            }
        
        }
        
        document.querySelector("button")
            .addEventListener("click", function () {

                //calling server
                //AJ needs requestUrl, responseHandler
                //responseHandler is a function
                $AJ.sendGetRequest("./data_folder/data_js.json",
                    //responseHandler needs ...?
                    function (antwoord) {
                        console.log(antwoord);
                        console.log(antwoord.firstprop);
                        var message =
                            antwoord.firstprop + "; " + antwoord.secprop;
                        if (antwoord.tirdprop) {
                            message += "...tir prop is true. ";
                        }
                        else {
                            message += "... tir prop false. ";
                        }

                        message += "vier prop ";
                        message += antwoord.lastprop;

                    document.querySelector("#responseMessage")
                        .innerHTML = message;
                    });
            });
        
    }
)