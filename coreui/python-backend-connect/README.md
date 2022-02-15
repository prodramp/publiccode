## Connect CoreUI with Python backend ## 

1. Add setupProxy.js in code 
2. Please update your python server {ip|hostname}:port values in your .env file
```
API_SERVER=http://localhost:8000
```
4. Add ServerConnectGet.js into src/api folder
5. Add ServerConnectPost.js into src/api folder
6. Implement the code 

- Edit your sourcefile.js
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
