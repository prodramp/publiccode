# Some of the python app will stop working after python 3.9 install and path fix #

## Run the following command will give you an error if python2.7 is not in path to launch with python command ##
```
$ amazon-linux-extras
```
## Lets fix it #3

Error:
```
Error info
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

    for name, default in (("awsproto", "http"), ("amazonlinux", "amazonlinux"), ("awsdomain", "amazonaws.com"), ("awsregion", "default"), ("releasever", "2"), ("basearch", "x86_64")):

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

![image](https://user-images.githubusercontent.com/95409161/159786257-a62c5271-b35b-42bf-bd19-19513e700c71.png)
