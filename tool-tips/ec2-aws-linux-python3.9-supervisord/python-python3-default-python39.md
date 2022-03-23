# Setting python 3.9 as the default python and python3 application #

1. At this time the python default still shows the python 2.7 and python3 still shows the python 3.7.

Note:Both the below command does not launch the python 3.9 by default, we will fix it. 

```
$ python
$ python3 
```

2. Let's fix this issue by removing the python and python3 links and setting both python and python3 to python3.9
```
$  sudo rm /usr/bin/python
$  sudo rm /usr/bin/python3

Note: The python3.8 binary will be either at /usr/bin/python3.9 or /usr/local/bin/python3.9

$ sudo ln -s /usr/bin/python3.9 /usr/bin/python
$ sudo ln -s /usr/bin/python3.9 /usr/bin/python3

Note: Make sure your above path is correct for python 3.9
```

3. Check python now:
```
$ python
$ python3

In both the cases you must have python 3.9 as your python runtime environment.
```
