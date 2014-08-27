var canvas;// = document.getElementById("canvas");
var paper;// = new Raphael(canvas,"100%","100%");
//alert(paper+"--------"+canvas);
var cx = 40, cy = 40, rect_w = 100, rect_h = 40;
var rect = new Array();
var temp_x = new Array();
var swim_lanes = new Array();
var actors = ["UE", "Source eNodeB", "Cloud", "Target eNodeB", "OAM"];
var count = 0;


document.addEventListener('DOMContentLoaded',start,false);
/*$(document).ready(function(){
start();
});*/
var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+

var isChrome = !!window.chrome ;  // Chrome 1+
function start(){
		var t;
		canvas = document.getElementById("canvas");
		paper = new Raphael(canvas,"100%","100%");
		for( var i=0; i < 5; i++) {
			rect[i] = paper.rect(cx+(cx*4*i), cy, rect_w, rect_h, 10).attr({"fill":"#dce9f9"});
			temp_x[i] = cx+(cx*4*i)+rect_w/2;
			var temp2 = cy+rect_h;
			//swim_lanes[i] = paper.path("M "+temp_x[i]+" "+temp2+" L "+temp_x[i]+" 470");    //paper.path("M 20 20 L 100 170").attr({stroke: 'black'});
			if(isFirefox == true){
				t = paper.text(cx+(cx*4*i)+rect_w/2, cy+(rect_h/2), actors[i]).insertAfter(rect[i]).attr({"font-size":12,"font-weight":"bold"});
			}
			if(isChrome == true){
				t = paper.text(cx+(cx*4*i)+rect_w/2, cy-(rect_h/4), actors[i]).insertAfter(rect[i]).attr({"font-size":12,"font-weight":"bold"});
			}
		}
}
function sequence_diagram(source,target,status){
		var t;
		//alert("source"+source+"\ntarget "+target+"\n status "+status);
		canvas = document.getElementById("canvas");
		paper = new Raphael(canvas,"100%","100%");
		count = 0;
		actors[1] = source;
		actors[3] = target;
		for( var i=0; i < 5; i++) {
			rect[i] = paper.rect(cx+(cx*4*i), cy, rect_w, rect_h, 10).attr({"fill":"#dce9f9"});
			temp_x[i] = cx+(cx*4*i)+rect_w/2;
			var temp2 = cy+rect_h;
			swim_lanes[i] = paper.path("M "+temp_x[i]+" "+temp2+" L "+temp_x[i]+" 720");    //paper.path("M 20 20 L 100 170").attr({stroke: 'black'});
			if(isFirefox == true){
				t = paper.text(cx+(cx*4*i)+rect_w/2, cy+(rect_h/2), actors[i]).insertAfter(rect[i]).attr({"font-size":12,"font-weight":"bold"});
			}
			if(isChrome == true){
				t = paper.text(cx+(cx*4*i)+rect_w/2, cy+(rect_h/2), actors[i]).insertAfter(rect[i]).attr({"font-size":12,"font-weight":"bold"});
			}
		}
		action_lines(status);
}

function sequence(source,target,status){ var status= true; myFunction(source,target,status); }

function action_lines(status) {
    var iter = 0;
    var frst_act_hgt = cy+rect_h + 40;
    var path_elements = new Array();
    var value_elements = new Array();
    if( status == true) {
                 var xmlDoc=loadXMLDoc("activate-sequence.xml");
                 var len = xmlDoc.getElementsByTagName("action");
                 for( var i = 0; i< len.length; i++ ){
                            path_elements[i] = xmlDoc.getElementsByTagName("path")[i].childNodes[0].nodeValue; 
                            value_elements[i] = xmlDoc.getElementsByTagName("value")[i].childNodes[0].nodeValue;
                 }
                 var sleep = xmlDoc.getElementsByTagName("sleep-time")[0].childNodes[0].nodeValue;
                //alert(sleep);
    }
    var timer= setInterval(function(){ 
                                   cal_func(path_elements[iter], value_elements[iter],frst_act_hgt); 
                                   frst_act_hgt = frst_act_hgt + 40;
                                   iter = iter+1; 
                                   if(iter == len.length) {clearInterval(timer);};  }, sleep);

};

function cal_func(path_element, value_element, frst_act_hgt) {
    var from_actor = String(path_element).split("-")[0];
    var to_actor = String(path_element).split("-")[1];
    var action_lines;
    //var from_idx = 0, to_idx = 0;
    //for( var m =0; m < actors.length; m++ ) { if(actors[m] == from_actor) { from_idx = m; }; if(actors[m] == to_actor) { to_idx = m; };};
    //var action_lines = paper.path("M"+temp_x[from_idx]+" "+frst_act_hgt+" L "+temp_x[to_idx]+" "+frst_act_hgt).attr({"arrow-end": "open-wide-long",});
    //var action_lines = paper.path("M"+temp_x[from_actor]+" "+frst_act_hgt+" L "+temp_x[to_actor]+" "+frst_act_hgt).attr({"arrow-end": "open-wide-long",});
    if( from_actor == 0 && to_actor == 1) {
       action_lines = paper.path("M"+temp_x[from_actor]+" "+frst_act_hgt+" L "+temp_x[to_actor]+" "+frst_act_hgt).attr({'stroke-width': 2,"stroke":'green',"arrow-end": "block-midium-midium",'arrow-start': 'block-midium-midium'});
    }
    else if( from_actor == 2 && to_actor == 4) {
         action_lines = paper.path("M"+temp_x[from_actor]+" "+frst_act_hgt+" L "+temp_x[to_actor]+" "+frst_act_hgt).attr({'stroke-width': 2,"stroke":'yellow',"arrow-end": "block-midium-midium",'arrow-start': 'block-midium-midium'});
        }
    else if( from_actor == 1 && to_actor == 3) {
         action_lines = paper.path("M"+temp_x[from_actor]+" "+frst_act_hgt+" L "+temp_x[to_actor]+" "+frst_act_hgt).attr({'stroke-width': 2,"stroke":'#000',"stroke-dasharray":"- ","arrow-end": "block-midium-midium",'arrow-start': 'block-midium-midium'});    
        }
    else if( from_actor == 0 && to_actor == 3 && count == 0){
    	count = count +1;
    	action_lines = paper.path("M"+temp_x[from_actor]+" "+frst_act_hgt+" L "+temp_x[to_actor]+" "+frst_act_hgt).attr({'stroke-width': 2,"stroke":'purple',"stroke-dasharray":"- "});
    }
    else{
         action_lines = paper.path("M"+temp_x[from_actor]+" "+frst_act_hgt+" L "+temp_x[to_actor]+" "+frst_act_hgt).attr({'stroke-width': 2,"stroke":'purple',"arrow-end": "block-midium-midium"});
    }
    //var test_pos_x = (temp_x[from_idx]+temp_x[to_idx])/2;
    var test_pos_x = (temp_x[from_actor]+temp_x[to_actor])/2;
    var test_pos_y = frst_act_hgt - 10;
    var anim = Raphael.animation({fill:"#F00"},500);
    var t = paper.text(test_pos_x, test_pos_y, value_element).insertAfter(action_lines).attr({"font-size":12, fill:"#FFF"}).animate(anim);
}
