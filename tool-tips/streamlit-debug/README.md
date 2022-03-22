## Please use the following settings to get the PyCharm python debugger working with streamlit ##
 
![Pycharm Configuration](https://raw.githubusercontent.com/prodramp/publiccode/master/images/streamlit-debug.png)

1. Python 3.9 (I tested my environment with 3.9 first)

2. Make sure you have correct path for strealit application
```
In my macbook it was as below:
/Users/avkash/anaconda3/envs/python39/bin/streamlit

$ where streamlit
/Users/avkash/anaconda3/envs/python39/bin/streamlit

```
3. Setup your PyCharm configuration as below:
```
Intrepreter: Python3.9 Runtime 
Script Path: /Users/avkash/anaconda3/envs/python39/bin/streamlit
Parameters: run <your_main_streamlit_.py_file>
Working Directory: The correct folder where streamlit_.py is located

```

Thats all. 

  
