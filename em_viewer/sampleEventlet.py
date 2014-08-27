#! /usr/bin/python



import eventlet
from eventlet import wsgi
#from alarm_data import application
#from alarm_data import application2
import alarm_data as app
from eventlet import websocket
#d = WSGIPathInfoDispatcher({'/': application, '/index': my_application2})
import config_em

import os
import random

                  
def dispatch(environ, start_response):
    """ This resolves to the web page or the websocket depending on
    the path."""
    url_path = environ['PATH_INFO']
    print environ['PATH_INFO']
    if(url_path == '/alarms'):
        content = app.alarms(environ, start_response)
	return content
    if(url_path == '/enodes'):
        content = app.enodeb(environ, start_response)
        return content
    if(url_path == '/perf'):
        content = app.perf(environ, start_response)
        return content
    if(url_path == '/hoa_son'):
        content = app.hoa_son(environ, start_response)
        return content
    if(url_path == '/hoa_w_son'):
        content = app.hoa_w_son(environ, start_response)
        return content
    if(url_path == '/anrs'):
        content = app.ANR(environ, start_response)
        return content
    if(url_path == '/post'):
        content = app.post(environ, start_response)
        return content
    else:
	content = app.application2(environ,start_response)
	return content


if __name__ == "__main__":
    #url_path = environ['PATH_INFO']    
    listener = eventlet.listen((config_em.WSGI_SERVER, 9090))
    wsgi.server(listener, dispatch)


#wsgi.server(eventlet.listen(('10.138.89.70', 9090)), d)

