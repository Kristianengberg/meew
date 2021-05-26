$(function() {
    $("#navBar").load("../components/navbar.html");
});

$(function() {
    $("#footer").load("../components/footer.html");
});

function getUserData() {
    $.ajax('/users/data', {
        success: function(data, status, xhr) {
            $("#loginButton").remove();
            $("#menu").append("Credits: ", data.credits)
            $("#menu").prepend("<b>Hello, " +
                data.firstName + "!<b>")
            $("#signupButton").html("Sign out!");
            $("#signupButton").attr("onclick", "window.location.href='/logout';");

            for (let i = 0; i < data.spinHistory.length; i++) {

                let obj = data.spinHistory[i];
                console.log(obj);
                $('<div/>', {
                    class: "spinHistoryDiv",
                    id: 'spinHistoryDiv' + i
                }).appendTo('#rightdiv');

                $("#spinHistoryDiv" + i).append("<p>You spun the wheel and won: " + obj + "</p>");
            }
        }
    });
}

getUserData();

function updateUserHistory() {

}