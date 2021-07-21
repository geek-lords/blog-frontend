BASE_URL = "http://127.0.0.1:5000"; // Put your base url here

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function sampleGetRequest() {
    // Sample GET request

    $.ajax({
        type: "GET",
        url: BASE_URL + "/fetch_blogs/" + blog_id, // Example - API of fetching a particular blog.
        dataType: "json",
        contentType: "application/json",
        success: function(response) {
            console.log(response)
            if (response.hasOwnProperty("error")) {
                alert(response.error)
            } else {
                setCookie("user_id", response.user_id, 30);
                window.location = "listBlogs.html"
            }
        },
        statusCode: {
            401: function(xhr) {
                var obj = JSON.parse(xhr.responseText)
                alert(obj.error)
            }
        },
        failure: function(response) {
            alert(response)
        }
    });
}

function _create_account(first_name, last_name, email, password) {
    // Sample POST request

    obj = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
    }

    $.ajax({
        type: "POST",
        url: BASE_URL + "/create_account", // Example - API of creating a new account on sign up
        data: JSON.stringify(obj), // The JSON object
        dataType: "json",
        contentType: "application/json",
        success: function(response) {
            console.log(response)
            if (response.hasOwnProperty("error")) { // If server returns some error message
                alert(response.error)
            } else {
                setCookie("user_id", response.user_id, 30);
                window.location = "listBlogs.html"
            }
        },
        statusCode: {
            401: function(xhr) {
                var obj = JSON.parse(xhr.responseText)
                alert(obj.error)
            }
        },
        failure: function(response) {
            alert(response)
        }
    });
}

function create_account(e) {
    e.preventDefault();

    fname = document.getElementById("fname").value;
    lname = document.getElementById("lname").value;
    email = document.getElementById("email").value;
    pass = document.getElementById("pass").value;

    _create_account(fname, lname, email, pass);
}