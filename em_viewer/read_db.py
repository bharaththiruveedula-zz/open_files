#! /usr/bin/python

import mysql_interface

msi = mysql_interface.MySQLInterface("localhost","sample","root", "pass")

print msi.get_nodes("sample_table")
