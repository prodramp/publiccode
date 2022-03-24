# Setting python app into supervisor #

1. Please edit the supervisord.conf located as /etc/supervisord.conf

Note: In some cases you create you own conf file and then merge it with the existing one. 
```
$ echo_supervisord_conf > supervisord.conf

```

2. Please add the following code into the supervisord.conf file and change the command, directory, user and logfile setting based on your application requirements
  
```
[program:pythonapp]
command=python /home/ec2-user/pythonapp/app.py
process_name=%(program_name)s
directory=/home/ec2-user/pythonapp
user=ec2-user
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=/home/ec2-user/worker.log
stderr_logfile=/home/ec2-user/error.log
```

3. Save it and run supervisor as below to start it with the given configuration:

$ sudo supervisord -c /etc/supervisord.conf
