/*function loadXMLDoc(dname){

var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", dname, false);
xmlhttp.setRequestHeader('Content-Type', 'text/xml');
xmlhttp.send();
xmlDoc = xmlhttp.responseXML;

}*/
function loadXMLDoc(dname)
{
if (window.XMLHttpRequest)
  {
  xhttp=new XMLHttpRequest();
  }
else
  {
  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xhttp.open("GET",dname,false);
xhttp.setRequestHeader('Content-Type', 'text/xml');
xhttp.send();
return xhttp.responseXML;
}
