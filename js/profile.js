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

function profile(uid) {
    obj = {
        user_id: uid
    }
    $.ajax({
        type: "POST",
        url: BASE_URL + "/profile",
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json",
        success: function(response) {
            if (response.hasOwnProperty("error")) {
                alert(response.error)
            } else {
                profile = response["profile"];

                $("#profile").append(`  
                <h3 class="text-gray-600 font-lg text-semibold leading-6">${profile["first_name"] + " " + profile["last_name"]}</h3>
                `)

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

function deleteBlog(blog_id) {
    uid = getCookie("user_id");

    obj = {
        user_id: uid
    }
    $.ajax({
        type: "POST",
        url: BASE_URL + "/delete/" + blog_id,
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json",
        success: function(response) {
            if (response.hasOwnProperty("error")) {
                alert(response.error)
            } else {
                window.location.reload();
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

function fetchaUserBlogs(uid) {
    obj = {
        user_id: uid
    }
    $.ajax({
        type: "POST",
        url: BASE_URL + "/fetch_blogs/user",
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json",
        success: function(response) {
            if (response.hasOwnProperty("error")) {
                alert(response.error)
            } else {
                blogs = response["user_blogs"];

                blogs.forEach(element => {
                    $("#user_blog").append(`  
                    <div class="py-8 flex flex-wrap md:flex-nowrap">

                    <div class="md:flex-grow">
                    <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">${element["title"]}</h2>
                    <p class="leading-relaxed text-sm font-medium line-3">${element["content"]}</p>
                    <input type="hidden" id="blogid" value="${element["id"]}"> 
                    <a class="text-indigo-500 inline-flex items-center mt-4 cursor-pointer" onclick=sendId("${element["id"]}")>Learn More
                        <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </a>
                    <button class="float-right p-2 bg-red-500 rounded-md shadow-md text-white" onclick=deleteBlog("${element["id"]}")>Delete</button>
                </div>
                </div>

                `)
                });

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


$(document).ready(function() {
    user_id = getCookie("user_id");
    profile(user_id);
    fetchaUserBlogs(user_id);
});

function sendId(id) {
    window.location = "viewBlogs.html?blog=" + id;
}

function logOut() {
    document.cookie = "user_id" + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
    window.location.href = "signIn.html"
}