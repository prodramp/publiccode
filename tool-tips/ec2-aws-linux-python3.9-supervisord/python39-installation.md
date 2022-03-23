# Python 3.9 installation #


1. Install Development tools

```
$ sudo yum -y groupinstall "Development Tools"
$ sudo yum -y install openssl-devel bzip2-devel libffi-devel
```

2. Make sure you have gcc compiler tool installed and latest
```
$ gcc --version
gcc (GCC) 7.3.1 20180712 (Red Hat 7.3.1-13)
Copyright (C) 2017 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

3. Make sure you have latest make utility

```
$ make --version
GNU Make 3.82
Built for x86_64-koji-linux-gnu
Copyright (C) 2010  Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
```

4. Check if wget utility is there, if not please install

```
$ sudo yum -y install wget
```

5. Download Python 3.9 from the python download site
```
wget https://www.python.org/ftp/python/3.9.10/Python-3.9.10.tgz
```

6. Unzip and install
```
$ tar -xvf Python-3.9.10.tgz
$ cd Python-3.9.10/
$ ./configure --enable-optimizations
$ sudo make altinstall
```

7. Check for both python and pip

```
# which python3.9 
$ python3.9 --version
$ pip3.9 --version

Note: Upgrade pip also
$ usr/local/bin/python3.9 -m pip install --upgrade pip
```

8. At this time the python default still shows the python 2.7 and python3 still shows the python 3.7.
We will fix this issue by removing the python and python3 links and setting both python and python3 to python3.9
```
$  sudo rm /usr/bin/python
$  sudo rm /usr/bin/python3

Note: The python3.8 binary will be either at /usr/bin/python3.9 or /usr/local/bin/python3.9

$ sudo ln -s /usr/bin/python3.9 /usr/bin/python
$ sudo ln -s /usr/bin/python3.9 /usr/bin/python3

Note: Make sure your above path is correct for python 3.9
```

9. Check python now:
```
$ python
$ python3

In both the cases you must have python 3.9 as your python runtime environment.
```
