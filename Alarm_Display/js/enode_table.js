//Ajax call to fetch enode table data
var alarm_data = {};
var enodes = {};
var alarm_names = {};
var anr_data = {};
/*$.ajax({
	   $.get('enode_data.jsp',function(enodeData) {
		    	alarm_data = eval('(' + enodeData + ')');
		    	initial_tableData(alarm_data,null);
		    },'html');
	url:    'enode_data.jsp',
	 cache:   false,
	 success: function(enodeData) {
		  alarm_data = eval('(' + enodeData + ')');
		  
		  initial_tableData(alarm_data,null);
	 }
});*/


setInterval(
		function ()
		{
			$.ajax({
			 url:    'enode_data.jsp',
			 cache:   false, 
			 success: function(enodeData) {
				  alarm_data = eval('(' + enodeData + ')');
				  if(alarm_data.alarms.length == 0){
					  return;
				  }
				  initial_tableData(alarm_data,null);
			 }
		    //code goes here that will be run every 5 seconds.   
			});   
		}, 5000);



function enodeSelect(element,alarm_data){
	//$('a').click(function(e){
       // e.preventDefault();
       
        var enode_name = element.name;

        var root=document.getElementById('enode_table1');
    	var tab=document.createElement('table');
    	tab.className="enode_table1";
    	var th = document.createElement('thead');
    	var tbo=document.createElement('tbody');
    	var row, cell;
    	var majorct = 0;
    	var minorct = 0;
    	var criticalct = 0;
    	var wrct = 0;
    	var total = 0;
    	//alert("entered after click"+enode_name);
    	$.ajax({
    		  url:    'performance.jsp',
    		  cache:   false,
    		  async : false,
    		  data : {enode_name : enode_name},
    		  success: function(data,status) {
    			  //alert("success2");
    			  
    			  perf_data = eval('(' + data + ')');
    		      //alert(perf_data.perf);
    		      pie_data(perf_data,null); 
    		      area_data(perf_data,null);
    		  },
    			error: function(){
    				alert("failed");
    			}
    		});
    	 //to remove already present data
    	/*if($('#enode_table').children().length){

    		$('#enode_table tbody').empty();
    	}*/
    	//initial_tableData(alarm_data,enode_name);
    	pie_data(perf_data,enode_name);
    	area_data(perf_data,enode_name);
    // })
}
var count_table = 0;
var init = 0;
//call it again after one second

function alarmData(data_names){
	 var ecgi = null;
	$.ajax({
		  url:    'enode_data.jsp',
		  cache:   false,
		  success: function(enodeData) {
			  
			  /*if($('#navigation').children().length){

					$('#navigation').empty();
				}*/
			 
				for(var i=0;i<data_names.enodeb.length;i++){
					var result = data_names.enodeb[i];
					var name = (result.alarm);
					for(var j=0;j<anr_data.anrs.length;j++){
						
					if(name == anr_data.anrs[j].name){
						//alert(anr_data.anrs[j].name+"\n name "+name+"\n ecgi " +anr_data.anrs[j].ecgi );
						ecgi = anr_data.anrs[j].ecgi;
					}
					
					}
					//if(ecgi != null){
						$("#expList1").append("<li class='collapsed expanded'><img alt=''src='enode_b.PNG' height='15px' width='15px'><a href='#' onclick='enodeSelect(this,alarm_data)' name="+result.alarm+">"+name+"</a><ul><li>"+ecgi+"</li></ul></li>");
						ecgi = null;
					//}
					/*else{
						$("#expList1").append("<li class='collapsed expanded'><img alt=''src='enode_b.PNG' height='15px' width='15px'><a href='#' onclick='enodeSelect(this,alarm_data)' name="+result.alarm+">"+name+"</a><ul><li>"+null+"</li></ul></li>");

					}*/
					/*$("#navigation").append("<ul ><li><img alt='' src='enode_b.PNG' height='15px' width='15px'><a href='#' onclick='enodeSelect(this,alarm_data)' name="+result.alarm+">"+name+"</a>" +
							"" +
							"<ul><li>EPC</li></ul><ul><li>EPC</li></ul></li></ul>");*/
					/*$("#enode_data").append("<ul id='navigation' style='text-align: left;padding-left: 20px;color: red;font-size: 12px;'> "+
					 "<li>Sub Network"+
					 	"<ul><li>Enb1</li></ul>"+
					 	"<ul><li>Enb2</li></ul>"+
					 "</li>"+
					 "<li>"+
					 	"ENB3"+
					 "</li>"+"</ul>");*/
					
					//prepareList(i);
					
				}
				
				prepareList();
				alarm_data = eval('(' + enodeData + ')');
				
				initial_tableData(alarm_data,null);
				
				//setTimeout(initial_tableData, 15000);
				//setTimeout(initial_tableData, 15000);
				
		  },
			error: function(){
				alert("failed");
			}
		});

}
//setInterval(initial_tableData(alarm_data,null),10000);
//setInterval( 
function initial_tableData(alarm_data,enode_name){
	//alert(alarm_data.alarms);
	if(alarm_data.alarms == undefined){
		return;
	}
    var root=document.getElementById('enode_table1');
	var tab=document.createElement('table');
	tab.className="enode_table1";
	var th = document.createElement('thead');
	var tbo=document.createElement('tbody');
	var row, cell;
	var majorct = 0;
	var minorct = 0;
	var criticalct = 0;
	var wrct = 0;
	var total = 0;
	//if(alarm_data.alarms.length-count_table>10){
	if($('#enode_table').children().length){

		$('#enode_table tbody').empty();
	}
	//}
	//alert("before"+count_table);
	if(alarm_data.alarms.length-count_table<10){
		//alert("entered");
		count_table = count_table - 10;
	}
	//alert("after"+count_table);
	//for(var i=0;i<alarm_data.alarms.length;i++){
	for(var i= count_table;i<10+count_table;i++){
	//for(var i= 0 ; i<100;i++){

		row = document.createElement('tr');
		var result = alarm_data.alarms[i];
		var time = result.occurTime;
		//alert(time);
		var occur_time_arr = time.split("/s");
		
		var date = occur_time_arr[0];
		//alert(date);
		//var date = new Date(time.replace(/(\d{2})(\d{2})(\d{2})(\d{6})/,'$3-$2-$1'));
		//var date = "" ;
		//var final_data = date.getDate()+date.getMonth()+date.getFullYear()+date.getHours()+date.getMinutes()+date.getSeconds()+date.getMilliseconds();
		
		if(enode_name == null ){
			enode_name = result.enodeb;
		}
		//alert("enode_name in initdata is "+enode_name+" resultname is "+result.enodeb);
		//if(enode_name == result.enodeb){
		var myTable = document.getElementById("enode_table");
		var tbody = document.getElementById("enode_tbody");  
		// tbody = myTable.tbodies[0];
		
	    if ( tbody == null) {  
	        tbody = document.createElement("tbody");  
	        tbody.id = "enode_tbody";  
	        document.getElementById("enode_table").appendChild(tbody);        
	    }  
	    var docFragment = document.createDocumentFragment();  
	    var trElem, tdElem, txtNode, c1; 
	    
	    trElem = document.createElement("tr");  
	    trElem = tbody.insertRow(-1);
	    //trElem.id="CorrDetailTableDynTr";  
	    tdElem = document.createElement("td");
	    tdElem.id="check";
	    c1 = document.createElement('input');
        c1.type = "checkbox";
        c1.id = "check1";  
        tdElem.appendChild(c1);
        tdElem.className = "green";
        trElem.appendChild(tdElem);
        
        
	    tdElem = document.createElement("td");
	    tdElem.id="managedObject";
	    txtNode = document.createTextNode(result.managedObject);  
	    tdElem.appendChild(txtNode);
	    trElem.appendChild(tdElem);  
	  
	    tdElem = document.createElement("td");
	    tdElem.id="perceivedSeiviarity";
	    txtNode = document.createTextNode(result.perceivedSeiviarity);  
	    tdElem.appendChild(txtNode);
	    trElem.appendChild(tdElem); 
	    
	    tdElem = document.createElement("td");
	    tdElem.id="probableCause";
	    txtNode = document.createTextNode(result.probableCause);  
	    tdElem.appendChild(txtNode);
	    trElem.appendChild(tdElem);  
	    
	    tdElem = document.createElement("td");
	    tdElem.id="specificProblem";
	    txtNode = document.createTextNode(result.specificProblem);  
	    tdElem.appendChild(txtNode);  
	    trElem.appendChild(tdElem);  
	    
	    tdElem = document.createElement("td");
	    tdElem.id="eventType";
	    txtNode = document.createTextNode(result.eventType);  
	    tdElem.appendChild(txtNode);  
	    trElem.appendChild(tdElem);  
	    
	    tdElem = document.createElement("td");
	    tdElem.id="occurTime";
	    txtNode = document.createTextNode(date);  
	    tdElem.appendChild(txtNode);  
	    trElem.appendChild(tdElem);  
	    trElem.className = "green";  
	    
	    if(result.perceivedSeiviarity == 'MAJOR'){
	    	trElem.className = "green";  
	    }
	    else if(result.perceivedSeiviarity == 'MINOR'){
	    	trElem.className = "yellow";
	    }
	    else if(result.perceivedSeiviarity == 'CRITICAL'){
	    	trElem.className = "pink";  
	    }
	    
	    docFragment.appendChild(trElem);  
	    tbody.appendChild(docFragment);
	    tbody.insertBefore(trElem, tbody.firstChild);  
		
		if(result.perceivedSeiviarity == 'MAJOR' ){
			
			majorct=majorct+1;
			
			var result_clr = $('#enode_table tr').find('td:contains(MAJOR)');
			
			result_clr.siblings().css('background-color', '#FF9655');//#FF9655
			result_clr.css('background-color', '#FF9655');
		}
		if(result.perceivedSeiviarity == 'MINOR'){
			minorct=minorct+1;
			var result_clr = $('#enode_table tr').find('td:contains(MINOR)');
			
			result_clr.siblings().css('background-color', '#FFF263');
			result_clr.css('background-color', '#FFF263');
			
		}
		if(result.perceivedSeiviarity == 'CRITICAL'){
			criticalct=criticalct+1;
			
			var result_clr = $('#enode_table tr').find('td:contains(CRITICAL)');
			
			result_clr.siblings().css('background-color', '#ed561b');
			result_clr.css('background-color', '#ed561b');
			
			
		}
		if(result.perceivedSeiviarity == 'WARNING'){
			wrct=wrct+1;
			var result_clr = $('#enode_table tr').find('td:contains(WARNING)');
			
			result_clr.siblings().css('background-color', '#50B432');
			result_clr.css('background-color', '#50B432');
		}
	}
	//}
	totalct = majorct+minorct+criticalct+wrct;

	$("#Critical").val(criticalct);
	$("#Major").val(majorct);
	$("#Minor").val(minorct);
	$("#Warning").val(wrct);
	$("#Total").val(totalct);	
	count_table = count_table+10;
	
//}
}
//, 10000);


function table_color(){
	
	var result = $('#enode_table tr').find('td:contains(CRITICAL)');
	result.css('background-color', 'green');
}
$.ajax({
	  url:    'enode_names.jsp',
	  cache:   false,
	  success: function(data,status) {
		  //alert("success2");
		  alarm_names = eval('(' + data + ')');
	      alarmData(alarm_names);
	  },
		error: function(){
			alert("failed");
		}
	});




$.ajax({
	  url:    'performance.jsp',
	  cache:   false,
	  async : false,
	  data:{enode_name:'eNB1'},
	  success: function(data,status) {
		  //alert("success2");
		  perf_data = eval('(' + data + ')');
	     // alert(perf_data.perf);
	      pie_data(perf_data,null); 
	      area_data(perf_data,null);
	  },
		error: function(){
			alert("failed");
		}
	});

$.ajax({
	  url:    'anr_data.jsp',
	  cache:   false,
	  async : false,
	  success: function(data,status) {
		  //alert("success2");
		  anr_data = eval('(' + data + ')');
	      //alert(anr_data.anrs[0].ecgi);
	      
	  },
		error: function(){
			alert("failed");
		}
	});

var chart;
var perf_data = {};



function pie_data(perf_data,enode_name){
	var pp = 0;
	var ho =0;
	var cd =0;
	var tc =0;
	var rf = 0;
	var rs = perf_data.perf;
	if(enode_name == null){
		enode_name = rs[0].alarm_name;
	}

	for(var i=0;i<perf_data.perf.length;i++){
	//for(var i=0;i<100;i++){
		//if(enode_name == rs[i].alarm_name){

		pp = pp+rs[i].PP;
		ho = ho+rs[i].HO;
		cd = cd+rs[i].CD;
		rf = rf+rs[i].RF;
		tc = tc+rs[i].TC;
		
	//}
	}
	//alert(pp+"\t"+ho+"\t"+cd+"\t"+rf+"\t"+tc);
	var total = pp+ho+cd+rf+tc;
	pp = (pp/total)*100;
	ho = (ho/total)*100;
	cd = (cd/total)*100;
	rf = (rf/total)*100;
	tc = (tc/total)*100;
	var todayTimeStamp = new Date();
	var oneDayTimeStamp = 1000 * 60 * 60 * 24; // Milliseconds in a day
	var diff = todayTimeStamp - oneDayTimeStamp;
	var yesterdayDate = new Date(diff);
	var yesterdayString = yesterdayDate.getFullYear() + '-' + (yesterdayDate.getMonth() + 1) + '-' + yesterdayDate.getDate();
	//alert("outside"+yesterdayString);
	var occur_time = yesterdayString;
	
	pieChart(pp,ho,cd,tc,enode_name,occur_time);
	
}
function area_data(perf_data,enode_name){
	var rs = perf_data.perf;
	var occur_time1 = [];
	var pp = [];
	var occur_time2 = [];
	var cd = [];
	var occur_time3 = [];
	var ho = [];
	var a1=0;
	var a2=0;
	var a3=0;
	var todayTimeStamp = new Date();
	var oneDayTimeStamp = 1000 * 60 * 60 * 24; // Milliseconds in a day
	var diff = todayTimeStamp - oneDayTimeStamp;
	var yesterdayDate = new Date(diff);
	var yesterdayString = yesterdayDate.getFullYear() + '-' + (yesterdayDate.getMonth() + 1) + '-' + yesterdayDate.getDate();
	//alert("outside"+yesterdayString);
	if(enode_name == null){
		enode_name = rs[0].alarm_name;
	}
	var occur_time = yesterdayString;
	//alert(occur_time);
	for(var i=0;i<perf_data.perf.length;i++){
	//for(var i=0;i<100;i++){
		
		//if(enode_name == rs[i].alarm_name){
			//var occur_time = rs[i].occurTime;
			
			//var occur_time_arr = occur_time.split(" ");
			//occur_time1[a1] = occur_time_arr[3];
			pp[a1] = rs[i].PP;
			ho[a1] = rs[i].HO;
			cd[a1] = rs[i].CD;
			a1++;
		//}
		
		
	}
	//alert("occur_time "+occur_time+"\tCD"+cd+"\tCD"+pp+"\tCD"+ho);
	areaChart(occur_time,pp,cd,ho,enode_name);
	
}

function pieChart(pp,ho,cd,tc,enode_name,occur_time){
$(function () {
    
    
    $(document).ready(function () {
    	//Highcharts.setOptions(Highcharts.theme);
    	Highcharts.setOptions({
    	     colors: ['#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263',      '#6AF9C4']
    	    });
    	// Build the chart
        $('#pie_chart').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: true,
                width: 500
            },
            title: {
                text: enode_name +'<br>'+occur_time+' (10:00-23:59)'
            },
            tooltip: {
        	    pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                    	style: { fontSize: '10px' },
                        enabled: true,
                        distance: -20,
                        format: '{point.y:.0f}%'
                    },
                    showInLegend: true
                },
                
            
            },
            legend: {
            	align : 'right',
            	verticalAlign : 'bottom',
            	layout : 'vertical'
            },
            series: [{
                type: 'pie',
                name: 'Performance',
                data: [
                    ['TotalCall',   tc],
                    ['Handover Failure',       ho],
                    ['Call Drop',    cd],
                    ['Pingpong failure',     pp]
                ]
            }]
        });
    });
    
});
}

function areaChart(occur_time,pp,cd,ho,enode_name){
	$(function () {
		//highcharts.setOptions(Highcharts.theme);
		//chart = new HighCharts.Chart(
				//{
		//alert("entered");
	        $('#area_chart').highcharts({
	            chart: {
	            	width: 460,
	                type: 'areaspline'
	            },
	            title: {
	                text: enode_name +'<br>'+occur_time+' (10:00-23:59)'
	            },
	            legend: {
	                //layout: 'vertical',
	                //align: 'left',
	                //verticalAlign: 'bottom',
	                //x: 150,
	                //y: 100,
	                //floating: true,
	                //borderWidth: 1,
	                //backgroundColor: '#FFFFFF'
	            },
	            xAxis: {
	                
	            	/*title: {
	            		text: occur_time
	            	}*/
	            
	            },
	            yAxis: {
	                title: {
	                    text: 'Counters'
	                }
	               
	        	    
	            },
	            tooltip: {
	                shared: true,
	                valueSuffix: ' units'
	            },
	            credits: {
	                enabled: false
	            },
	            plotOptions: {
	                areaspline: {
	                    fillOpacity: 0.5
	                },
	                series: {
	                	lineWidth:1,
	                    marker: {
	                        /*enabled: false*/
	                    	radius:2
	                    }
	                }
	            },
	            series: [{
	                name: 'Pingpong failure',
	                data: pp
	            }, {
	                name: 'Call Drop',
	                data: cd
	            },
	            {
	                name: 'Handover failure',
	                data: ho
	            }
	            ]
	        });
	    });
	

}


/* Expand-Collapse code written by 
 * Prathyusha Vanka the great!!
 * on January 30, 2014 */
function prepareList() {
	
	  $('#expList').find('li:has(ul)').click( function(event) {
		  
	      if (this == event.target) {
	        $(this).toggleClass('expanded');
	        $(this).children('ul').toggle('medium');
	      }
	      return false;
	    })
	    .addClass('collapsed').children('ul').hide();

	        //Create the toggle 
	        var toggle = false;
	    $('#listToggle').unbind('click').click(function(ev){
	    	//alert("I'm in toggle LIST **********");
	    	//alert(i);
	        if(toggle == false){
	          $('li.collapsed').addClass('expanded');
	          $('li li.collapsed').parent().show('medium');
	          //$('#listToggle').text("+");
	          //alert("Collapsed");
	          toggle = true;
	        }else{
	          $('li.collapsed').removeClass('expanded');
	          $('li li.collapsed').parent().hide('medium');
	          //$('#listToggle').text("-");
	          toggle = false;          
	        }
	      });

	  $('#expList').find('li').click( function(event) {
	    siteUrl =  $(this).attr('value');
	      
	              return false;
	    });
	}

/*function prepareList(i) {
	alert("I'm in PREPARE LIST **********");
	  $('#expList'+i).find('li:has(ul)').click( function(event) {
	      if (this == event.target) {
	        $(this).toggleClass('expanded');
	        $(this).children('ul').toggle('medium');
	      }
	      return false;
	    })
	    .addClass('collapsed').children('ul').hide();

	        //Create the toggle 
	        var toggle = false;
	    $('#listToggle'+i).unbind('click').click(function(ev){
	    	alert("I'm in toggle LIST **********");
	        if(toggle == false){
	          $('li.collapsed').addClass('expanded');
	          $('li li.collapsed').parent().show('medium');
	          $('#listToggle').text("Collapse All");
	          toggle = true;
	        }else{
	          $('li.collapsed').removeClass('expanded');
	          $('li li.collapsed').parent().hide('medium');
	          $('#listToggle').text("Expand All");
	          toggle = false;          
	        }
	      });

	  $('#expList').find('li').click( function(event) {
	    siteUrl =  $(this).attr('value');
	      
	              return false;
	    });
	}*/
