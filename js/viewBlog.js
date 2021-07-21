// Global variables
BASE_URL = "http://127.0.0.1:5000";

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

function like() {
    user_id = getCookie("user_id");
    blogid = getUrlParameter("blog");


    obj = {
        user_id: user_id,
        like_dislike: 1
    }
    $.ajax({
        type: "POST",
        url: BASE_URL + "/like/" + blogid,
        data: JSON.stringify(obj),
        dataType: "json",
        processData: false,
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

    return false;
}

function comment() {
    user_id = getCookie("user_id");
    blogid = getUrlParameter("blog");
    comments = document.getElementById("comment").value;
    if (comments == "") {
        return null;
    }

    obj = {
        user_id: user_id,
        comment: comments
    }
    $.ajax({
        type: "POST",
        url: BASE_URL + "/comment/" + blogid,
        data: JSON.stringify(obj),
        dataType: "json",
        processData: false,
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

    return false;
}


function viewBlog(uid, blogid) {
    obj = {
        user_id: uid,
        blog_id: blogid
    }
    console.log(obj);
    $.ajax({
        type: "POST",
        url: BASE_URL + "/fetch_blogs/" + blogid,
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json",
        success: function(response) {
            if (response.hasOwnProperty("error")) {
                alert(response.error)
            } else {
                console.log(response)
                blogs = response["blog"]
                comments = response["comments"]
                console.log(comments["length"]);

                $('#blog').append(`
                        <div class="h-full px-8 pt-4 pb-24 overflow-hidden text-center relative">
                        <h1 class="text-left title-font text-white mb-3 font-900 text-6xl" style="font-family:Source Sans Pro;">${blogs["title"]}</h1>
                        <div class="flex space-x-3 my-10">
                            <img src="../static/user.svg" class="w-8 h-8 p-1 border-2 border-red rounded-full">
                            <span class="text-indigo-500 text-lg font-semibold">${blogs["first_name"] + " " + blogs["last_name"]}</span>
                        </div>
                        <p class="leading-relaxed mb-3 text-justify px-3 text-white">${blogs["content"]}
                        </p>

                        <div class="text-center mt-10 leading-none flex pl-2 w-full py-2 mb-5">
                            <span class="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                            <img src="../static/like.svg" class="mr-2 h-6 w-4 cursor-pointer" onclick="like()">${blogs["like_count"]}
                        </span>
                        </div>

                        <div class="border-t-2 border-gray-500">
                            <p class="float-left px-3 my-2 font-semibold text-white">Comments<span>(${comments["length"]})</span></p><br><br>
                            <div class="flex flex-shrink-1">
                                <textarea class="float-left ml-4 w-1/2 p-2 rounded-md border-2 border-gray-500" id="comment"></textarea>
                                <button class="text-center bg-gray-100 w-1/4 lg:w-1/5 rounded-xl text-black font-semibold text-sm ml-10 lg:text-lg" id="subComment" onclick="comment()">Submit</button>
                            </div>
                            <div id="fetchComments">
                            </div>
                        </div>
                    </div>
                       `)


                comments.forEach(element => {
                    $("#fetchComments").append(`                                  
                        <div class="flex space-x-3 mt-10">
                           <img src="../static/user.svg" class="w-7 h-7 p-1 border-2 border-red rounded-full">
                            <span class="text-indigo-500 text-sm font-medium mt-1">${element["first_name"] + " " + element["last_name"]}</span>
                              </div>
                           <p class="float-left mt-2 ml-10 font-medium text-base text-white">${element["comment"]}</p>
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
    blog_id = getUrlParameter("blog");
    viewBlog(user_id, blog_id);
});

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
}