import mysql_interface
import json
def application(environ, start_response):
    names = {}
    #i = 0 
    status = '200 OK'
    msi = mysql_interface.MySQLInterface("localhost","sample","root", "pass")
    print msi.get_nodes("sample_table")
    rows = msi.get_nodes("sample_table");
    first_name = rows[0];
    response_headers = [('Content-type', 'application/json')]
    start_response(status, response_headers)
    print first_name
    for row in rows:
        key = row[0]
        value = row[1]
        names['%s'%key]=value
    print names
    names_json = json.dumps(names)
    print names_json
    return names_json 

def application2(environ,start_response):
    status = '200 OK'
    output = 'Hello'
    response_headers = [('Content-type', 'text/plain')]
    start_response(status, response_headers)
    return [output]
