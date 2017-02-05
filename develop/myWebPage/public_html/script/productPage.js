/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


window.onload = function() {
    setSize();
};

window.onresize = function() {
    setSize();
};

function setSize() {
    windowWidth = window.innerWidth;
    document.getElementById('youtube').style.width = windowWidth*0.89 + "px";
    document.getElementById('youtube').style.height = windowWidth*0.89*9/16 + "px";
}