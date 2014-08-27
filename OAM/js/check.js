//Ajax call to fetch enode table data
var alarm_data = {};
function enodeSelect(element){
		$('a').click(function(e){
        e.preventDefault();
        //to remove already present data
        //$('#enode_table tbody > tr').remove();
        var enode_name = this.name;
        var root=document.getElementById('enode_table1');
    	var tab=document.createElement('table');
    	tab.className="enode_table1";
    	var tbo=document.createElement('tbody');
    	var row, cell;
    	alert("outside entered"+$('#enode_table1').children().length);
    	if($('#enode_table1').children().length){
    		alert("entered"+$('#enode_table1').children().length);
    		$('#enode_table1').empty();
    	}
    	for(var i=0;i<alarm_data.alarms.length;i++){
    		row = document.createElement('tr');
    			//var result = alarm_data.alarms[i];
    			var time = "131212121212";
    			var date = new Date(time.replace(/(\d{2})(\d{2})(\d{2})(\d{6})/,'$3-$2-$1'));
    			row=document.createElement('tr');
    			
    				cell=document.createElement('td');
    				cell.appendChild(document.createTextNode("result.managedObject"));
    				row.appendChild(cell);
    				cell.appendChild(document.createTextNode("result.perceivedSeiviarity"));
    				row.appendChild(cell);
    				cell.appendChild(document.createTextNode("result.probableCause"));
    				row.appendChild(cell);
    				cell.appendChild(document.createTextNode("result.specificProblem"));
    				row.appendChild(cell);
    				cell.appendChild(document.createTextNode("result.eventType"));
    				row.appendChild(cell);
    				cell.appendChild(document.createTextNode("date"));
    				row.appendChild(cell);
    				
    			
    			tbo.appendChild(row);

    			//$('#enode_table tbody > tr').remove();
    			//if(enode_name == result.alarmId){
    			/*$("#managedObject").append("<li>"+result.managedObject+"</li>");
    			$("#perceivedSeiviarity").prepend("<li>"+result.perceivedSeiviarity+"</li>");
    			$("#probableCause").append("<li>"+result.probableCause+"</li>");
    			$("#specificProblem").append("<li>"+result.specificProblem+"</li>");
    			$("#eventType").append("<li>"+result.eventType+"</li>");
    			$("#occurTime").prepend("<li>"+date+"</li>");*/
    		//}
    			
    	}
    	tab.appendChild(tbo);
    	root.appendChild(tab);
     });
}
function alarmData(data){	
	alert("came");
			$("#enode_data").append("<li><a href='#' onclick='enodeSelect(this)' name=101>"+101+"</a></li>");
	
		
}

$(document).ready(function(){
	alert("done");
	alarmData("101");
});





