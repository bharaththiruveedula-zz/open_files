import mysql_interface
import json
#from webob import Request
def alarms(environ, start_response):
    alarm_data = {}
    alarms = []
    i = 0
    status = '200 OK'
    msi = mysql_interface.MySQLInterface("localhost", "sys_manager_db", "root", "pass")
    print msi.get_nodes("Alarm_new")
    rows = msi.get_table_data()
    
    for i in range(0,len(rows)):
	#for j in len(rows(i))
	alarm_data = {
		'enodeb' : rows[i][1],
                'alarmId' : rows[i][2],
                'specificProblem' : rows[i][3],
                'eventType' : rows[i][4],
                'probableCause' : rows[i][5],
                'perceivedSeiviarity' : rows[i][6],
                'managedObject' : rows[i][0],
                'occurTime' : rows[i][7]
	}
	"""
	alarm_data['alarmId'] = rows[i][0]
	alarm_data['specificProblem'] = rows[i][1]
	alarm_data['eventType'] = rows[i][2]
	alarm_data['probableCause'] = rows[i][3]
	alarm_data['perceivedSeiviarity'] = rows[i][4]
	alarm_data['managedObject'] = rows[i][5]
	alarm_data['occurTime'] = rows[i][6]
"""
	#alarm_data_json = json.dumps(alarm_data)
    	alarms.append(alarm_data)
	#i= i+1
    alarms_json = json.dumps({"alarms":alarms})
    response_headers = [('Content-type', 'application/json')]
    start_response(status, response_headers)
    print alarms_json
    print alarms_json
    return alarms_json

def enodeb(environ,start_response):
    status = '200 OK'
    alarm_enodeb = {}
    enodeb = []
    i = 0
    msi = mysql_interface.MySQLInterface("localhost", "sys_manager_db", "root", "pass")
    rows = msi.get_enodes("performance_cm_output")
    response_headers = [('Content-type', 'application/json')]
    start_response(status, response_headers)
    print rows
    for i in range(0,len(rows)):
	alarm_enodeb = {
		'alarm' : rows[i][0]
	}
        enodeb.append(alarm_enodeb)
    enodeb_json = json.dumps({"enodeb":enodeb})
    response_headers = [('Content-type', 'application/json')]
    start_response(status, response_headers)
    return enodeb_json



def perf(environ, start_response):
    perf_data = {}
    alarms = []
    i = 0
    status = '200 OK'
    msi = mysql_interface.MySQLInterface("localhost", "sys_manager_db", "root", "pass")
    rows = msi.get_perf("performance_cm_output")

    for i in range(0,len(rows)):
        perf_data = {
                'alarm_name' : rows[i][0],
                'HO' : rows[i][2],
                'CD' : rows[i][6],
                'PP' : rows[i][4],
                'RF' : rows[i][5],
                'TC' : rows[i][3],
                'occurTime' : rows[i][7]
        }
        alarms.append(perf_data)
    perf_json = json.dumps({"perf":alarms})
    response_headers = [('Content-type', 'application/json')]
    start_response(status, response_headers)
    return perf_json



#Babitha
def hoa_son(environ,start_response):
    status = '200 OK'
    hos = []
    enodeb = []
    i = 0
    msi = mysql_interface.MySQLInterface("localhost", "sys_manager_db", "root", "pass")
    #print msi.get_nodes("HO_SON")
    rows = msi.get_values("HO_SON")
    response_headers = [('Content-type', 'application/json')]
    start_response(status, response_headers)
    print rows

    for i in range(0,len(rows)):
        hos_data = {
                'HO' : rows[i][1],
                'CD' : rows[i][2],
                'PP' : rows[i][3],
                'time' : rows[i][4],
        }
        hos.append(hos_data)
    hos_json = json.dumps({"hos":hos})
    response_headers = [('Content-type', 'application/json')]
    start_response(status, response_headers)
    return hos_json


def hoa_w_son(environ,start_response):
    status = '200 OK'
    hos = []
    enodeb = []
    i = 0
    msi = mysql_interface.MySQLInterface("localhost", "sys_manager_db", "root", "pass")
    #print msi.get_nodes("HO_SON")
    rows = msi.get_values("HO_SON_ORG")
    response_headers = [('Content-type', 'application/json')]
    start_response(status, response_headers)
    print rows

    for i in range(0,len(rows)):
        hos_data = {
                'HO' : rows[i][1],
                'CD' : rows[i][2],
                'PP' : rows[i][3],
                'time' : rows[i][4],
        }
        hos.append(hos_data)
    hos_json = json.dumps({"hos":hos})
    response_headers = [('Content-type', 'application/json')]
    start_response(status, response_headers)
    return hos_json




#Babitha end

def ANR(environ,start_response):
    status = '200 OK'
    anrs = []
    enodeb = []
    i = 0
    msi = mysql_interface.MySQLInterface("localhost", "sys_manager_db", "root", "pass")
    #print msi.get_enodes("Alarm")
    rows = msi.get_nodes("test_ANR")
    response_headers = [('Content-type', 'application/json')]
    start_response(status, response_headers)
    print rows

    for i in range(0,len(rows)):
        anr_data = {
                'local_cell_id' : rows[i][0],
                'target_cell_id' : rows[i][1],
        }
        anrs.append(anr_data)
    anr_json = json.dumps({"anrs":anrs})
    response_headers = [('Content-type', 'application/json')]
    start_response(status, response_headers)
    return anr_json

def post(environ,start_response):
    status = '200 OK'
    output = 'post'
    response_headers = [('Content-type', 'text/plain')]
    start_response(status, response_headers)
    return [output]


def application2(environ,start_response):
    status = '200 OK'
    output = 'Hello'
    response_headers = [('Content-type', 'text/plain')]
    start_response(status, response_headers)
    return [output]

