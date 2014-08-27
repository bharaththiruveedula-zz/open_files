var Hexlist= [];
var enb_on_canvas_list = [];
var adjHexListFromMatrix = {};
var storedlines = [];
var inputData =  new Array();
var adjMatrix = new Array();
var ipFromDB = new Array();
var eNodeBMatrix = new Array();
var inActiveEnBList = new Array();
var listFromDB =  new Array();
var enodeDetails = {};
var UEonCanvasList = new Array();
var completed = 0;
var neighbour_count = 0;
var nr_number = 0;
var a,b,c;
a = 2000;
b = 2500;
c = 3000;

function hex(id,x,y,topleft_x,topleft_y,bottomright_x,bottomright_y){
	this.id = id;
	this.x = x;
	this.y = y;
	this.topleft_x = topleft_x;
	this.topleft_y = topleft_y;
	this.bottomright_x = bottomright_x;
	this.bottomright_y = bottomright_y;
}
function get(){
	var index = 0;
	//alert("No.of Hexagons on canvas "+MidPointList.length/7);
    for(var i = 0; i< MidPointList.length/7; i++){
	  var id = MidPointList[index];
	  index = index +1;
	  var x = MidPointList[index];
	  index = index +1;
	  var y = MidPointList[index];
	  index = index +1;
	  var topleft_x = MidPointList[index];
	  index = index +1;
	  var topleft_y = MidPointList[index];
	  index = index +1;
	  var bottomright_x = MidPointList[index];
	  index = index +1;
	  var bottomright_y = MidPointList[index];
	  index = index +1;
	  var h = new hex(id,x,y,topleft_x,topleft_y,bottomright_x,bottomright_y);
	  Hexlist.push(h);
    }
    
 var eNodeBList = ['eNB_1','eNB_2','eNB_3','eNB_4','eNB_5','eNB_6','eNB_7','eNB_8','eNB_9','eNB_10',
                   'eNB_11','eNB_12','eNB_13','eNB_14','eNB_15','eNB_16','eNB_17','eNB_18','eNB_19','eNB_20',
                   'eNB_21','eNB_22','eNB_23','eNB_24','eNB_25','eNB_26','eNB_27'];
  var canv = document.getElementById("myCanvas"); 
  var context = canv.getContext("2d");
  $('#myCanvas').css('background-color', 'rgb(220, 233, 249)');
  $('#canvas').css('background-color', 'rgb(220, 233, 249)');
  //canv.addEventListener('click', getClickedPosition, false);
  prepareEnodeB();
    $("#myCanvas").mousedown(function (mouseEvent) {
        var x, y;
        if (mouseEvent.layerX || mouseEvent.layerX == 0) { // Firefox
            x = mouseEvent.layerX;
            y = mouseEvent.layerY;
          } else if (mouseEvent.offsetX || mouseEvent.offsetX == 0) { // Opera
            x = mouseEvent.offsetX;
            y = mouseEvent.offsetY;
          }else{
        	  x = (mouseEvent.pageX) - (canv.getBoundingClientRect().left+document.body.scrollLeft +
                      document.documentElement.scrollLeft);
        	  y = (mouseEvent.pageY) - (canv.getBoundingClientRect().top+document.body.scrollTop +
                      document.documentElement.scrollTop);
          }
        var endX = getX("E3",enb_on_canvas_list);
        var endY = getY("E3",enb_on_canvas_list);
        var UE = getNearestUE(x,y);
        var sourceHex = getHexDetails(UE.cell_id,enb_on_canvas_list);
        //alert(sourceHex);
        var targetEnB = geteNodeB("E3",enb_on_canvas_list);
        var targetIp = geteNodeBipAdd("E3",enb_on_canvas_list);
        neighbour_count = sourceHex.neighbour_count;
        var active_image = new Image();
        active_image.src = "images/tower.jpg";
        var inactive_image = new Image();
        var enodeECGIData =  getEnodeDetails(UE.eNodeB_id,enodeDetails);
        var targetEnodeData = getEnodeDetails(targetEnB,enodeDetails);
        inactive_image.src = "images/tower-gray.jpg";
        if(UE!=false){ 
        	var status_update = UpdateUEstatus(UE.cell_id,true);
        	if(status_update == true){
        	$('#canvas').empty();
        	$('#canvas').css('background-color', 'rgb(220, 233, 249)');
        	sequence_diagram(UE.eNodeB_id+'(Serving)',targetEnB+'(Target)',true);
        	context.moveTo(UE.x-20,UE.y-10);
        	context.lineTo(endX,endY);
        	context.stroke();
	         /*$('#anr_tbody').append("<tr>");
             $('#anr_tbody').append("<td id='anr'>"+UE.eNodeB_id+"</td>");
             $('#anr_tbody').append("<td>"+""+"</td>");
	         $('#anr_tbody').append("<td>"+targetEnB+"</td>");
	         $('#anr_tbody').append("<td><input type='checkbox' id='NoHo'></input></td>");
	         $('#anr_tbody').append("<td><input type='checkbox' id='NoX2'></input></td>");
	         $('#anr_tbody').append("</tr>");*/
	         
	         $('#anr_tbody').prepend("<tr>");
	         $('#anr_tbody').prepend("<td id='check"+c+"'><a href='#' name ='check"+c+"' onclick='image_flip2(this)' >&nbsp&nbsp<img  alt='' src='images/Close-icon.png' height='15px' width='15px'></img>&nbsp&nbsp</a></td>");
	         $('#anr_tbody').prepend("<td id='check"+b+"'><a href='#' name ='check"+b+"' onclick='image_flip2(this)' >&nbsp&nbsp<img  alt='' src='images/Close-icon.png' height='15px' width='15px'></img>&nbsp&nbsp</a></td>");
	         $('#anr_tbody').prepend("<td id='check"+a+"'><a href='#' name ='check"+a+"' onclick='image_flip2(this)' >&nbsp&nbsp<img  alt='' src='images/Close-icon.png' height='15px' width='15px'></img>&nbsp&nbsp</a></td>");
	         $('#anr_tbody').prepend("<td>"+targetIp+"</td>");
	         $('#anr_tbody').prepend("<td>"+targetEnB+"</td>");
	         $('#anr_tbody').prepend("<td>"+targetEnodeData[0]+"</td>");
	         $('#anr_tbody').prepend("<td id ='tick'>&nbsp"+(neighbour_count)+"</td>");
	         $('#anr_tbody').prepend("<td>"+UE.eNodeB_id+"</td>");
	         $('#anr_tbody').prepend("<td id='anr'>&nbsp"+enodeECGIData[1].trim()+"</td>");
	         $('#anr_tbody').prepend("<td>"+enodeECGIData[0].trim()+"</td>");    
	         $('#anr_tbody').prepend("</tr>");
	         a++;
	         b++;
	         c++;
	         /* Second Row */
	         $('#anr_tbody').prepend("<tr>");
	         $('#anr_tbody').prepend("<td id='check"+c+"'><a href='#' name ='check"+c+"' onclick='image_flip2(this)' >&nbsp&nbsp<img  alt='' src='images/Close-icon.png' height='15px' width='15px'></img>&nbsp&nbsp</a></td>");
	         $('#anr_tbody').prepend("<td id='check"+b+"'><a href='#' name ='check"+b+"' onclick='image_flip2(this)' >&nbsp&nbsp<img  alt='' src='images/Close-icon.png' height='15px' width='15px'></img>&nbsp&nbsp</a></td>");
	         $('#anr_tbody').prepend("<td id='check"+a+"'><a href='#' name ='check"+a+"' onclick='image_flip2(this)' >&nbsp&nbsp<img  alt='' src='images/Close-icon.png' height='15px' width='15px'></img>&nbsp&nbsp</a></td>");
	         $('#anr_tbody').prepend("<td>"+sourceHex.ip_address+"</td>");
	         $('#anr_tbody').prepend("<td>"+UE.eNodeB_id+"</td>");
	         $('#anr_tbody').prepend("<td>"+enodeECGIData[0]+"</td>");
	         $('#anr_tbody').prepend("<td>&nbsp"+(++nr_number)+"</td>");
	         $('#anr_tbody').prepend("<td>"+targetEnB+"</td>");
	         $('#anr_tbody').prepend("<td>&nbsp"+targetEnodeData[1]+"</td>");
	         $('#anr_tbody').prepend("<td>"+targetEnodeData[0]+"</td>");    
	         $('#anr_tbody').prepend("</tr>");
	         /*$("#anr_table tr:first").effect("highlight", {
                 color: '#4BADF5'
             }, 5000);*/	 
	         a++;
	         b++;
	         c++;
	       /*  
	         var tbody = document.getElementById("anr_tbody");  
	 		// tbody = myTable.tbodies[0];
	 		
	 	    if ( tbody == null) {  
	 	        tbody = document.createElement("tbody");  
	 	        tbody.id = "anr_tbody";  
	 	        document.getElementById("anr_table").appendChild(tbody);        
	 	    }  
	 	    var docFragment = document.createDocumentFragment();  
	 	    var trElem, tdElem, txtNode, c1; 
	 	    
	 	    trElem = document.createElement("tr");  
	 	    trElem = tbody.insertRow(-1);
	 	    //trElem.id="CorrDetailTableDynTr";  
	        
	 	    tdElem = document.createElement("td");
	 	    tdElem.id="ECGI";
	 	    txtNode = document.createTextNode(UE.cell_id);  
	 	    tdElem.appendChild(txtNode);
	 	    trElem.appendChild(tdElem);
	 	    
	 	    tdElem = document.createElement("td");
	 	    tdElem.id="PCI";
	 	    txtNode = document.createTextNode(UE.eNodeB_id);  
	 	    tdElem.appendChild(txtNode);
	 	    trElem.appendChild(tdElem);  
	 	  
	 	    tdElem = document.createElement("td");
	 	    tdElem.id="NR";
	 	    txtNode = document.createTextNode("");  
	 	    tdElem.appendChild(txtNode);
	 	    trElem.appendChild(tdElem); 
	 	    
	 	    tdElem = document.createElement("td");
	 	    tdElem.id="TargetCell";
	 	    txtNode = document.createTextNode(targetEnB);  
	 	    tdElem.appendChild(txtNode);
	 	    trElem.appendChild(tdElem);
	 	    
	 	    tdElem = document.createElement("td");
	 	    tdElem.id="TragetCellIP";
	 	    txtNode = document.createTextNode("");  
	 	    tdElem.appendChild(txtNode);
	 	    trElem.appendChild(tdElem);
	 	    
	 	    tdElem = document.createElement("td");
		    tdElem.id="NoRemove"+a;
		    c1 = document.createElement('a');
	        c1.href = '#';
	        c1.name = 'NoRemove'+a;  
	        c2 = document.createElement("img");
	        c2.alt = '';
	        c2.src = 'images/Alarm-Tick-icon.png';
	        c2.width= '15px';
	        c2.height ='15px';
	        c1.appendChild(c2);
	        tdElem.appendChild(c1);
	        tdElem.className = "green";
	        trElem.appendChild(tdElem);
	        
	        tdElem = document.createElement("td");
		    tdElem.id="NoHO";
		    c1 = document.createElement('a');
	        c1.href ="NoHo"+b;
	        c1.name ='NoHo'+b;
	        tdElem.appendChild(c1);
	        c2 = document.createElement("img");prepareEnodeB();
	        c2.alt = '';
	        c2.src = 'images/Alarm-Tick-icon.png';
	        c2.width= '15px';
	        c2.height ='15px';
	        c1.appendChild(c2);
	        tdElem.className = "green";
	        trElem.appendChild(tdElem);
	        
	        tdElem = document.createElement("td");
		    tdElem.id="NOX2"+c;
		    c1 = document.createElement('a');
	        c1.href = '#';
	        c1.name = 'NOX2'+c;  
	        c2 = document.createElement("img");
	        c2.alt = '';
	        c2.src = 'images/Alarm-Tick-icon.png';
	        c2.width= '15px';
	        c2.height ='15px';
	        c1.appendChild(c2);
	        tdElem.appendChild(c1);
	        tdElem.className = "green";
	        trElem.appendChild(tdElem);
 
	 	    docFragment.appendChild(trElem);  
		    tbody.appendChild(docFragment);
		    tbody.insertBefore(trElem, tbody.firstChild); 
	        
	         
	          /*$("#anr_table tr:last").effect("highlight", {
                 color: '#4BADF5'
             }, 5000); */
	         completed++;
	         if(completed == UEonCanvasList.length){
	        	 //var enb_status_update = UpdateStatus("E3",enb_on_canvas_list,true);
	        	 //if(enb_status_update)
	        	  context.drawImage(active_image,endX-20,endY-20,30,30);
	         }
        	}
        	
        }
        var result_clr = $('#anr_table tr').find('td:contains('+targetEnB+')');
        //var result_clr = $('#anr_table tr:last');
    	//alert(result_clr);
    	result_clr.siblings().css('color', '#0066FF');
    	result_clr.css('color', '#0066FF');
			
   });
   
    document.getElementById('Reset').addEventListener('click', function() {
   	    var canvas = document.getElementById("myCanvas");
	    var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        $('#canvas').empty();
        $('#seq').empty();
        clearTable();
        enb_on_canvas_list = [];
        adjHexListFromMatrix = {};
        adjMatrix = [];
        eNodeBMatrix = [];
        inActiveEnBList =[];;
        listFromDB = [];
        UEonCanvasList = [];
        completed = 0;
        getHexGridZR2();
        prepareEnodeB();
        neighbour_count = 0;
        nr_number = 0;
      }, false);
  //prepareAdjMatrix(Hexlist,adjMatrix,adjHexListFromMatrix,ROWCOUNT,COLCOUNT);
 //alert(adjMatrix[0].length+ "  "+ COLCOUNT);
 // prepare_eNodeBMatrix(enbList,adjMatrix,Hexlist,adjHexListFromMatrix);
 //prepareAdjList(Hexlist);

 
 /**
  *  Following code is for preparing an Adjacent List for Hexagon's present on the canvas
  */
 /*
 
  var AdjList = {};
  var i = 0, j = 0;
  for(; i< Hexlist.length;i++){ 
    for(j = 0;j<Hexlist.length;j++){
	 if((Hexlist[i].y - Hexlist[j].y == 0)&&(Hexlist[i].id != Hexlist[j].id)){ }
	 else if(  ( (Hexlist[i].x - Hexlist[j].x == 0 && Hexlist[i].id != Hexlist[j].id) && ((Hexlist[j].y - Hexlist[i].y <104) && (Hexlist[j].y - Hexlist[i].y >103)) ) ||( (Hexlist[i].x - Hexlist[j].x == 0 && Hexlist[i].id != Hexlist[j].id) && ((Hexlist[j].y - Hexlist[i].y >-104) && (Hexlist[j].y - Hexlist[i].y <-103))  ) ){
	       if(!(AdjList[Hexlist[i].id]) ||!(AdjList[Hexlist[i].id] instanceof Array)){
	          AdjList[Hexlist[i].id]= [];
	          }
	         AdjList[Hexlist[i].id].push(Hexlist[j].id);
	  }else if(((Hexlist[j].x - Hexlist[i].x <90)&&(Hexlist[j].x -Hexlist[i].x > 89)&&(Hexlist[j].y - Hexlist[i].y <52)&&(Hexlist[j].y - Hexlist[i].y >51)) || ((Hexlist[j].x - Hexlist[i].x > -90)&&(Hexlist[j].x -Hexlist[i].x < -89)&&(Hexlist[j].y - Hexlist[i].y <52)&&(Hexlist[j].y - Hexlist[i].y >51)) || ((Hexlist[j].x - Hexlist[i].x > -90)&&(Hexlist[j].x -Hexlist[i].x < -89)&&(Hexlist[j].y - Hexlist[i].y >-52)&&(Hexlist[j].y - Hexlist[i].y <-51)) || ((Hexlist[j].x - Hexlist[i].x <90)&&(Hexlist[j].x -Hexlist[i].x > 89)&&(Hexlist[j].y - Hexlist[i].y >-52)&&(Hexlist[j].y - Hexlist[i].y <-51))){
		  if(!(AdjList[Hexlist[i].id]) ||!(AdjList[Hexlist[i].id] instanceof Array)){
		    AdjList[Hexlist[i].id]= [];
		    }
		  AdjList[Hexlist[i].id].push(Hexlist[j].id);
	  };
	};	   
  };
    /*for( var keys in AdjList){
    	elements = AdjList[keys];
    	alert(elements);
    }  
  */
 // var he = getXCoOrdYCoOr(Hexlist,'A1');
  //alert("Here the Details of "+he.id+" X Co Ord "+he.x+" Y Co Ord"+he.y);getXCoOrdYCoOr(HexList,cell_Id){
}
//updateTable(enb_on_canvas_list);

function prepareEnodeB(){
	$.ajax({
	    url:'anr_data.jsp',
	    cache:false,
	    success:function(data,status){
	      var enode = eval("("+ data +")");
	      for(var i = 0; i<enode.anrs.length; i++){
	    	  listFromDB.push(enode.anrs[i].name);
	    	  if(!(enodeDetails[enode.anrs[i].name]) ||!(enodeDetails[enode.anrs[i].name] instanceof Array)){
	  		    enodeDetails[enode.anrs[i].name]= [];
	  		    enodeDetails[enode.anrs[i].name].push(enode.anrs[i].ecgi);
	  		    enodeDetails[enode.anrs[i].name].push(enode.anrs[i].pci);
	  		    enodeDetails[enode.anrs[i].name].push(enode.anrs[i].host);
	  		    }
	      }
	      prepareAdjMatrix(Hexlist,adjMatrix,adjHexListFromMatrix,ROWCOUNT,COLCOUNT);
	      prepare_eNodeBMatrix(listFromDB,adjMatrix,Hexlist,adjHexListFromMatrix);
	    },
	    error:function(){
	    	 alert("failed to fetch data");
	    }
	  });
	}

/*function prepareIP(){
	$.ajax({
	    url:'ip_data.jsp',
	    cache:false,
	    success:function(data,status){
	      var ip = eval("("+ data +")");
	      for(var i = 0; i<ip.ips.length; i++){
	    	if(!(ipFromDB[ip.ips[i].name]) ||!( ipFromDB[ip.ips[i].name] instanceof Array)){
	    		ipFromDB[ip.ips[i].name] = [];
	    		ipFromDB[ip.ips[i].name].push(ip.ips[i].host);
	    		ipFromDB[ip.ips[i].name].push(ip.ips[i].uuid);
	    		ipFromDB[ip.ips[i].name].push(ip.ips[i].ecip);
	    		alert("ip got"+ip.ips[i].host);
	    	}
	      }
	    },
	    error:function(){
	    	 alert("failed to fetch data");
	    }
	  });
} */
/**
 *  Following code is working,do not make any changes;
 */


function prepareAdjMatrix(HexList,adjMatrix,adjHexListFromMatrix,rows,cols){
	var status = false;
	var i = 0, j = 0;
	for(;i<rows;i++){
		adjMatrix[i] = new Array();
		for(j=0;j<cols;j++){
			adjMatrix[i][j] = -1;
		}
	}
	//alert("Over here");
	for(i =0; i<rows; i++){
		for(j = 0; j<cols;j++){
			var hex_id =  prepareId(i,j);
			adjMatrix[i][j] = hex_id;
		}
	}
	for( i = 0; i < rows; i++){
		for(j = 0 ;j < cols ; j++){
			for(var k = 0; k < HexList.length; k++){
			  if(adjMatrix[i][j] == HexList[k].id){
				  status = true;
			  }
			}
			if(status == false){
				adjMatrix[i][j] = "#";
			}else{
				status = false;
			}
		}
	}

	//alert(adjMatrix);
	
	for( i = 0 ; i < rows; i++){
	 for( j = 0 ; j < cols; j++){
	  if(!adjHexListFromMatrix[adjMatrix[i][j]] && adjMatrix[i][j] != '#'){
		  adjHexListFromMatrix[adjMatrix[i][j]] = [];
		  var row = i;
		  var col = j;
		  if(row-1  >=0){
			 if(col-1 >=0 && adjMatrix[row-1][col-1] != '#')
				 adjHexListFromMatrix[adjMatrix[i][j]].push(adjMatrix[row-1][col-1]);
			 if(adjMatrix[row-1][col] == '#' && row-2 >=0 && adjMatrix[row-2][col]!='#'){
				 adjHexListFromMatrix[adjMatrix[i][j]].push(adjMatrix[row-2][col]);
			 }
				 if(col+1 <cols){
					 if(adjMatrix[row-1][col+1] != '#')
					   adjHexListFromMatrix[adjMatrix[i][j]].push(adjMatrix[row-1][col+1]); 
   		          }
		   }
		  if(row+1 < rows){
			   if(col-1 >=0 && adjMatrix[row+1][col-1] != '#')
					 adjHexListFromMatrix[adjMatrix[i][j]].push(adjMatrix[row+1][col-1]);
			   if(adjMatrix[row+1][col] == '#' && row+2 <rows){
				    if(adjMatrix[row+2][col] != '#')
					 adjHexListFromMatrix[adjMatrix[i][j]].push(adjMatrix[row+2][col]);
				 }
			   if(col+1 <cols){
					 if(adjMatrix[row+1][col+1] != '#')
					   adjHexListFromMatrix[adjMatrix[i][j]].push(adjMatrix[row+1][col+1]); 
 		          }
		   }
	    }
	 }
	}	
	//var cell_id = 'C3';
	//var neighbouring_cell_info = getNeighnours(cell_id,adjHexListFromMatrix); //check for null before using
	//alert("Neighbours for cell "+cell_id +" are  "+neighbouring_cell_info);

}
 /**
  *  Following function will generate an Unique ID to represent Hexagon
  */
 ID = {Letters:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'};

function prepareId(row,col){
	var letterIndex = row;
	var letters = "";
	//var random  = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
	while(letterIndex > 25)
	{
		letters = ID.Letters[letterIndex%26] + letters;
		letterIndex -= 26;
	}
	return ID.Letters[letterIndex] + letters +(col + 1);
  }
/**
 * Is used to obtain list of neighbours for a particular Hexagon
 * @param cell_id
 * @param adjHexListFromMatrix
 * @returns
 */
function getNeighnours(cell_id,adjHexListFromMatrix){
	
	if(cell_id in adjHexListFromMatrix){
	  return adjHexListFromMatrix[cell_id];	
	}else{
		return null;
	}
}

/**
 * 
 * @param HexList
 * @param cell_Id
 * @returns
 */

function getXCoOrdYCoOr(HexList,cell_Id){
  var search_result = false;
  for(var i = 0; i< HexList.length; i++){
	  if(HexList[i].id == cell_Id){
		  search_result = true;
		  return HexList[i];
		  break;
	  }
  }
	if(search_result == false){
		return null;
	}
}
 /**
  * 
  * @param min
  * @param max
  * @returns
  */
function getRandomInt (min,max){
   return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * 
 * @param number
 * @returns
 */
function determinePerfectSquare(number){
	var srt  = Math.sqrt(number);
	if(srt == parseInt(srt)){
		return srt;
	}else{
		return -1;
	}
}
 /**
  * 
  * @param back
  * @param front
  * @returns
  */
function getNearestPerfectSquare(back,front){
	if(back > 0 || front  >0){
	   var backres = determinePerfectSquare(back);
	   var frontres = determinePerfectSquare(front);
	   if(backres == -1 && frontres == -1){
		   var result =getNearestPerfectSquare(back-1,front+1);
		   if(result !=-1)
			   return result;
	   }
	   else{
		   if(backres!=-1){
			   return backres;
		   }else{
			   return frontres;
		   }
	   }
   }
}
/**
 * 
 * @param eNodeBList
 */

function prepare_eNodeBMatrix(eNodeBList,adjMatrix,HexList,adjHexListFromMatrix){
	var length = eNodeBList.length;
	var rows = 0,
	    cols = 0,
	    i = 0,j = 0,
	    sqrt = 0,
	    nsqrt = 0,
	    dif = 0;
	 sqrt = determinePerfectSquare(length);
	 
	 if(sqrt == -1){
		nsqrt = getNearestPerfectSquare(length-1,length+1);
		dif = Math.abs(length - Math.pow(nsqrt,2));
		if(dif > nsqrt){
			   var result = true;
			   while(result){
				   if(length <= nsqrt*nsqrt){
					result = false;  
				   }else{
					   nsqrt = nsqrt+1;
				   }
			   }
			  rows = nsqrt;
			  cols = nsqrt;
			}else{
				rows = nsqrt+1;
				cols = nsqrt+1;
			}
	 }else{
		dif = Math.abs(length - Math.pow(sqrt,2));
		if(dif > sqrt){
		   var result = true;
		   while(result){
			   if(length <= sqrt*sqrt){
				result = false;  
			   }else{
				   sqrt = sqrt+1;
			   }
		   }
		  rows = sqrt;
		  cols = sqrt;
		}else{
			rows = sqrt+1;
			cols = sqrt+1;
		}
	 }
	/* getXCoOrdYCoOr(HexList,cell_Id){
	 for(i = 0; i<rows; i++){
		 eNodeBMatrix[i] = new Array();
		 for(j = 0 ; j<cols ; j++){
			 eNodeBMatrix[i][j] ='#';
		 }
	 }
	 */
	 var index = 0;
	 for(i = 0; i< rows; i++){
		 eNodeBMatrix[i] = new Array();
		 for(j = 0; j<cols; j++){
			 if(index < eNodeBList.length)
			  eNodeBMatrix[i][j] = eNodeBList[index++];
			 else
			  eNodeBMatrix[i][j]= '#';
		 }
	 }
	 //alert(eNodeBMatrix[4]);
 /*
  *******************************************************************
  *  Following code is used for Canvas Mapping with eNodeB's
  *******************************************************************
  */
	 var add = 1;
	 var row_index = 0;
	 var col_index = 0;
	 var canvas = document.getElementById("myCanvas");
	 var ctx = canvas.getContext("2d");
	 var img = new Image();
	 img.src ="images/tower.jpg";
	 var ue = new Image();
	 ue.src= "images/mobile _phone.jpg";
	 var inactive = new Image();
	 inactive.src = "images/tower-gray.jpg";
	  for(i = 0; i< adjMatrix.length;i++){
		 for(j = 0; j<adjMatrix[i].length;j++){
			 if(adjMatrix[i][j]!='#'){
				 var hexagon_on_canvas = getXCoOrdYCoOr(HexList,adjMatrix[i][j]);
				  if(row_index <= eNodeBMatrix.length && col_index <= eNodeBMatrix.length && eNodeBMatrix[row_index][col_index]!='#'){
					  var enodeData = getEnodeDetails(eNodeBMatrix[row_index][col_index],enodeDetails);
					  var new_ip = enodeData[2];
					  if(eNodeBMatrix[row_index][col_index] != 'eNB8')
					   new_ip = preparePort(new_ip,add);
					  if(adjMatrix[i][j] != "E3"){
					    enb_on_canvas_list.push(new HexWithEnB(adjMatrix[i][j],eNodeBMatrix[row_index][col_index],hexagon_on_canvas.x,hexagon_on_canvas.y,true,enodeData[0],enodeData[1],new_ip,1));
					    ctx.drawImage(img,hexagon_on_canvas.x-20,hexagon_on_canvas.y-20,30,30);
					  }else{
						  enb_on_canvas_list.push(new HexWithEnB(adjMatrix[i][j],eNodeBMatrix[row_index][col_index],hexagon_on_canvas.x,hexagon_on_canvas.y,false,enodeData[0],enodeData[1],new_ip,1));
						  ctx.drawImage(inactive,hexagon_on_canvas.x-20,hexagon_on_canvas.y-20,30,30); 
					  }
					  var text = eNodeBMatrix[row_index][col_index];
					  ctx.fillText(""+text+"",hexagon_on_canvas.x ,hexagon_on_canvas.y-30);
					  if(adjMatrix[i][j] == "D2" ||adjMatrix[i][j] == "C3"||adjMatrix[i][j] == "D4"){
						 UEonCanvasList.push(new UeWithEnB(adjMatrix[i][j],eNodeBMatrix[row_index][col_index],hexagon_on_canvas.x+30,hexagon_on_canvas.y+30,false));
						 ctx.drawImage(ue,hexagon_on_canvas.x ,hexagon_on_canvas.y,20,25);
					  }
					  col_index++;
					  if(col_index >= eNodeBMatrix.length){
						  row_index++;
						  col_index = 0;
					  }
                         add++;
				  }
			 }
			
		 }
	  }
	  //drawAdjLines(enb_on_canvas_list,adjHexListFromMatrix);
	  updateTable(enb_on_canvas_list);
	  //alert(enb_on_canvas_list);
	  
	  /*  var active_image = new Image();
	    active_image.src = "images/tower.jpg";
	    var inactive_image = new Image();
	    inactive_image.src = "images/tower-gray.jpg";
	    inActiveEnBList.push('A1');
	    status1 = UpdateStatus('A1',enb_on_canvas_list,false);
	    inActiveEnBList.push('D2');
	    status2 = UpdateStatus('D2',enb_on_canvas_list,false);
	    redraw(active_image,inactive_image,Hexlist,inActiveEnBList); 
	    if(status1 == true && status2 == true){
	    	drawAdjLines(enb_on_canvas_list,adjHexListFromMatrix); 
	    } 
	   */
}
function UeWithEnB(cell_id,eNodeB_id,x,y,active_with_targetEnB){
   this.cell_id = cell_id;
   this.eNodeB_id = eNodeB_id;
   this.x = x;
   this.y = y;
   this.active_with_targetEnB = active_with_targetEnB;	
}

function HexWithEnB(cell_id,eNodeB_id,x,y,active_status,ecgi,pci,ip_address,neighbour_count){
	this.cell_id = cell_id;
	this.eNodeB_id = eNodeB_id;
	this.x = x;
	this.y = y;
	this.active_status = active_status;
	this.ecgi = ecgi;
	this.pci = pci;
	this.ip_address = ip_address;
	this.neighbour_count = neighbour_count;
}
/**
 * returns the X co-ordinate of a perticlular cell 
 * @param cell_id
 * @param enb_on_canvas_list
 * @returns
 */
function getX(cell_id,enb_on_canvas_list){
	var result = false;
    for(var  k = 0; k< enb_on_canvas_list.length; k++){
    	if(cell_id == enb_on_canvas_list[k].cell_id){
    		result = true;
    		return enb_on_canvas_list[k].x;
    	}	
    }
    if(result == false){
    	return null;
    }
}
/**
 * returns the Y co-ordinate of a perticlular cell 
 * @param cell_id
 * @param enb_on_canvas_list
 * @returns
 */
function getY(cell_id,enb_on_canvas_list){
	var result = false;
    for(var  k = 0; k< enb_on_canvas_list.length; k++){
    	if(cell_id == enb_on_canvas_list[k].cell_id){
    		result = true;
    		return enb_on_canvas_list[k].y;
    	}	
    }
    if(result == false){
    	return null;
    }
}
/**
 * returns the eNodeB id of a perticlular cell
 * @param cell_id
 * @param enb_on_canvas_list
 * @returns
 */
function geteNodeB(cell_id,enb_on_canvas_list){
	var result = false;
    for(var  k = 0; k< enb_on_canvas_list.length; k++){
    	if(cell_id == enb_on_canvas_list[k].cell_id){
    		result = true;
    		return enb_on_canvas_list[k].eNodeB_id;
    	}	
    }
    if(result == false){
    	return null;
    }
}
/**
 * 
 * @param cell_id
 * @param enb_on_canvas_list
 * @returns
 */
function geteNodeBipAdd(cell_id,enb_on_canvas_list){
	var result = false;
    for(var  k = 0; k< enb_on_canvas_list.length; k++){
    	if(cell_id == enb_on_canvas_list[k].cell_id){
    		result = true;
    		return enb_on_canvas_list[k].ip_address;
    	}	
    }
    if(result == false){
    	return null;
    }
}
/**
 * returns status of eNodeB whther it is active or not
 * @param cell_id
 * @param enb_on_canvas_list
 * @returns
 */
function getStatus(cell_id,enb_on_canvas_list){
	var result = false;
    for(var  k = 0; k< enb_on_canvas_list.length; k++){
    	if(cell_id == enb_on_canvas_list[k].cell_id){
    		result = true;
    		return enb_on_canvas_list[k].active_status;
    	}	
    }
    if(result == false){
    	return false;
    }
}

function getClickedPosition(e) {
    var x = event.x;
    var y = event.y;
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    var hexagon_id = getNearestHex(x,y,Hexlist);
    var active_image = new Image();
    active_image.src = "images/tower.jpg.jpg";
    var inactive_image = new Image();
    inactive_image.src = "images/tower-gray.jpg";
    if(hexagon_id != null){
        var status = UpdateStatus(hexagon_id,enb_on_canvas_list,false);
         if(status == true){
           inActiveEnBList.push(hexagon_id);
          /* var x = getX(hexagon_id,enb_on_canvas_list); 
           var y = getY(hexagon_id,enb_on_canvas_list);
           //alert("X co "+x+" Y co "+y);
           inactive_image.onload = function(){
    	   ctx.drawImage(inactive_image,x-20,y-20,30,30); 
    	   };*/
           redraw(active_image,inactive_image,Hexlist,inActiveEnBList); 
    	   drawAdjLines(enb_on_canvas_list,adjHexListFromMatrix);
    	   clearTable();
    	   //updateTable(enb_on_canvas_list);
         }
    }
}


function getNearestHex(x,y,HexList){
   var status = false;
   for(var i = 0; i< HexList.length;i++){
	  if(HexList[i].topleft_x < x && HexList[i].topleft_y < y &&
	   x < HexList[i].bottomright_x && y <  HexList[i].bottomright_y){
		  status = true;
		  return HexList[i].id;
	  }
   }
   if(status == false){
	   return null;
   }
}
/**
 * 
 * @param cell_id
 * @param enb_on_canvas_list
 * @returns {Boolean}
 */
function UpdateStatus(cell_id,enb_on_canvas_list,status){
	var result = false;
    for(var  k = 0; k< enb_on_canvas_list.length; k++){
    	if(cell_id == enb_on_canvas_list[k].cell_id){
    		result = true;
    		enb_on_canvas_list[k].active_status = status;
    		return true;
    	}	
    }
    if(result == false){
    	return false;
    }
}
/**
 * 
 * @param x
 * @param y
 * @returns
 */
function getNearestUE(x,y){
	var result = false; 
  for(var i = 0; i< UEonCanvasList.length; i++){
	  var x_higherrange = UEonCanvasList[i].x+30;
	  var x_lowerrange = UEonCanvasList[i].x-30;
	  var y_higer = UEonCanvasList[i].y+30;
	  var y_lower =  UEonCanvasList[i].y-30;
	  if((x < x_higherrange && x > x_lowerrange)&&(y< y_higer && y > y_lower) ){
		  result = true;
		  return UEonCanvasList[i];
	  } 
  }
  if(result == false){
  	return false;
  }
}
/**
 * 
 * @param cell_id
 * @param status
 * @returns {Boolean}
 */
function UpdateUEstatus(cell_id,status){
	var result = false;
	for(var  k = 0; k< UEonCanvasList.length; k++){
    	if(cell_id == UEonCanvasList[k].cell_id && UEonCanvasList[k].active_with_targetEnB == false){
    		result = true;
    		UEonCanvasList[k].active_with_targetEnB = status;
    		return true;
    	}	
    }
    if(result == false){
    	return false;
    }
	
}
/*
 *******************************************************************
 *  Following code is used for Drawing lines between neighbours.
 *******************************************************************
 */	  
function drawAdjLines(enb_on_canvas_list,adjHexListFromMatrix){
	 for(enb in enb_on_canvas_list){
		 var list = getNeighnours(enb_on_canvas_list[enb].cell_id,adjHexListFromMatrix);
		 var startX = getX(enb_on_canvas_list[enb].cell_id,enb_on_canvas_list);
		 var startY = getY(enb_on_canvas_list[enb].cell_id,enb_on_canvas_list);
		 for(var h = 0 ; h<list.length;h++){
			 endX = getX(list[h],enb_on_canvas_list);
			 endY = getY(list[h],enb_on_canvas_list);
			 var enbStatus = getStatus(list[h],enb_on_canvas_list);
			 if(endX != null && endY != null && startX != null && startY != null && enb_on_canvas_list[enb].active_status == true && enbStatus == true){
			 ctx.beginPath();
			 ctx.moveTo(startX,startY);
			 ctx.lineTo(endX,endY);
			 ctx.stroke();
			// storedlines.push({x1:startX,y1:startY,x2:endX,y2:endY,from:enb_on_canvas_list[enb].cell_id,to:list[h]});
			 }
		 }
	 }
}
/*
 *******************************************************************
 *  Following code is used for updating table data
 *******************************************************************
 */	
 function updateTable(enb_on_canvas_list){	
	 var i = 10;
	 var j = 500;
	 var k = 1000;
	 //alert(ipFromDB);
	 //alert(enb_on_canvas_list['eNB1'].cell_id);
	 for(var enode in enb_on_canvas_list){
		 var nodelist = getNeighnours(enb_on_canvas_list[enode].cell_id,adjHexListFromMatrix);
		 if(enb_on_canvas_list[enode].active_status == true){
		  for(var m = 0 ; m < nodelist.length; m++){
			 var targetEnB = geteNodeB(nodelist[m],enb_on_canvas_list);
			 var targetEnBstatus =  getStatus(nodelist[m],enb_on_canvas_list);
			 var targetipAdd = geteNodeBipAdd(nodelist[m],enb_on_canvas_list);
			 var enodeData  = getEnodeDetails(enb_on_canvas_list[enode].eNodeB_id,enodeDetails);
			 var targetEnodeData  = getEnodeDetails(targetEnB,enodeDetails);
			   if(targetEnB != null && targetEnBstatus == true){
		         $('#anr_tbody').append("<tr>");
		         $('#anr_tbody').append("<td>"+enodeData[0]+"</td>");
	             $('#anr_tbody').append("<td id='anr'>&nbsp"+enodeData[1]+"&nbsp</td>");
	             $('#anr_tbody').append("<td>"+enb_on_canvas_list[enode].eNodeB_id+"</td>");
	             $('#anr_tbody').append("<td>&nbsp"+(enb_on_canvas_list[enode].neighbour_count++)+"&nbsp</td>");
	             $('#anr_tbody').append("<td>"+targetEnodeData[0]+"</td>");
		         $('#anr_tbody').append("<td>"+targetEnB+"</td>");
		         $('#anr_tbody').append("<td>"+targetipAdd+"</td>");
		         $('#anr_tbody').append("<td id='check"+i+"'><a href='#' name ='check"+i+"' onclick='image_flip(this)' >&nbsp&nbsp<img  alt='' src='images/Alarm-Tick-icon.png' height='15px' width='15px'></img>&nbsp&nbsp</a></td>");
		         $('#anr_tbody').append("<td id='check"+j+"'><a href='#' name ='check"+j+"' onclick='image_flip(this)' >&nbsp&nbsp<img  alt='' src='images/Alarm-Tick-icon.png' height='15px' width='15px'></img>&nbsp&nbsp</a></td>");
		         $('#anr_tbody').append("<td id='check"+k+"'><a href='#' name ='check"+k+"' onclick='image_flip(this)' >&nbsp&nbsp<img  alt='' src='images/Alarm-Tick-icon.png' height='15px' width='15px'></img>&nbsp&nbsp</a></td>");
		         $('#anr_tbody').append("</tr>");
		         i++;
		         j++;
		         k++;
		         }
		       }	 
	      }
	 }
 }
 function image_flip(element){
		
	 var check_id = element.name;
	 $('#'+check_id).empty();
	 $('#'+check_id).append("<a href='#' name = "+check_id+" onclick='image_flip2(this)' >&nbsp&nbsp<img  alt='' src='images/Close-icon.png' height='15px' width='15px'></img>&nbsp&nbsp</a>");
 }
 
 function image_flip2(element){
	 var check_id = element.name;
	 $('#'+check_id).empty();
	 $('#'+check_id).append("<a href='#' name = "+check_id+" onclick='image_flip(this)' >&nbsp&nbsp<img  alt='' src='images/Alarm-Tick-icon.png' height='15px' width='15px'></img>&nbsp&nbsp</a>");
 }
 /**
  * 
  * @param active_image
  * @param inactive_image
  * @param HexList
  * @param inActiveEnBList
  */
function redraw(active_image,inactive_image,HexList,inActiveEnBList){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  getHexGridZR2();
  var row_number = 0;
  var col_number = 0;
	  for(var i = 0; i< adjMatrix.length;i++){
		 for(var j = 0; j<adjMatrix[i].length;j++){
			    if(adjMatrix[i][j]!='#'){
			    	if(inActiveEnBList.indexOf(adjMatrix[i][j]) > -1){
				   var hexagon_tobe_drawn = getXCoOrdYCoOr(HexList,adjMatrix[i][j]);
				   if(row_number <= eNodeBMatrix.length && col_number <= eNodeBMatrix.length && eNodeBMatrix[row_number][col_number]!='#'){
					  ctx.drawImage(inactive_image,hexagon_tobe_drawn.x -20,hexagon_tobe_drawn.y-20,30,30);
					  var text = eNodeBMatrix[row_number][col_number];
					  ctx.fillText("("+text+")",hexagon_tobe_drawn.x ,hexagon_tobe_drawn.y+30);
					  col_number++;
					  if(col_number >= eNodeBMatrix.length){
						  row_number++;
						  col_number = 0;
					  }
				    }
			     }else{
					   var hexagon_tobe_drawn = getXCoOrdYCoOr(HexList,adjMatrix[i][j]);
					   if(row_number <= eNodeBMatrix.length && col_number <= eNodeBMatrix.length && eNodeBMatrix[row_number][col_number]!='#'){
						  ctx.drawImage(active_image,hexagon_tobe_drawn.x -20,hexagon_tobe_drawn.y-20,30,30);
						  var text = eNodeBMatrix[row_number][col_number];
						  ctx.fillText("("+text+")",hexagon_tobe_drawn.x ,hexagon_tobe_drawn.y+30);
						  col_number++;
						  if(col_number >= eNodeBMatrix.length){
							  row_number++;
							  col_number = 0;
						  }
					    }
			     }
			 }
		  }
		 }
}

function clearTable(){
	if($('#anr_table').children().length){
		$('#anr_table tbody').empty();
	}
}

function getEnodeDetails(enode_name,enodeDetails){
	 if(enode_name in enodeDetails){
		 var elements =  enodeDetails[enode_name];
		 return elements;
	 }
}
 
function preparePort(ip,add){
  var input_ip = ip.split(":");
  var port_number = parseInt(input_ip[1]);
  port_number = port_number + add;
  return input_ip[0]+":"+port_number;
}

function getNeighbourCount(cell_id,enb_on_canvas_list){
	var result = false;
    for(var  k = 0; k< enb_on_canvas_list.length; k++){
    	if(cell_id == enb_on_canvas_list[k].cell_id){
    		return  enb_on_canvas_list[k].neighbour_count;
       	}	
    }
    if(result == false){
    	return null;
    }
}
function getHexDetails(cell_id,enb_on_canvas_list){
	var result = false;
    for(var  k = 0; k< enb_on_canvas_list.length; k++){
    	if(cell_id == enb_on_canvas_list[k].cell_id){
    		return  enb_on_canvas_list[k];
       	}	
    }
    if(result == false){
    	return null;
    }
}
