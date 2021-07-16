// Global variables
BASE_URL = "http://127.0.0.1:5000"

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

function addblogs(uid, title, blogs) {
    obj = {
        user_id: uid,
        title: title,
        content: blogs
    }
    console.log(obj);
    $.ajax({
        type: "POST",
        url: BASE_URL + "/create_blog",
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json",
        success: function(response) {
            if (response.hasOwnProperty("error")) {
                alert(response.error)
            } else {
                console.log(response)
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
        },
    });
}

function getdata(e) {
    e.preventDefault();
    user_id = getCookie("user_id");
    title = document.getElementById("title").value;
    blog = document.getElementById("blog").value;

    addblogs(user_id, title, blog);
}