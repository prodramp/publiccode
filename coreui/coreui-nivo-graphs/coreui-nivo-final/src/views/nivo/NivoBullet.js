import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBullet } from "@nivo/bullet";
import { CButton, CButtonGroup, CCard, CCardBody, CCardHeader, CCol, CHeader, CRow } from '@coreui/react'
import {SchemeOptions} from './ColorSchemeOptions'
import Select from "react-select"

const NivoBullet = () => {
    const [colorScheme, setColorScheme] = useState('spectral')

    const bulletData = [
        {
          "id": "temp.",
          "ranges": [
            6,
            11,
            84,
            0,
            120
          ],
          "measures": [
            79
          ],
          "markers": [
            85
          ]
        },
        {
          "id": "power",
          "ranges": [
            1.7539488226374675,
            0.07411831985925406,
            1.67694676808163,
            0,
            2
          ],
          "measures": [
            0.40276831869437024,
            1.9303801399960938
          ],
          "markers": [
            1.3253535190186139
          ]
        },
        {
          "id": "volume",
          "ranges": [
            56,
            1,
            38,
            16,
            3,
            12,
            0,
            60
          ],
          "measures": [
            20
          ],
          "markers": [
            56
          ]
        },
        {
          "id": "cost",
          "ranges": [
            235840,
            3236,
            303703,
            0,
            500000
          ],
          "measures": [
            128230,
            390596
          ],
          "markers": [
            417806
          ]
        },
        {
          "id": "revenue",
          "ranges": [
            9,
            0,
            3,
            0,
            9
          ],
          "measures": [
            6
          ],
          "markers": [
            5.919910146123294,
            6.352503421611037
          ]
        }
    ]

    const MyResponsiveBullet = ({ data, colorScheme}) => (
        <ResponsiveBullet
            data={data}
            margin={{ top: 50, right: 90, bottom: 50, left: 90 }}
            spacing={46}
            titleAlign="start"
            titleOffsetX={-70}
            measureSize={0.2}
            rangeColors={colorScheme}
        />
    )
    MyResponsiveBullet.propTypes = {
        data: PropTypes.object.isRequired,
        colorScheme: PropTypes.string.isRequired,
    } 

    const formatSelectOptions = ({value, label, colors}) => (
        <div style={{display: 'flex'}}>
            <div style={{minWidth:'80px'}}>{label}</div>
            <div style={{alignItems:'end'}}>
                {
                    colors.map( (colorValue) => {
                        return(
                            <span key={colorValue} style={{backgroundColor:colorValue}}>
                                &nbsp;&nbsp;
                            </span>
                        )
                    })
                }
            </div>
        </div>
    )

    const handleChange = (selectedOption) => {
        setColorScheme(selectedOption.value)
    }

    const CustomSelectOptions = () => (
        <Select
            formatOptionLabel={formatSelectOptions}
            defaultValue={Object.values(SchemeOptions)[0]}
            options={Object.values(SchemeOptions)}
            onChange={handleChange}
        />
    )


    return(
        <>
            <CCard>
                <CCardHeader>
                    <CRow>
                        <CCol sm={6}>
                        <h4>Nivo Bullet Graph</h4>
                        </CCol>
                        <CCol sm={3}>
                            {/* <CButtonGroup>
                                {['horizontal', 'vertical'].map( (value) => (
                                    <CButton 
                                    color='outline-secondary'
                                    active={value === vertOrHor}
                                    onClick={() => setVertOrHor(value.toLowerCase())}
                                    key={value}>
                                        {value}
                                    </CButton>
                                ))}
                            </CButtonGroup> */}
                        </CCol>
                        <CCol sm={3}>
                            <CustomSelectOptions />
                        </CCol>
                    </CRow>                
                </CCardHeader>
                <CCardBody style={{height:'600px'}}>
                    <MyResponsiveBullet 
                        colorScheme={colorScheme}
                        data={bulletData} />
                </CCardBody>    
            </CCard>  
        </>
    )

}
export default NivoBullet