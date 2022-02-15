## Connect CoreUI with Python backend ## 

First please clode the CoreUI React template code. 

- $ git clone https://github.com/coreui/coreui-free-react-admin-template.git

1. Add setupProxy.js in code 
```
const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  console.log("this code is running with process.env.API_SERVER" , process.env.API_SERVER)
  app.use(
    '/v1',
    proxy({
      target: process.env.API_SERVER,
      changeOrigin: false,
    })
  );
};

```
2. Please update your python server {ip|hostname}:port values in your .env file
```
API_SERVER=http://localhost:8000
```
3. Add ServerConnectGet.js into src/api folder
```
function GetRestRequest(apiUrl, getResultObj) {
    return fetch(apiUrl, {
         mode: 'cors',
         method: 'GET',
         json: true,
         headers: new Headers({
             'Content-Type': 'application/json',
             Accept: "application/json"
         })
       },
     )
     .then(checkStatus)
     .then(parseJSON)
     .then(getResultObj);
} 

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error);
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const GetRestObject = { GetRestRequest };
export default GetRestObject;
```
4. Add ServerConnectPost.js into src/api folder
```
function  PostRestRequest(apiUrl, postBodyData, postResultObj) {
    var data = JSON.stringify(postBodyData)
    return fetch(apiUrl, {
         mode: 'cors',
         method: 'POST',
         body: data,
         json: true,
         headers: new Headers({
             'Content-Type': 'application/json',
             Accept: "application/json"
         })
       },
     )
     .then(checkStatus)
     .then(parseJSON)
     .then(postResultObj);
} 

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error);
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const PostRestObject = { PostRestRequest };
export default PostRestObject;
```
5. Implement the code 

- Edit your sourcefileName.js as below:
```
import React, { lazy, useState } from 'react'

import GetRestObject from '../../api/ServerConnectGet'
import PostRestObject from '../../api/ServerConnectPost'

const PageFunctionName = () => {

  const [hello, setHello] = useState([])
  const [info, setInfo] = useState([])

  GetRestObject.GetRestRequest(`/v1/hello`, (getResultObj => {
    console.log(getResultObj)
    if (hello.length <= 0){setHello(getResultObj)}
  }))
  GetRestObject.GetRestRequest(`/v1/info`, (getResultObj => {
      console.log(getResultObj)
      if (info.length <= 0){setInfo(getResultObj)}
    }))


  return (
    <>
      <WidgetsDropdown />
      <CCard className="mb-4">
        <CCardBody>
          <CRow className="bg-gray">
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Data from Python Backend
              </h4>
              <div className="small text-medium-emphasis">
                {
                JSON.stringify(hello)
                }
              </div>
              <div className="small text-medium-emphasis">
                {JSON.stringify(info)}
              </div>
              <div className="small text-medium-emphasis">
                {info.resultStatus === 'SUCCESS' 
                ?<h2> {info.message} </h2>: 'Error in reading status'}
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
     </>
     )
}
```
