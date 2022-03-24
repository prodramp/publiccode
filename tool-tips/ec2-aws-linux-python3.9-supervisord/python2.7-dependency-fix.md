# Some of the python app will stop working after python 3.9 install and path fix #

## Run the following command will give you an error if python2.7 is not in path to launch with python command ##

$ yum
Error:
```
$ yum
  File "/usr/bin/yum", line 30
    except KeyboardInterrupt, e:
                            ^
SyntaxError: invalid syntax
````
Fix:

- Note: Change the first line from /usr/bin/python to /usr/bin/python2.7

```
$ sudo vi /usr/bin/yum

#!/usr/bin/python2.7
Note: you just need to make sure whereever python is set, change it to python2.7

````

$ amazon-linux-extras
```
## Lets fix it #3
Replace -python to -python2.7 in the last line below (alread changed)
# sudo vi /usr/bin/amazon-linux-extras

#!/bin/sh
# Copyright 2017, 2018 Amazon.com, Inc. or its affiliates.

# This module is part of Amazon Linux Extras.
#
# Amazon Linux Extras is free software: you can redistribute it and/or
# modify it under the terms of the GNU General Public License v2 as published
# by the Free Software Foundation.
#
# Amazon Linux Extras is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
# or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
# for more details.
#
# You should have received a copy of the GNU General Public License
# along with Amazon Linux Extras.  If not, see <http://www.gnu.org/licenses/>.


declare -x CATALOGURL AWSDOMAIN AWSREGION RELEASEVER BASEARCH YUMCONFIG_FILE_NAME
declare -x URL_FORMAT USE_MIRRORLIST SRC_SUFFIX DEBUGINFO_SUFFIX
for config_file_location in /etc /usr/local/etc ${HOME:+"${HOME}/.config/amazon-linux"}; do
	test -r "${config_file_location}/amazon-linux-extras.conf" &&
		. "${config_file_location}/amazon-linux-extras.conf"
done

# Avoid encoding errors because default is ASCII.
if test "$ENVROOT"; then
	PATH=$ENVROOT:$PATH
fi
exec env PYTHONIOENCODING=UTF-8 ${PYTHON:-python2.7} -m amazon_linux_extras "$@"
```

Error:

```
$ amazon-linux-extras
Traceback (most recent call last):
  File "/usr/lib64/python2.7/runpy.py", line 174, in _run_module_as_main
    "__main__", fname, loader, pkg_name)
  File "/usr/lib64/python2.7/runpy.py", line 72, in _run_code
    exec code in run_globals
  File "/usr/lib/python2.7/site-packages/amazon_linux_extras/__main__.py", line 35, in <module>
    sys.exit(cli_main([arg for arg in argv[1:] if arg != "-v"]))
  File "/usr/lib/python2.7/site-packages/amazon_linux_extras/cli.py", line 452, in main
    action(args)
  File "/usr/lib/python2.7/site-packages/amazon_linux_extras/cli.py", line 122, in cmd_list
    catalog = get_catalog()
  File "/usr/lib/python2.7/site-packages/amazon_linux_extras/software_catalog.py", line 163, in get_catalog
    catalog = fetch_new_catalog()
  File "/usr/lib/python2.7/site-packages/amazon_linux_extras/software_catalog.py", line 134, in fetch_new_catalog
    url = CATALOG_URL.format(cat_version=version, **yumvars)
KeyError: u'basearch'
```
Fix: 

- Fix the file /usr/lib/python2.7/site-packages/amazon_linux_extras/software_catalog.py as below:

```
$ sudo vi usr/lib/python2.7/site-packages/amazon_linux_extras/software_catalog.py

CHANGE:
-----------
for name, default in (("awsdomain", "amazonaws.com"), ("awsregion", "default"), ("releasever", "2"), ("basearch", None)):

TO:
------
for name, default in (("awsdomain", "amazonaws.com"), ("awsregion", "default"), ("releasever", "2"), ("basearch", "x86_64")):
![image](https://user-images.githubusercontent.com/95409161/159810640-a94e7ada-c553-4e7c-88e6-ac107aa47d6a.png)

```
Now run yum app and check there are no longer any error.

After that run 

```
$ sudo vi /usr/bin/yum
$ sudo vi /usr/libexec/urlgrabber-ext-down

>>> change both of above file #! /usr/bin/python >>>>> #! /usr/bin/python2.7

Note: python3 will not work
```

Change -python to -python2.7

