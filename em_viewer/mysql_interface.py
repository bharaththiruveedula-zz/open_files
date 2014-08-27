import MySQLdb as mdb

class MySQLInterface():
	def __init__(self, host, database, user, password):
		self.host = host
		self.database = database
		self.user = user
		self.password = password

	def get_nodes(self, nodetype):
		connection = mdb.connect(self.host, self.user, self.password, self.database)
		cursor = connection.cursor()
		cursor.execute("select * from " + nodetype )
		rows = cursor.fetchall()
		return rows
	def get_perf(self, nodetype):
                connection = mdb.connect(self.host, self.user, self.password, self.database)
                cursor = connection.cursor()
                cursor.execute("select * from " + nodetype + " order by occur_time DESC LIMIT 100")
                rows = cursor.fetchall()
                return rows
	def get_table_data(self):
                connection = mdb.connect(self.host, self.user, self.password, self.database)
                cursor = connection.cursor()
                cursor.execute("select m.MO,a.id,a.alarmId,a.specific_problem,a.event_type,a.probable_cause,a.percived_seveirity,a.occur_time from Alarm_config m,Alarm_new a where m.id= a.id")
                rows = cursor.fetchall()
                return rows
#added by Babitha/Anirudh 
        def get_values(self, nodetype):
                connection = mdb.connect(self.host, self.user, self.password, self.database)
                cursor = connection.cursor()
                cursor.execute("select * from " + nodetype +" ORDER BY time DESC LIMIT 1")
                rows = cursor.fetchall()
                return rows

#added by prathyusha
	def get_rows(self, nodetype, value):
                connection = mdb.connect(self.host, self.user, self.password, self.database)
                cursor = connection.cursor()
                cursor.execute("select * from %s where enodeb=%s" , (nodetype,value))
                rows = cursor.fetchall()
                return rows
	def get_enodes(self, nodetype):
		connection = mdb.connect(self.host, self.user, self.password, self.database)
                cursor = connection.cursor()
		cursor.execute("select distinct(enodeb_name) from " + nodetype)
                rows = cursor.fetchall()
                return rows


	def insert_nodes(self, nodetype, *args):
		if nodetype == "enodebs":
			ip = args[0]
			key= args[1]
			ecip = args[2]
			print ip, key
			connection = mdb.connect(self.host, self.user, self.password, self.database)
			cursor = connection.cursor()
			cursor.execute("delete from enodebs where ip=%s", (ip))
			cursor.execute("insert into enodebs (ip, uuid, ecip) values(%s, %s, %s)", (ip, key, ecip))
			connection.commit()

"""if __name__=='__main__':
    mysql_interface = MySQLInterface("localhost", "sys_manager_db", "root", "pass");
    print mysql_interface.get_nodes("event_collectors")
    mysql_interface.insert_nodes("enodebs", "11.11.11.11", "uuuiiid", "22.22.22.22")
"""
