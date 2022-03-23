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
Note: Change the first line from /usr/bin/python to /usr/bin/python2.7
```
$ sudo vi /usr/bin/yum

#!/usr/bin/python2.7
....
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
$ sudo vi /usr/bin/yum
$ sudo vi /usr/libexec/urlgrabber-ext-down

>>> change both of above file #! /usr/bin/python >>>>> #! /usr/bin/python2

Note: python3 will not work
```

Change -python to -python2.7

```
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

3. 

```
    for name, default in (("awsproto", "http"), ("amazonlinux", "amazonlinux"), ("awsdomain", "amazonaws.com"), ("awsregion", "default"), ("releasever", "2"), ("basearch", "x86_64")):
```

```
#!/usr/bin/python2.7

$ sudo vi /usr/libexec/urlgrabber-ext-down
#! /usr/bin/python2.7

[ec2-user@ip-172-31-15-214 ~]$ cat /usr/bin/supervisorctl
#!/usr/bin/python2.7
# EASY-INSTALL-ENTRY-SCRIPT: 'supervisor==3.4.0','console_scripts','supervisorctl'
__requires__ = 'supervisor==3.4.0'
import sys
from pkg_resources import load_entry_point

if __name__ == '__main__':
    sys.exit(
        load_entry_point('supervisor==3.4.0', 'console_scripts', 'supervisorctl')()
    )
[ec2-user@ip-172-31-15-214 ~]$ cat /usr/bin/supervisord
#!/usr/bin/python2.7
# EASY-INSTALL-ENTRY-SCRIPT: 'supervisor==3.4.0','console_scripts','supervisord'
__requires__ = 'supervisor==3.4.0'
import sys
from pkg_resources import load_entry_point

if __name__ == '__main__':
    sys.exit(
        load_entry_point('supervisor==3.4.0', 'console_scripts', 'supervisord')()
    )
[ec2-user@ip-172-31-15-214 supervisorconf]$ cat /usr/bin/echo_supervisord_conf
#!/usr/bin/python2.7
# EASY-INSTALL-ENTRY-SCRIPT: 'supervisor==3.4.0','console_scripts','echo_supervisord_conf'
__requires__ = 'supervisor==3.4.0'
import sys
from pkg_resources import load_entry_point

if __name__ == '__main__':
    sys.exit(
        load_entry_point('supervisor==3.4.0', 'console_scripts', 'echo_supervisord_conf')()
    )

```
