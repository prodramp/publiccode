# Supervisor Installation #

1. Installation:

$ sudo amazon-linux-extras install epel
Error:
```
Installing epel-release
Loaded plugins: extras_suggestions, langpacks, priorities, update-motd
Cleaning repos: amzn2-core amzn2extra-docker amzn2extra-epel amzn2extra-kernel-5.10
17 metadata files removed
6 sqlite files removed
0 metadata files removed
Loaded plugins: extras_suggestions, langpacks, priorities, update-motd
amzn2-core                                                                                                                                               | 3.7 kB  00:00:00
amzn2extra-docker                                                                                                                                        | 3.0 kB  00:00:00
amzn2extra-epel                                                                                                                                          | 3.0 kB  00:00:00
amzn2extra-kernel-5.10                                                                                                                                   | 3.0 kB  00:00:00
  File "/usr/libexec/urlgrabber-ext-down", line 28
    except OSError, e:
                  ^
SyntaxError: invalid syntax
  File "/usr/libexec/urlgrabber-ext-down", line 28
    except OSError, e:
                  ^
SyntaxError: invalid syntax


Exiting on user cancel
Installation failed. Check that you have permissions to install.
```
Fixing Error:

```
$ sudo vi /usr/libexec/urlgrabber-ext-down
Change /usr/bin/python to /usr/bin/python2.7
```

3. Run the supervisord or supervisorcrl command
You may hit the following error:

```
$ supervisord
Traceback (most recent call last):
  File "/usr/bin/supervisord", line 5, in <module>
    from pkg_resources import load_entry_point
  File "/usr/local/lib/python3.9/site-packages/pkg_resources/__init__.py", line 3243, in <module>
    def _initialize_master_working_set():
  File "/usr/local/lib/python3.9/site-packages/pkg_resources/__init__.py", line 3226, in _call_aside
    f(*args, **kwargs)
  File "/usr/local/lib/python3.9/site-packages/pkg_resources/__init__.py", line 3255, in _initialize_master_working_set
    working_set = WorkingSet._build_master()
  File "/usr/local/lib/python3.9/site-packages/pkg_resources/__init__.py", line 568, in _build_master
    ws.require(__requires__)
  File "/usr/local/lib/python3.9/site-packages/pkg_resources/__init__.py", line 886, in require
    needed = self.resolve(parse_requirements(requirements))
  File "/usr/local/lib/python3.9/site-packages/pkg_resources/__init__.py", line 772, in resolve
    raise DistributionNotFound(req, requirers)
pkg_resources.DistributionNotFound: The 'supervisor==3.4.0' distribution was not found and is required by the application
```
Fix: Edit both the files below to use python2.7 instead of python

```
$ sudo vi /usr/bin/supervisord
$ sudo vi /usr/bin/supervisorctl
Change the top first line from /usr/bin/python to /usr/bin/python2.7
```

4. Now try again
$ sudo supervisord
$ sudo supervisorctl

Note: It should be working now.

$ ps -ef | grep python
You will get as below:
```
root     16047     1  0 23:11 ?        00:00:00 /usr/bin/python2.7 /bin/supervisord
ec2-user 16049  3236  0 23:11 pts/0    00:00:00 grep --color=auto python
```
