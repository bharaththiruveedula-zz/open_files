var pp_array = new Array();
var cd_array = new Array();
var ho_array = new Array();

var chart;
var count1 = 1;
var start_count1 = 1;
$.ajax({
	
	  url:    'getId.jsp',
	  cache:   false,
	  success: function(data,status) {
		  var id_val = eval('('+data+')');
		  count1 = id_val.id[0].id;
		  start_count1 = id_val.id[0].id;
	  },
		error: function(){
			alert("failed");
		},
		
	});
function pp_son_data(pp_data){
	//Ajax call to fetch HO_SON table data
	
	 // ho_data = eval('('+data+')');
	  
	  for (var i = 0;i < pp_data.hos.length; i++) {
		  var data_list = new Array();
            data_list.push(pp_data.hos[i].time);
            data_list.push(pp_data.hos[i].PP);
           
            pp_array[i] = data_list;
            
	  }
	 // alert('Data_array after for loop is'+data_array);
	 
     return pp_array;
    	
}

function cd_son_data(pp_data){
		  
	  for (var i = 0;i < pp_data.hos.length; i++) {
		  var data_list = new Array();
            data_list.push(pp_data.hos[i].time);
            data_list.push(pp_data.hos[i].CD);
           
            cd_array[i] = data_list;
            
	  }
	
     return pp_array;
    	
}

function ho_son_data(pp_data){
	
	  
	  for (var i = 0;i < pp_data.hos.length; i++) {
		  var data_list = new Array();
            data_list.push(pp_data.hos[i].time);
            data_list.push(pp_data.hos[i].HO);
           
            ho_array[i] = data_list;
            
	  }
		 
     return ho_array;
    	
}


function pp_data(){
$.ajax({
	
	  url:    'WSON_jsp.jsp',
	  cache:   false,
	  data:{id:count1},
	  success: function(data,status) {
		  my_pp_data = eval('('+data+')');
		  //alert("ppdata laoded in wson");
		  pp_son_data(my_pp_data);
		  cd_son_data(my_pp_data);
		  ho_son_data(my_pp_data);
		  
		 /* var series = chart.series[0],
          shift = series.data.length > 120; // shift if the series is 
  */
          
          var flag = true;
          if ($('#pause:checked').length > 0) 
        	  flag = false;
          else
        	  {
        	  for(var i=0;i<pp_array.length;i++)
         	     //  chart.series[0].addPoint(pp_array[i],true, shift );
                    chart.series[0].addPoint(pp_array[i],true);
        	  
        	  for(var i=0;i<cd_array.length;i++)
        		    chart.series[1].addPoint(cd_array[i],true);
        	  
        	  for(var i=0;i<ho_array.length;i++)
      		        chart.series[2].addPoint(ho_array[i],true); 
            
        	  }
             
            count1= count1+1;
      //call it again after one second
      setTimeout(pp_data, 500);  
	  },
		error: function(){
			alert("failed");
		},
		
	});
}
$(document).ready(function(){
	chart_display();
});

function chart_display(){

	$(function () {
	 	
	chart = new Highcharts.Chart(
			{
       	chart: {
       	 renderTo: 'container2',
            type: 'line',
            zoomType : 'xy',
            events: {}
        },
    	
    	title: {
    		style: {
        
        		fontWeight: 'bold'
    			},
    		text: 'Network Performance',
    		x: -20 //center
		},
		subtitle: {
    		style: {
       
        		fontWeight: 'bold'
    			},
    		 text: 'with out SON',
    		 x: -20
		},
		plotOptions: {
			series : {
				marker : {
					enabled : false
				}
			}
		},
		xAxis: {
			title: {
	        	        enabled: true,
	        	        text: 'Time',
	        	        //type: 'datetime',
	        	         align: 'high',
	        	        
	        	        style: {
	        		            fontWeight: 'bold'
	        		        }
	        	    },
	               
	                tickPixelInterval: 150
	     },
	     yAxis: {
	                title: {
	                    text: 'Percentage'
	                },
	                plotLines: [{
	                    value: 0,
	                    width: 1,
	                    color: '#808080'}]
	            },
	            tooltip: {
	            	
	                formatter: function() {
	                    return '<b>Time:</b>' + Highcharts.numberFormat(this.x, 2) + '<br/><b>'+this.series.name +':</b>' + Highcharts.numberFormat(this.y, 2)+'<b>%</b>';
	                }
	     },       
        
        legend: {}
           			                   
            });

});

}



function chart_display2(){
$(function () {
	 	var p = $('#pause2');
		var p_b =$('#pause_button2');
		$("#pause_button2").attr("enabled","enabled");
		
	        p_b.click(function(){
	            p.click();
	        
	           if(p_b.val()=="Pause")
	             {
		      p_b.attr('value','Play');
	              p_b.css("background-color","blue");
		
	 	     }
	           else
	             {
	              p_b.attr('value','Pause');
		      p_b.css("background-color","red");
		
		  }
	        });
	        
	chart = new Highcharts.Chart(
			{
       	chart: {
       	 renderTo: 'container2',
            type: 'line',
            zoomType : 'xy',
            events: {
            	load : pp_data()
            }
        },
    	
    	title: {
    		style: {
        
        		fontWeight: 'bold'
    			},
    		text: 'Network Performance',
    		x: -20 //center
		},
		subtitle: {
    		style: {
       
        		fontWeight: 'bold'
    			},
    		 text: 'without SON',
    		 x: -20
		},
		plotOptions: {
			series : {
				lineWidth:1,
				marker : {
					enabled : false
				}
			}
		},
		xAxis: {
			title: {
	        	        enabled: true,
	        	        text: 'Time',
	        	        //type: 'datetime',
	        	         align: 'high',
	        	        
	        	        style: {
	        		            fontWeight: 'bold'
	        		        }
	        	    },
	        	    ordinal: false,
	                max:120,
	                min:0,
	               
	                tickPixelInterval: 50
	     },
	     yAxis: {
	                title: {
	                    text: 'Percentage'
	                },
	                ordinal: false,
	                max:13,
	                min:0,
	                plotLines: [{
	                    value: 0,
	                    width: 1,
	                    color: '#808080'}]
	            },
	            
	    tooltip: {
	            	
	                formatter: function() {
	                    return '<b>Time:</b>' + Highcharts.numberFormat(this.x, 2) + '<br/><b>'+this.series.name +':</b>' + Highcharts.numberFormat(this.y, 2)+'<b>%</b>';
	                }
	     },       
        
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'PP',
            data:  []
            			
            },
            {
            name: 'CD',
            data: []
            },
            {
            name: 'HO',
            data: []
            },
            
            ]
            			                   
            });
	
	$('#clear_button').click(function() {
		count1 = start_count1;
		time = 2;
	    var chart = $('#container2').highcharts();
	    if($('#hyst_table').children().length){

			$('#hyst_table tbody').empty();
		}
//	$("#pause_button").attr("disabled","disabled");
	   /* if (chart.series.length) {

	  
	    chart.series[0].setData([]);
	    chart.series[1].setData([]);
	    chart.series[2].setData([]);
	    }*/
		chart_display();
	    
	});
	   
	
});
}

function start_chart2(){
	//alert("inside chart");
	count1 = start_count1;
	chart_display2();

}

/**
 * Gray theme for Highcharts JS
 * @author Torstein Hønsi
 */

Highcharts.theme = {
   colors: ["#DDDF0D", "#7798BF", "#55BF3B", "#DF5353", "#aaeeee", "#ff0066", "#eeaaee",
      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
   chart: {
      backgroundColor: {
         linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
         stops: [
            [0, 'rgb(96, 96, 96)'],
            [1, 'rgb(16, 16, 16)']
         ]
      },
      borderWidth: 0,
      borderRadius: 15,
      plotBackgroundColor: null,
      plotShadow: false,
      plotBorderWidth: 0
   },
   title: {
      style: {
         color: '#FFF',
         font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
      }
   },
   subtitle: {
      style: {
         color: '#DDD',
         font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
      }
   },
   xAxis: {
      gridLineWidth: 0,
      lineColor: '#999',
      tickColor: '#999',
      labels: {
         style: {
            color: '#999',
            fontWeight: 'bold'
         }
      },
      title: {
         style: {
            color: '#AAA',
            font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
         }
      }
   },
   yAxis: {
      alternateGridColor: null,
      minorTickInterval: null,
      gridLineColor: 'rgba(255, 255, 255, .1)',
      minorGridLineColor: 'rgba(255,255,255,0.07)',
      lineWidth: 0,
      tickWidth: 0,
      labels: {
         style: {
            color: '#999',
            fontWeight: 'bold'
         }
      },
      title: {
         style: {
            color: '#AAA',
            font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
         }
      }
   },
   legend: {
      itemStyle: {
         color: '#CCC'
      },
      itemHoverStyle: {
         color: '#FFF'
      },
      itemHiddenStyle: {
         color: '#333'
      }
   },
   labels: {
      style: {
         color: '#CCC'
      }
   },
   tooltip: {
      backgroundColor: {
         linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
         stops: [
            [0, 'rgba(96, 96, 96, .8)'],
            [1, 'rgba(16, 16, 16, .8)']
         ]
      },
      borderWidth: 0,
      style: {
         color: '#FFF'
      }
   },


   plotOptions: {
      series: {
         shadow: true
      },
      line: {
         dataLabels: {
            color: '#CCC'
         },
         marker: {
            lineColor: '#333'
         }
      },
      spline: {
         marker: {
            lineColor: '#333'
         }
      },
      scatter: {
         marker: {
            lineColor: '#333'
         }
      },
      candlestick: {
         lineColor: 'white'
      }
   },

   toolbar: {
      itemStyle: {
         color: '#CCC'
      }
   },

   navigation: {
      buttonOptions: {
         symbolStroke: '#DDDDDD',
         hoverSymbolStroke: '#FFFFFF',
         theme: {
            fill: {
               linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
               stops: [
                  [0.4, '#606060'],
                  [0.6, '#333333']
               ]
            },
            stroke: '#000000'
         }
      }
   },

   // scroll charts
   rangeSelector: {
      buttonTheme: {
         fill: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
               [0.4, '#888'],
               [0.6, '#555']
            ]
         },
         stroke: '#000000',
         style: {
            color: '#CCC',
            fontWeight: 'bold'
         },
         states: {
            hover: {
               fill: {
                  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                  stops: [
                     [0.4, '#BBB'],
                     [0.6, '#888']
                  ]
               },
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            },
            select: {
               fill: {
                  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                  stops: [
                     [0.1, '#000'],
                     [0.3, '#333']
                  ]
               },
               stroke: '#000000',
               style: {
                  color: 'yellow'
               }
            }
         }
      },
      inputStyle: {
         backgroundColor: '#333',
         color: 'silver'
      },
      labelStyle: {
         color: 'silver'
      }
   },

   navigator: {
      handles: {
         backgroundColor: '#666',
         borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(16, 16, 16, 0.5)',
      series: {
         color: '#7798BF',
         lineColor: '#A6C7ED'
      }
   },

   scrollbar: {
      barBackgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
               [0.4, '#888'],
               [0.6, '#555']
            ]
         },
      barBorderColor: '#CCC',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
               [0.4, '#888'],
               [0.6, '#555']
            ]
         },
      buttonBorderColor: '#CCC',
      rifleColor: '#FFF',
      trackBackgroundColor: {
         linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
         stops: [
            [0, '#000'],
            [1, '#333']
         ]
      },
      trackBorderColor: '#666'
   },

   // special colors for some of the demo examples
   legendBackgroundColor: 'rgba(48, 48, 48, 0.8)',
   legendBackgroundColorSolid: 'rgb(70, 70, 70)',
   dataLabelsColor: '#444',
   textColor: '#E0E0E0',
   maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
var highchartsOptions = Highcharts.setOptions(Highcharts.theme);




      
