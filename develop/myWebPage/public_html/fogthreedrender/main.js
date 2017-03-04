/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.onresize = function() {
    fix();
};

window.onload = function() {
    fix();
};

window.onscroll = function() {
    fix();
};

function fix() {
    main_footer_image_fix();
    main_footer_title_fix();
    main_footer_sub_title_fix();
}

function main_footer_image_fix() {
    document.getElementById("main_footer_imgae").style.top = window.pageYOffset/2 + "px";
}

function main_footer_title_fix() {
    var main_footer_title = document.getElementById("main_footer_title");
    var main_footer_title_top = window.innerHeight/2-50;
    main_footer_title.style.top = main_footer_title_top + "px";
}

function main_footer_sub_title_fix() {
    var main_footer_sub_title = document.getElementById("main_footer_sub_title");
    var main_footer_sub_title_top = window.innerHeight/2-67;
    main_footer_sub_title.style.top = main_footer_sub_title_top + "px";
}

function main_menu_hover(bool) {
    main_menu_add_shadow(bool);
}

function main_menu_onclick() {
    alert("clicked main menu");
}

function main_menu_add_shadow(bool) {
    var divs = document.getElementsByClassName("main_menu_logo");
    var divs_each = divs[0];
    for(var i = 0; i < divs.length; i++) {
        divs_each = divs[i];
        if(bool) divs_each.style.boxShadow = "1px 2px 3px rgba(0,0,0,0.9)";
        else divs_each.style.boxShadow = "0px 1px 1px rgba(0,0,0,0.7)";
    }
}

function main_menu_move(bool) {
    $("#main_menu_box").stop();
    
    var left_position = "";
    if(bool) {
        var left_position = "70%";
    } else {
        var left_position = "100%";
    }
    
    $("#main_menu_box").animate({
        left: left_position
    }, 500, 'easeOutBounce');
    
    
}