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



function fetchblogs(uid) {
    obj = {
        user_id: uid
    }
    console.log(obj);
    $.ajax({
        type: "POST",
        url: BASE_URL + "/fetch_blogs",
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json",
        success: function(response) {
            if (response.hasOwnProperty("error")) {
                alert(response.error)
            } else {
                console.log(response.list_blogs)
                blogs = response["list_blogs"]

                blogs.forEach(element => {
                    $('.fetchblog').append(`
                            <div class="p-4 lg:w-1/4 ">
                            <div class="h-full bg-white rounded-xl shadow-md bg-opacity-75 px-8 pt-16 pb-24 overflow-hidden text-center relative border-2 hover:shadow-xl hover:border-purple-200 ">
                                <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3 ">${element["title"]}</h1>
                                <input type="hidden" id="blogid" value="${element["id"]}"> 
                                <p class="leading-relaxed mb-3 line-3">${element["content"]}</p>
                                <a class="text-indigo-500 inline-flex items-center cursor-pointer"  onclick=sendId("${element["id"]}") >Learn More
                                    <svg class="w-4 h-4 ml-2 " viewBox="0 0 24 24 " stroke="currentColor " stroke-width="2 " fill="none " stroke-linecap="round " stroke-linejoin="round ">
                                        <path d="M5 12h14 "></path>
                                        <path d="M12 5l7 7-7 7 "></path>
                                    </svg>
                                        </a>
                                <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4 ">
                                    <span class="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200 ">
                                            <img src="../static/like.svg " class="mr-2 h-6 w-4 cursor-pointer ">${element["like_count"]}
                            </span>
                                    <span class="text-gray-400 inline-flex items-center leading-none text-sm ">
                                <svg class="w-4 h-4 mr-1 " stroke="currentColor " stroke-width="2 " fill="none " stroke-linecap="round " stroke-linejoin="round " viewBox="0 0 24 24 ">
                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z "></path>
                                </svg>6
                            </span>
                                </div>
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
    fetchblogs(user_id);
});

function sendId(id) {
    window.location = "viewBlogs.html?blog=" + id;
}