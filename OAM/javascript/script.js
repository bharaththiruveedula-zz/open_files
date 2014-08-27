function GetElementInsideContainer(containerID, childID) {
    var elm = document.getElementById(childID);
    var parent = elm ? elm.parentNode : {};
    return (parent.id && parent.id === containerID) ? elm : {};
}

document.addEventListener('DOMContentLoaded',domloaded,false);
var canvas;
var ctx;
var image;
var clicks = 0;
var lastClick = [0,0];
var TowerData = new Array();
var cellArray =  new Array();
var afterDup = new Array();
var adjList = {};
function domloaded(){
   e = GetElementInsideContainer("display", "myCanvas");
   canvas = document.getElementById("myCanvas");
   ctx = canvas.getContext("2d");
   image = document.getElementById("scream");
   $('#scream').hide();
   $('#gray').hide();
   load();
}

function make_base(array){
   var img  = new Image();
   var img2 = new Image();
   img.src = "images/tower.jpg";
   img2.src = "images/tower-gary.jpg";
   img.onload = function(){
	 for(var i = 0; i< array.length; i++){
		 ctx.drawImage(img,array[i].x,array[i].y,30,30);
		 var text = array[i].cell_id;
		 ctx.fillText(text,array[i].x+15,array[i].y+40);
	 } 
   };
  img2.onload = function(){
     ctx.drawImage(img2,250,200,30,30);
     //ctx.drawImage(img2,100,350,30,30);
 };  
}

function getPosition(event)
{
    var x = event.x;
    var y = event.y;
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

}

function getCursorPosition(e) {
    var x;
    var y;

    if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
    } else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return [x, y];
}

function drawLine(e) {
    context = this.getContext('2d');

    x = getCursorPosition(e)[0] - this.offsetLeft;
    y = getCursorPosition(e)[1] - this.offsetTop;

    if (clicks != 1) {
        clicks++;
    } else {
        context.beginPath();
        context.moveTo(lastClick[0], lastClick[1]);
        context.lineTo(x, y, 6);
        context.strokeStyle = '#FF0000';
        context.stroke();
        clicks = 0;
    }

    lastClick = [x, y];
};
function load(){
$.ajax({
    url:'anr_data.jsp',
    cache:false,
    success:function(data,status){
    	var enode = eval("("+ data +")");
    /*for(var i = 0; i< anr.anrs.length; i++){   
    	$('#anr_tbody').append("<tr>");
    	$('#anr_tbody').append("<td id='anr'>"+anr.anrs[i].local_cell_id+"</td>");
    	$('#anr_tbody').append("<td id='anr'>"+anr.anrs[i].target_cell_id+"</td>");
    	$('#anr_tbody').append("</tr>");
    	//$('#anr_tbody').append("<tr><td>"+anr.anrs[i].local_cell_id+"</td><td>"+anr.anrs[i].target_cell_id+"</td></tr>");
     }  
    creategraph(anr);
    //console.log(cellArray.length);
    //make_base(anr);
    prepareAdjList(anr,afterDup);*/
      var listFromDB =  new Array();
      for(var i = 0; i<enode.enodeb.length; i++){
    	  listFromDB.push(enode.enodeb[i].alarm);
      }
      //alert(listFromDB);
    },
    error:function(){
    	 alert("failed to fetch data");
    }
});
	//var anr = {"anrs":[{"local_cell_id":"a","target_cell_id":"b"},{"local_cell_id":"a","target_cell_id":"c"},{"local_cell_id":"a","target_cell_id":"d"},{"local_cell_id":"b","target_cell_id":"d"}]};
	//creategraph(anr);
	//prepareAdjList(anr,afterDup);
	//prepareAdjmatrix(afterDup,anr);
}
	
function cell(cell_id,x,y){
	this.cell_id = cell_id;
	this.x = x;
	this.y = y;
}
function creategraph(anr){
	var index = 0;
	//alert(anr.anrs.length);
	for(var k = 0;k< anr.anrs.length; k++){
		var local_x = getRandomInt(0,canvas.width-30);
		//alert(local_x);
		var local_y = getRandomInt(0,canvas.height-30);
		//alert(local_y);
		var local_id = anr.anrs[k].local_cell_id;
		//alert(local_id);
		var cell_local =  new cell(local_id,local_x,local_y);
		cellArray[index] = cell_local;
		//alert(cellArray.length+"  "+index);	afterDup = removeDupIds(cellArray);
		index = index + 1;
		var target_x = getRandomInt(0,canvas.width-30);
		var target_y = getRandomInt(0,canvas.height-30);
		//alert(target_y);
		var target_id = anr.anrs[k].target_cell_id;
		var cell_target = new cell(target_id,target_x,target_y);
		cellArray[index] = cell_target;
		index = index + 1;
	 }	
	afterDup = removeDupIds(cellArray);
	//alert("after removing duplicates total unique elements would be "+afterDup.length);
   // make_base(afterDup);
   // draw_lines(anr,afterDup);
 }
function getRandomInt (min,max){
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

function removeDupIds(array) {
    var list = {}, id;
    for (var i = 0; i < array.length; i++) {
        id = array[i].cell_id;
        if (id in list) {
            array.splice(i, 1);
            --i;
        } else {
            list[id] = true;
        }
    }
   return array;
}
function draw_lines(anr,array){	
	 for(var i = 0; i<anr.anrs.length ; i++){
	   for(var j = 0; j< array.length; j++){
		   if(anr.anrs[i].local_cell_id == array[j].cell_id){
			  ctx.beginPath();
			  ctx.moveTo(array[j].x,array[j].y);
			  for(var k = 0; k <array.length; k++){
				if(anr.anrs[i].target_cell_id == array[k].cell_id){
					ctx.lineTo(array[k].x,array[k].y);
					ctx.stroke();
				} 
			  }  
		   }
	   }	
	}
}


function prepareAdjmatrix(array,anr){
	 var adjMatrix = new Array();
	 var i ,j, k;
		for( i = 0; i<array.length;i++){
			adjMatrix[i] = new Array();
			for(j = 0; j< array.length; j++ ){
			  adjMatrix[i][j] = 0;	
			}
		}
		
		for( i = 0; i<array.length;i++){
			for(j = 0; j< array.length; j++){
				for(k = 0 ; k<anr.anrs.length; k++){
					if((array[i].cell_id != array[j].cell_id) && (array[i].cell_id == anr.anrs[k].local_cell_id) &&(array[j].cell_id == anr.anrs[k].target_cell_id)){
						adjMatrix[i][j] = 1;
					}
				}
			}
		}	
  //alert("adjcent list from data base "+adjMatrix);
}


function prepareAdjList(anr,array){
  
   for(var i = 0;i<array.length;i++){
	   for(var j = 0; j< anr.anrs.length; j++){
		   if(array[i].cell_id == anr.anrs[j].local_cell_id){
			   if(!adjList[array[i].cell_id])
				   adjList[array[i].cell_id] =[];
			       adjList[array[i].cell_id].push(anr.anrs[j].target_cell_id);
		   }
	   }
   }
     /*var keys = Object.keys(adjList); //Getting the key values
     alert(keys[0]);
    /*for(var key in adjList){
    	var elements = adjList[key];
    	alert(elements.length);
    }
	/*
	for (var j = 0;j < anr.anrs.length; j++){
	    for (var i = 0; i < array.length; i++) {
	        if (array[i] == anr.anrs[j].local_cell_id) {
	            insertIntoDic(anr.anrs[j].local_cell_id,anr.anrs[j].target_cell_id);
	        }
	    }
	}
	*/
}
function insertIntoDic(key, value) {
	 // If key is not initialized or some bad structure
	 if (!adjList[key] || !(adjList[key] instanceof Array)) {
		 adjList[key] = [];
	 }
	 // All arguments, exept first push as valuses to the dictonary
	 adjList[key] = adjList[key].concat(Array.prototype.slice.call(arguments, 1));
}