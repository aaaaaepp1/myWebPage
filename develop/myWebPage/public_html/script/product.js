/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global PageMode, PAGE_MODE, showProductDiscription */

var product_imgs = [];
var widthContentNum = 1;

onload = function() {
    product_init();
};

ProductImg = function(addr, discription, year) {
    this.imgAddr = addr;
    this.discription = discription;
    this.year = year;
};
ProductImg.prototype.getAddr = function() {
    return this.imgAddr;
};
ProductImg.prototype.getDiscription = function() {
    return this.discription;
};
ProductImg.prototype.getYear = function() {
    return this.year;
};
ProductImg.prototype.updatePosition = function() {
    
};

function product_init() {
    var imgList = [
        "cgimgs.png",
        "escapevr.png",
        "macbookair2016.jpg",
        "cacpromotionvideo.png"
    ];
    
    var imgDiscription = [
        
        "3DCG Images",
        "EscapeVR",
        "MacBookAir",
        "C.A.C. PV"
    ];
    
    var imgYear = [
        2017,
        2016,
        2016,
        2016
    ];
    
    for(var i = 0; i < imgList.length; i++) {
        product_imgs.push(new ProductImg(imgList[i], imgDiscription[i], imgYear[i]));
    }
    product_showImgs();
    product_calcImg(); // calc width size of each imgae
    product_readjustment();
}

//display the imgs
function product_showImgs() {
    
    var tmp_i = [];
    
    var i = 0
    
    for(i = 0; i < product_imgs.length; i++) {
        var each = product_imgs[i];
//        var img = document.createElement('img');
//        img.src = 'img/productImgs/' + each.getAddr();
//        img.id = "product_contentsImg";
//        img.addEventListener('click',  function(){alert(i);});
        var discriptionPageUri = "html/product/" + each.getAddr() + ".html";
        var img = '<img onclick="showProductDiscription(true, \'html/product/' + each.getAddr() + '.html\');" src="img/productImgs/' + each.getAddr() + '" id="product_contentsImg">';
        
        var discriptionBack = document.createElement('div');
        discriptionBack.id = "product_contentsDiscription";
        //discriptionBack.appendChild(img);
        discriptionBack.innerHTML = img;
        //discriptionBack[i].addEventListener('click',  function(){showProductDiscription(true, discriptionPageUri);});
        tmp_i.push(i);
        console.log(discriptionPageUri + ", i: " + tmp_i[i]);
        //discriptionBack.addEventListener('click',  function(){alert(i);});
        
        
        var discription = document.createElement('h4');
        discription.innerHTML = each.getDiscription();
        discriptionBack.appendChild(discription);
        
        var year = document.createElement('h5');
        year.innerHTML = each.getYear();
        discriptionBack.appendChild(year);
        
        document.getElementById("product_contents").appendChild(discriptionBack);
        
    }
    console.log(i);
}

function product_readjustment() {
    if(PageMode === PAGE_MODE.PC_NORMAL) {
        var productContens = document.getElementById("product_contents");
        productContens.style.width = (window.innerWidth/2 + 150) + "px";
        productContens.style.height = (window.innerHeight - 210) + "px";
    }
}

//calc the size of moment of width (when web resized)
function product_calcImg() {
}



