/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//===========================classes===========================
//Item class
Item = function(x, y, z, color) {
    this.defx = x;
    this.zLimit = -11;
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 1.9, 1, 1), new THREE.MeshPhongMaterial( {
        color: color , ambient: 0xffffff,
        specular: 0xcccccc, shininess:2, metal: true, side: THREE.DoubleSide
    } ) );
    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;
    this.mesh.rotation.x = 3.1415/2;
    this.mesh.castShadow = true;
    
};

Item.prototype.move = function(direction, delta) {
    if(direction === 0) {
        this.mesh.position.x += delta;
    } else if(direction === 1) {
        this.mesh.position.y += delta;
    } else if(direction === 2) {
        this.mesh.position.z += delta;
    }
    this.checkPos();
};

Item.prototype.checkPos = function() {
    if(this.zLimit < 0 && this.mesh.position.z < this.zLimit || this.zLimit > 0 && this.mesh.position.z > this.zLimit) {
        this.mesh.position.z = 11;
    }
};

Vector3 = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
};
Vector3.prototype.getX = function() {
    return this.x;
};
Vector3.prototype.getY = function() {
    return this.y;
};
Vector3.prototype.getZ = function() {
    return this.z;
};
Vector3.prototype.set = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
};
Vector3.prototype.getAsThreeVec = function() {
    var v = new THREE.Vector3(this.x, this.y, this.z);
    return v;
};

setContents();

//scene
var scene = new THREE.Scene();


//===========================camera===========================
var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 500 );
camera.position.set(3, 1.5, 5);
var cameraLookAt = new Vector3(1.2, -2, 0.1);
camera.lookAt(cameraLookAt.getAsThreeVec());


//===========================renderer===========================
var renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setClearColor( new THREE.Color(0xffffff) );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMapType = THREE.PCFShadowMap;
document.body.appendChild( renderer.domElement );


//===========================lights===========================
//pointLight
/*
var pointLight = new THREE.PointLight(0xffffff,2.0,0);
pointLight.position.set(0, 1, 1);
pointLight.castShadow = true;
pointLight.shadowMapWidth = 1024;
pointLight.shadowMapHeight = 1024;
scene.add(pointLight);
*/

var directionalLight = new THREE.DirectionalLight (0x888888, 1);
directionalLight.position.set(0, 2, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.top = 12;
directionalLight.shadow.camera.bottom = -6;
directionalLight.shadow.camera.left = -12;
directionalLight.shadow.camera.right = 10;
directionalLight.shadowMapWidth = 1024;
directionalLight.shadowMapHeight = 1024;
scene.add(directionalLight);

//ambient
var ambientLight = new THREE.AmbientLight(0x666666);
scene.add(ambientLight);


//===========================setObjects===========================
var centerCube = new THREE.Mesh( new THREE.CubeGeometry(0.1, 0.1, 0.1), new THREE.MeshPhongMaterial( {
    color: 0x00ff00 , ambient: 0xffffff,
    specular: 0xcccccc, shininess:50, metal: true
} ) );
centerCube.position.set(-9, 0, 0);
centerCube.castShadow = true;
scene.add( centerCube );
//backPlane
var backPlane = new THREE.Mesh( new THREE.PlaneGeometry(20, 20, 1, 1), new THREE.MeshPhongMaterial( {
    color: 0xffffff, ambient: 0xffffff,
    specular: 0xcccccc, shininess:5, metal: true
} ) );
backPlane.position.set(0, 0, 0);
backPlane.rotation.x = -3.1415926535/2;
backPlane.receiveShadow = true;
scene.add(backPlane);

//items
var colors = ['#A59FC9', '#A6D3CE', '#A6BC8A', '#D3C2A1', '#C99E9F', 'dddddd'];
var items = new Array();
for(var i = 0; i < 9; i++) {
    items[i] = new Array();
    for(var j = 0; j < 11; j++) {
        items[i][j] = new Item(2*(i-4), 0.02, 2*(j-5), colors[parseInt(Math.random()*colors.length)]);
        scene.add(items[i][j].mesh);
    }
}


//fps
var fpsCount = 0;
var fpsTime = 0.0;
var deltaTime = 0.0;
var pastDate = new Date();

//cameraMoveFromMouse
var cameraMoveX = 0.0;
var cameraMoveY = 0.0;
var mouseXRatio = 0.0;
var mouseYRatio = 0.0;

//lookAt moving triggers
var movingLookAtTrigger = false;
var lookAtDirect = new Vector3(0, 0, 0);

//camera moving triggers
var movingCameraTrigger = false;
var movingCameraDirect = new Vector3(0, 0, 0);

//camera fog moving triggers
var movingCFogTrigger = false;
var movingCFogDirect = camera.fog;


function render() {
    calcFps();
    requestAnimationFrame( render );
    renderer.render( scene, camera );
    
    //centerCube.rotation.y += 0.01;
    
    for(var i = 0; i < items.length; i++) {
        for(var j = 0; j < items[i].length; j++) {
            items[i][j].move(2, deltaTime*-1);
        }
    }
    
    //-----------cameraMove-----------
    //mouse move method
    var cameraX = camera.position.x;
    var cameraXDiff = mouseXRatio/20 - cameraMoveX;
    cameraMoveX += cameraXDiff*0.1;
    cameraX += cameraXDiff;
    camera.position.x = cameraX;
    var cameraY = camera.position.y;
    var cameraYDiff = mouseYRatio/40 - cameraMoveY;
    cameraMoveY += cameraYDiff*0.1;
    cameraY += cameraYDiff;
    camera.position.y = cameraY;
    
    //moving lookAt process
    if(movingLookAtTrigger) {
        var nextX = (cameraLookAt.x + lookAtDirect.x)/2;
        var nextY = (cameraLookAt.y + lookAtDirect.y)/2;
        var nextZ = (cameraLookAt.z + lookAtDirect.z)/2;
        cameraLookAt.set(nextX, nextY, nextZ);
        camera.lookAt(cameraLookAt.getAsThreeVec());
        //console.log("cameraDiff : " + abs(cameraLookAt.x-lookAtDirect.x) + ", " + abs(cameraLookAt.y-lookAtDirect.y) + ", " + abs(cameraLookAt.z-lookAtDirect.z));
        if(abs(cameraLookAt.x-lookAtDirect.x) < 0.01 && abs(cameraLookAt.y-lookAtDirect.y) < 0.01 && abs(cameraLookAt.z-lookAtDirect.z) < 0.01) {
            movingLookAtTrigger = false;
        }
    }
    
    //moving camera process
    if(movingCameraTrigger) {
        var nextX = (camera.position.x + movingCameraDirect.x)/2;
        var nextY = (camera.position.y + movingCameraDirect.y)/2;
        var nextZ = (camera.position.z + movingCameraDirect.z)/2;
        camera.position.x = nextX;
        camera.position.y = nextY;
        camera.position.z = nextZ;
        //console.log("cameraDiff: " + abs(camera.position.x - movingCameraDirect.x) + ", " + abs(camera.position.y - movingCameraDirect.y) + ", " + abs(camera.position.z - movingCameraDirect.z) + ", pos: " + camera.position.x + ", " + camera.position.y + ", " + camera.position.z);
        if(abs(camera.position.x - movingCameraDirect.x) < 0.01 && abs(camera.position.y - movingCameraDirect.y) < 0.01 && abs(camera.position.z - movingCameraDirect.z) < 0.01) {
            movingCameraTrigger = false;
        }
    }
    
}

function calcFps() {
    fpsCount++;
    var nowDate = new Date();
    deltaTime = (nowDate - pastDate)/1000.0;
    fpsTime += deltaTime;
    if(fpsTime >= 0.5) {
        document.getElementById("showFPS").innerHTML = (fpsCount*2) + " fps";
        /*
        var fpsBar = ":";
        for(var i = 0; i < fpsCount; i++)
            fpsBar = fpsBar + "|";
        var inner = document.getElementById("fpsBar").innerHTML;
        document.getElementById("fpsBar").innerHTML = fpsBar + "<br>" + inner;
        */
        fpsTime = 0.0;
        fpsCount = 0;
    }
    pastDate = nowDate;
    
}

function setContents() {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    document.getElementById("menu01").style.left = windowWidth - 150 + "px";
    document.getElementById("menu02").style.left = windowWidth - 250 + "px";
    document.getElementById("menu03").style.left = windowWidth - 350 + "px";
    
    //title_imgae
    document.getElementById("title_image").style.left = windowWidth/2 - 250 + "px";
    document.getElementById("title_image").style.top = windowHeight/2 - 100 + "px";
    
    //title
    document.getElementById("title").style.left = windowWidth/2 - 228 + "px";
    document.getElementById("title").style.top = windowHeight/2 + "px";
    
    //camera.lookAt.x += 0.1;
}

render();

window.onresize = function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    setContents();
};

document.onmousemove = function(e) {
    var mouseX = e.clientX;
    var xRatio = (window.innerWidth/2 - mouseX)/(window.innerWidth/2);
    var mouseY = e.clientY;
    var yRatio = (window.innerHeight/2 - mouseY)/(window.innerHeight/2);
    mouseXRatio = -xRatio;
    mouseYRatio = yRatio;
    //console.log(xRatio + " - " + YRatio);
};

function cameraMove_lookAt(point) {
    if(point === 1) {
        lookAtDirect = new Vector3(-5, 1, 0);
       movingLookAtTrigger = true;
        
        movingCameraDirect = new Vector3(15, 2, 0);
        movingCameraTrigger = true;
        
        camera.fov = 20;
        camera.updateProjectionMatrix();
    } else if(point === 2) {
        lookAtDirect = new Vector3(0, -3, 0);
        movingLookAtTrigger = true;
        
        movingCameraDirect = new Vector3(-3, 7, 3);
        movingCameraTrigger = true;
        camera.rotation.x = 0;
        camera.rotation.y = 0;
        camera.rotation.z = 0;
        camera.fov = 50;
        camera.updateProjectionMatrix();
    } else if(point === 3) {
        lookAtDirect = new Vector3(1.2, -2, 0.1);
        movingLookAtTrigger = true;
        
        movingCameraDirect = new Vector3(3, 1.5, 5);
        movingCameraTrigger = true;
        camera.fov = 50;
        camera.updateProjectionMatrix();
    }
    
}


function clickWork() {
    cameraMove_lookAt(1);
}

function clickAbout() {
    cameraMove_lookAt(2);
}

function clickTop() {
    cameraMove_lookAt(3);
}

function abs(value) {
    return value<0 ? -1*value : value;
}