/**
 *
 */
var hyst_data = {};
var time=2;
var set_interval ;
function hystDisplay(){
	/*$("#clear_button").click(function(){
		if($('#hyst_table').children().length){

			$('#hyst_table tbody').empty();
		}
		return;
	}); */
	//alert("clicked"+clicked);
	if(clicked == 1){
		time=0;
		//alert("inside clicked");
		clearInterval(set_interval);
		//clicked=0;
		//alert(time);
	}
if(clicked==0){
if(time<=120){
	//alert("outside clicked");
	set_interval = setInterval(
		function ()
		{
			$.ajax({
			 url:    'hyst_table.jsp',
			 cache:   false,
			 data:{time:time},
			 success: function(hystData) {
				 hyst_data = eval('(' + hystData + ')');
				 if(hyst_data.hyst_data.length==0){
						time = time+2;
						return;
				 }
				 //alert(hyst_data.hyst_data[0].ttt);
				 hystTableData(hyst_data);
				 
			 }
		    //code goes here that will be run every 5 seconds.   
			}); 
			
		}, 650);
}
}
}


var row;
var count=0;
function hystTableData(hyst_data){
	
	/*if($('#hyst_table').children().length){

		$('#hyst_table tbody').empty();
	}*/
	if(hyst_data.hyst_data.length==0)
		return;
	for(var i= 0;i<hyst_data.hyst_data.length;i++){
		//alert(count);
		row = document.createElement('tr');
		var result = hyst_data.hyst_data[i];
		var myTable = document.getElementById("hyst_table");
		var tbody = document.getElementById("hyst_tbody");  
		// tbody = myTable.tbodies[0];
		
	    if ( tbody == null) {  
	        tbody = document.createElement("tbody");  
	        tbody.id = "hyst_tbody";  
	        document.getElementById("hyst_table").appendChild(tbody);        
	    }  
	    var docFragment = document.createDocumentFragment();  
	    var trElem, tdElem, txtNode, c1; 
	    
	    trElem = document.createElement("tr");  
	    trElem = tbody.insertRow(-1);
	    //trElem.id="CorrDetailTableDynTr";  
	
	    tdElem = document.createElement("td");
	    tdElem.id="Time";
	    txtNode = document.createTextNode(result.time);  
	    tdElem.appendChild(txtNode);
	    trElem.appendChild(tdElem);  
	  
	    tdElem = document.createElement("td");
	    tdElem.id="Name";
	    txtNode = document.createTextNode(result.name);  
	    tdElem.appendChild(txtNode);
	    trElem.appendChild(tdElem); 
	    
	    tdElem = document.createElement("td");
	    tdElem.id="Hysteresis";
	    txtNode = document.createTextNode(result.hysteresis);  
	    tdElem.appendChild(txtNode);
	    trElem.appendChild(tdElem);  
	    
	    tdElem = document.createElement("td");
	    tdElem.id="TTT";
	    txtNode = document.createTextNode(result.ttt);  
	    tdElem.appendChild(txtNode);  
	    trElem.appendChild(tdElem);  
	    
	    
	    docFragment.appendChild(trElem);  
	    tbody.appendChild(docFragment);
	    tbody.insertBefore(trElem, tbody.firstChild); 
	   
	}
	time = time+2;
}
