function post() {
    let comment = $("#textarea-post").val()
    let today = new Date().toISOString()
    $.ajax({
        type: "POST",
        url: "/posting",
        data: {
            comment_give: comment,
            date_give: today
        },
        success: function (response) {
            $("#modal-post").removeClass("is-active")
            window.location.reload()
        }
    })
}

function time2str(date) {
    let today = new Date();
    let time = (today - date) / 1000 / 60;
    if (time < 60) {
        return parseInt(time) + " minutes ago ";
    }
    time = time / 60;
    if (time < 24) {
        return parseInt(time) + " hours ago";
    }
    time = time / 24;
    if (time < 7) {
        return parseInt(time) + " days ago";
    }
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
}

function num2str(count) {
    if (count > 10000) {
        return parseInt(count / 1000) + "k"
    }
    if (count > 500) {
        return parseInt(count / 100) / 10 + "k"
    }
    if (count == 0) {
        return ""
    }
    return count
}

function num2str(count) {
    if (count > 10000) {
        return parseInt(count / 1000) + "k"
    }
    if (count > 500) {
        return parseInt(count / 100) / 10 + "k"
    }
    if (count == 0) {
        return ""
    }
    return count
}

function num2str(count) {
    if (count > 10000) {
        return parseInt(count / 1000) + "k"
    }
    if (count > 500) {
        return parseInt(count / 100) / 10 + "k"
    }
    if (count == 0) {
        return ""
    }
    return count
}


function get_posts(username) {
    if (username === undefined){
        username = '';
    }
    $("#post-box").empty();
    $.ajax({
        type: "GET",
        url: `/get_posts?username_give=${username}`,
        data: {},
        success: function (response) {
            if (response["result"] === "success") {
                let posts = response["posts"];
                for (let i = 0; i < posts.length; i++) {
                    let post = posts[i];
                    let time_post = new Date(post["date"]);
                    let time_before = time2str(time_post)
                    let class_heart = post['heart_by_me'] ? "fa-heart" : "fa-heart-o"
                    let class_star = post['star_by_me'] ? 'fa-star' : 'fa-star-o'
                    let class_thumbs = post['thumbs_by_me'] ? 'fa-thumbs-up' : 'fa-thumbs-o-up'
                    let html_temp = `
              <div class="box" id="${post["_id"]}">
                <article class="media">
                  <div class="media-left">
                    <a class="image is-64x64" href="/user/${post["username"]}">
                       <img class="is-rounded" src="/static/${post["profile_pic_real"]}"alt="Image">
                    </a>
                                          </div>
                                          <div class="media-content">
                                              <div class="content">
                                                  <p>
                                                      <strong>${post["profile_name"]}</strong> <small>@${post["username"]}</small> <small>${time_before}</small>
                                                      <br>
                                                      ${post["comment"]}
                                                  </p>
                                              </div>
                                              <nav class="level is-mobile">
                                                  <div class="level-left">
                                                      <a class="level-item is-sparta" aria-label="heart" onclick="toggle_like('${post["_id"]}', 'heart')">
                                                          <span class="icon is-small"><i class="fa ${class_heart}"
                                                           aria-hidden="true"></i></span>&nbsp;<span class="like-num">${num2str(post['count_heart'])}</span>
                                                      </a>
                                                    <a class="level-item is-sparta" aria-label="star" onclick="toggle_star('${post["_id"]}', 'star')">
                                                        <span class="icon is-small"><i class=" fa ${class_star}" aria-hidden="true"></i></span>&nbsp;<span
                                                         class="like-num">${num2str(post['count_star'])}</span>
                                                    </a>
                                                    <a class="level-item is-sparta" aria-label="thumbs-up" onclick="toggle_thumbs('${post["_id"]}', 'thumbs-up')">
                                                        <span class="icon is-small"><i class=" fa ${class_thumbs}" aria-hidden="true"></i></span>&nbsp;<span
                                                         class="like-num">${num2str(post['count_thumbs'])}</span>
                                                    </a>
                                                </div>
                                                </nav>
                                          </div>
                                      </article>
                                  </div>`;
                    $("#post-box").append(html_temp);
                }
            }
        },
    });
}

function toggle_like(post_id, type) {
    console.log(post_id, type);
    let $a_like = $(`#${post_id} a[aria-label='heart']`);
    let $i_like = $a_like.find("i");
    if ($i_like.hasClass("fa-heart")) {
        $.ajax({
            type: "POST",
            url: "/update_like",
            data: {
                post_id_give: post_id,
                type_give: type,
                action_give: "unlike",
            },
            success: function (response) {
                console.log("unlike");
                $i_like.addClass("fa-heart-o").removeClass("fa-heart");
                $a_like.find("span.like-num").text(num2str(response["count"]));
            },
        })
    } else {
        $.ajax({
            type: "POST",
            url: "/update_like",
            data: {
                post_id_give: post_id,
                type_give: type,
                action_give: "like",
            },
            success: function (response) {
                $i_like.addClass("fa-heart").removeClass("fa-heart-o");
                $a_like.find("span.like-num").text(num2str(response["count"]));
            },
        })
    }
}

function toggle_star(post_id, type) {
    console.log(post_id, type);
    let $a_star = $(`#${post_id} a[aria-label='star']`);
    let $i_star = $a_star.find("i");
    if ($i_star.hasClass("fa-star")) {
        $.ajax({
            type: "POST",
            url: "/update_star",
            data: {
                post_id_give: post_id,
                type_give: type,
                action_give: "unstar",
            },
            success: function (response) {
                console.log("unstar");
                $i_star.addClass("fa-star-o").removeClass("fa-star");
                $a_star.find("span.like-num").text(num2str(response["count"]));
            },
        })
    } else {
        $.ajax({
            type: "POST",
            url: "/update_star",
            data: {
                post_id_give: post_id,
                type_give: type,
                action_give: "star",
            },
            success: function (response) {
                $i_star.addClass("fa-star").removeClass("fa-star-o");
                $a_star.find("span.like-num").text(num2str(response["count"]));
            },
        })
    }
}

function toggle_thumbs(post_id, type) {
    console.log(post_id, type);
    let $a_thumbs = $(`#${post_id} a[aria-label='thumbs-up']`);
    let $i_thumbs = $a_thumbs.find("i");
    if ($i_thumbs.hasClass("fa-thumbs-up")) {
        $.ajax({
            type: "POST",
            url: "/update_thumbs",
            data: {
                post_id_give: post_id,
                type_give: type,
                action_give: "unthumbs-up",
            },
            success: function (response) {
                console.log("unthumbs-up");
                $i_thumbs.addClass("fa-thumbs-o-up").removeClass("fa-thumbs-up");
                $a_thumbs.find("span.like-num").text(num2str(response["count"]));
            },
        })
    } else {
        $.ajax({
            type: "POST",
            url: "/update_thumbs",
            data: {
                post_id_give: post_id,
                type_give: type,
                action_give: "thumbs-up",
            },
            success: function (response) {
                $i_thumbs.addClass("fa-thumbs-up").removeClass("fa-thumbs-o-up");
                $a_thumbs.find("span.like-num").text(num2str(response["count"]));
            },
        })
    }
}