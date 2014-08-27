
var chart;
var perf_data = {};
var pp = 0;
var ho =0;
var cd =0;
var tc =0;
var rf = 0;
$.ajax({
	  url:    'performance.jsp',
	  cache:   false,
	  async : false,
	  success: function(data,status) {
		  //alert("success2");
		  perf_data = eval('(' + data + ')');
	     // alert(perf_data.perf);
	      pie_data(perf_data); 
	      area_data(perf_data);
	  },
		error: function(){
			alert("failed");
		}
	});

function pie_data(perf_data){
	//alert("alarm_data is"+enode_global);
	var rs = perf_data.perf;
	
	for(var i=0;i<perf_data.perf.length;i++){
		pp = pp+rs[i].PP;
		ho = ho+rs[i].HO;
		cd = cd+rs[i].CD;
		rf = rf+rs[i].RF;
		tc = tc+rs[i].TC;
	}
	//alert(pp+"\t"+ho+"\t"+cd+"\t"+rf+"\t"+tc);
	var total = pp+ho+cd+rf+tc;
	pp = (pp/total)*100;
	ho = (ho/total)*100;
	cd = (cd/total)*100;
	rf = (rf/total)*100;
	tc = (tc/total)*100;
	pieChart(pp,ho,cd,rf,tc);
	
}
function area_data(perf_data){
	//alert("area");
	var rs = perf_data.perf;
	var occur_time1 = [];
	var cd1 = [];
	var occur_time2 = [];
	var cd2 = [];
	var occur_time3 = [];
	var cd3 = [];
	var a1=0;
	var a2=0;
	var a3=0;
	for(var i=0;i<perf_data.perf.length;i++){
		var occur_time = rs[i].occurTime;
		var occur_time_arr = occur_time.split(" ");
		occur_time1[i] = occur_time_arr[2];
		if(rs[i].alarm_name == 'alarm'){
			
			
			cd1[a1] = rs[i].CD;
			a1++;
		}
		if(rs[i].alarm_name == 'alarm1'){
			
			//occur_time2[i] = rs[i].occurTime;
			cd2[a2] = rs[i].CD;
			//alert("cd2"+cd2[a2]);
			a2++;
		}
		if(rs[i].alarm_name == 'alarm2'){
			
			//occur_time3[i] = rs[i].occurTime;
			cd3[a3] = rs[i].CD;
			
			//alert("cd3"+cd3[a3]);
			a3++;
		}
	}
	//alert("occur_time "+occur_time1[0]+"\tCD"+cd1[0]+"\tCD"+cd2[0]+"\tCD"+cd3[0]);
	areaChart(occur_time1,cd1,cd2,cd3);
	
}
function pieChart(pp,ho,cd,rf,tc){
$(function () {
    
    
    $(document).ready(function () {
    	Highcharts.setOptions({
    	     colors: ['#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263',      '#6AF9C4']
    	    });
    	// Build the chart
        $('#pie_chart').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: true
            },
            title: {
                text: 'Performance Management'
            },
            tooltip: {
        	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
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
                    ['Pingpong failure',     pp],
                    ['RF conjestion',   rf]
                ]
            }]
        });
    });
    
});
}

function areaChart(occur_time1,cd1,cd2,cd3){
	$(function () {
	        $('#area_chart').highcharts({
	            chart: {
	                type: 'areaspline'
	            },
	            title: {
	                text: 'HO Failure'
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
	                categories: occur_time1,
	                plotBands: [{ 
	                    from: 4.5,
	                    to: 6.5,
	                    color: 'rgba(68, 170, 213, .2)'
	                }]
	            },
	            yAxis: {
	                title: {
	                    text: 'HO failure'
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
	                }
	            },
	            series: [{
	                name: 'alarm',
	                data: cd1
	            }, {
	                name: 'alarm1',
	                data: cd2
	            },
	            {
	                name: 'alarm2',
	                data: cd3
	            }
	            ]
	        });
	    });
	    

}