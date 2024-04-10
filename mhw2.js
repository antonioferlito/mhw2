function onMouseOverX(event){
    const icon_x = event.currentTarget;
    icon_x.classList.remove("icon_x");
    icon_x.classList.add("blue_icon_x");
}

function onMouseOutX(event){
    const icon_x = event.currentTarget;
    icon_x.classList.remove("blue_icon_x");
    icon_x.classList.add("icon_x");
}

function onClickYes(event) {
    const button = event.currentTarget;
    button.closest(".streak_feed_box").remove();
}

function onClickNo(event) {
    const button = event.currentTarget;
    button.closest(".little_box").remove();
}

function onClickX(event){
    const x_icon = event.currentTarget;
    const streak_feed = x_icon.closest(".streak_feed");

    if(!document.querySelector(".little_box")){
        const little_box = document.createElement("div");
        little_box.classList.add("little_box");
        const text = document.createElement("p");
        text.classList.add("little_box_text_style");
        text.textContent = "Sei sicuro di voler eliminare questa voce?";
        const sub_box = document.createElement("div");
        sub_box.classList.add("sub_box")
        const button_1 = document.createElement("button");
        button_1.textContent = "Si";
        const button_2 = document.createElement("button");
        button_2.textContent = "No";
        button_1.classList.add("little_box_button");
        button_2.classList.add("little_box_button");
        button_1.classList.add("little_box_button_1");
        button_2.classList.add("little_box_button_2");

        streak_feed.appendChild(little_box);
        little_box.appendChild(text);
        little_box.appendChild(sub_box);
        sub_box.appendChild(button_1);
        sub_box.appendChild(button_2);
        
        button_1.addEventListener("click", onClickYes);
        button_2.addEventListener("click", onClickNo);
    }else{
        document.querySelector(".little_box").remove();
    }
}

const x_icon_list = document.querySelectorAll(".close_feed");
for(let x_icon of x_icon_list){
    x_icon.addEventListener("click", onClickX);
    x_icon.addEventListener("mouseover", onMouseOverX);
    x_icon.addEventListener("mouseout", onMouseOutX);
}

function littleBoxDeactive(){ 
    const little_box = document.querySelector(".little_box");
    const icon_x_list = document.querySelectorAll(".close_feed"); 
    
    let flag = 0;
    for(let icon_x of icon_x_list){
        if(icon_x.classList.contains("blue_icon_x")){
            flag = 1;
        }
    }

    if(little_box && flag == 0){
        little_box.remove();
    }
}

const body = document.querySelector("body");
body.addEventListener("click", littleBoxDeactive);

function onClickLike(event) {
    const like_button = event.currentTarget;
    const like_thumb = like_button.querySelector("div");
    const like_text = like_button.querySelector("span");
    if(!like_thumb.classList.contains("like_pressed")){
        like_thumb.classList.add("like_pressed");
        like_thumb.classList.remove("like");
        like_text.innerHTML = '';
        like_text.textContent = "Non mi piace più";
        like_text.classList.add("like_pressed_text");
        const middle_feed = document.createElement("div");
        middle_feed.classList.add("middle_feed_style");
        middle_feed.textContent = "Ti piace";
        middle_feed.classList.add("middle_feed_text");
        const top_feed = like_button.closest(".top_feed");
        const bottom_feed = top_feed.nextSibling;
        const container_feed = top_feed.parentNode;
        container_feed.insertBefore(middle_feed, bottom_feed);
    }else{
        like_thumb.classList.add("like");
        like_thumb.classList.remove("like_pressed");
        like_text.innerHTML = '';
        like_text.textContent = "Mi piace";
        like_text.classList.remove("like_pressed_text");
        const top_feed = like_button.closest(".top_feed");
        const middle_feed = top_feed.nextSibling;
        middle_feed.remove();
    }
}

const like_button_list = document.querySelectorAll(".like_box");
for(let like_button of like_button_list){
    like_button.addEventListener("click", onClickLike);
}

function onClickComment(event){
    const comment_button = event.currentTarget;
    const feed = comment_button.closest(".feed");
    const textArea = feed.querySelector("textarea");
    textArea.focus();
}

const comment_button_list = document.querySelectorAll(".comment_box");
for(let comment_button of comment_button_list){
    comment_button.addEventListener("click", onClickComment);
}

    let feed_list = document.querySelectorAll(".streak_feed_box");
    let feed = feed_list[feed_list.length-1];

function onClickLoadMore(event){
    const load_more_button = event.currentTarget; 
    cloneFeed = feed.cloneNode(true);
    cloneFeed.querySelector(".like_box").addEventListener("click", onClickLike);
    cloneFeed.querySelector(".comment_box").addEventListener("click", onClickComment);
    const x_icon = cloneFeed.querySelector(".icon_x");
    x_icon.addEventListener("click", onClickX);
    x_icon.addEventListener("mouseover", onMouseOverX);
    x_icon.addEventListener("mouseout", onMouseOutX);

    let days = cloneFeed.querySelector(".center span");
    let int_days = parseInt(days.textContent);
    let new_int_days = int_days-5;
    if(new_int_days>0){
        let new_days = new_int_days.toString();
        days.innerHTML='';
        days.textContent = new_days;

        days = cloneFeed.querySelector(".days");
        int_days = parseInt(days.textContent);
        new_int_days = int_days+5;
        new_days = new_int_days.toString();
        days.innerHTML='';
        days.textContent = new_days;
        
        const feed_container = document.querySelector(".streak_feed_container");
        feed_container.appendChild(cloneFeed);
        feed_list = document.querySelectorAll(".streak_feed_box");
        feed = feed_list[feed_list.length-1];
    }
}

const load_more_button = document.querySelector(".load_more button");
load_more_button.addEventListener("click", onClickLoadMore)

function onMouseOverProgressBar(event){
    const box = document.querySelector(".right_info_box");

    if(!document.querySelector(".cloud_container")){
        const cloud_container = document.createElement("div");
        const green_cloud = document.createElement("div");
        const triangle_up = document.createElement("div");
        green_cloud.classList.add("green_cloud");
        triangle_up.classList.add("triangle_up");
        cloud_container.classList.add("cloud_container");
        cloud_container.appendChild(triangle_up);
        cloud_container.appendChild(green_cloud);
        box.appendChild(cloud_container);
        
        const calories_value = document.querySelector(".calories_value");
        green_cloud.textContent  = "Rimanenti: " + calories_value.textContent;
       
        const counter_tag = document.querySelector(".counter_tag_no_flex");
        counter_tag.classList.add("hidden");
    }

    const cloud_container = document.querySelector(".cloud_container");
    const progress_bar = document.querySelector(".progress_bar");
    let rect = progress_bar.getBoundingClientRect();
    let x_offset = rect.x;
    let x = event.clientX;
    cloud_container.style.left = x - x_offset - 56 + 'px';
}

function onMouseOutProgressBar(){
    const counter_tag = document.querySelector(".counter_tag_no_flex");
    counter_tag.classList.remove("hidden");
    const cloud_container = document.querySelector(".cloud_container");
    cloud_container.remove();
}

const progress_bar = document.querySelector(".progress_bar");
progress_bar.addEventListener("mousemove", onMouseOverProgressBar);
progress_bar.addEventListener("mouseout", onMouseOutProgressBar);

function onClickNavX(event){
    const x_icon = event.currentTarget;
    x_icon.classList.add("hidden");
    const menu = document.querySelector("#menu");
    menu.classList.remove("hidden");
    const vertical_nav = document.querySelector(".vertical_nav_bar_no_flex");
    vertical_nav.classList.add("hidden");
    const article = document.querySelector("article");
    article.classList.remove("hidden");
    const footer = document.querySelector("footer");
    footer.classList.remove("hidden");
    const sub_items_list = document.querySelectorAll(".sub_items_no_flex");
    for(let sub_item of sub_items_list){
        const vertical_item = sub_item.closest(".vertical_item");
        console.log(vertical_item.dataset.nav);
        if(!sub_item.classList.contains("hidden") && vertical_item.dataset.nav!='1'){
            sub_item.classList.add("hidden");
            const vertical_item = sub_item.closest(".vertical_item");
            const top_item = vertical_item.querySelector(".top_item");
            top_item.classList.remove("sub_style");
            const first_item = document.querySelector(".sub_items_no_flex");
            first_item.classList.remove("hidden");
        }
    }
}

function clickOnMenu(event) {
    const menu = event.currentTarget;
    menu.classList.add("hidden");
    const x_icon = document.querySelector("#x_nav_icon");
    x_icon.classList.remove("hidden");
    x_icon.classList.add("x_nav_style");
    x_icon.addEventListener("click", onClickNavX);
    const vertical_nav = document.querySelector(".vertical_nav_bar_no_flex");
    vertical_nav.classList.remove("hidden");
    const article = document.querySelector("article");
    article.classList.add("hidden");
    const footer = document.querySelector("footer");
    footer.classList.add("hidden");
}

const menu = document.querySelector("#menu");
menu.addEventListener("click", clickOnMenu);

function onClickTopItem(event){
    const sub_items_list = document.querySelectorAll(".sub_items_no_flex");
    for(let sub_item of sub_items_list){
        if(!sub_item.classList.contains("hidden")){
            sub_item.classList.add("hidden");
            const vertical_item = sub_item.closest(".vertical_item");
            const top_item = vertical_item.querySelector(".top_item");
            top_item.classList.remove("sub_style");
        }
    }

    top_item = event.currentTarget;
    const vertical_item = top_item.closest(".vertical_item");
    const sub_items = vertical_item.querySelector(".sub_items_no_flex");
    sub_items.classList.remove("hidden");
    top_item.classList.add("sub_style");
    
}

const top_item_list = document.querySelectorAll(".top_item");
for(let top_item of top_item_list){
    top_item.addEventListener("click", onClickTopItem);
}