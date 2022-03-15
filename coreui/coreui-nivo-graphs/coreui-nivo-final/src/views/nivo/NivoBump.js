import React, { useState } from "react";
import PropTypes from 'prop-types'
import { CButton, CButtonGroup, CCard, CCardBody, CCardHeader, CCol, CHeader, CRow } from '@coreui/react'
import { ResponsiveBump, ResponsiveAreaBump } from '@nivo/bump'
import Select from "react-select"

const NivoBump = () => {
    const [colorScheme, setColorScheme] = useState('spectral')
    const [isAreaBump, setIsAreaBump] = useState(false)

    const schemeOptions = [
        {value: 'nivo', label: 'Nivo', colors: ['#ff0000', '#234535']},
        {value: 'reds', label: 'Reds', colors: ['#00FF00','#236456']},
        {value: 'blues', label: 'Blues', colors: ['#00FFFF', '#572535']},
        {value: 'spectral', label: 'Spectral', colors: ['#0FFFF0', '#765436']},
        {value: 'accent', label: 'Accent', colors: ['#11FF22', '#124535']},
        {value: 'paired', label: 'Paired', colors: ['#FF2344', '#875797']},
    ]

    const bumpData = [
        {
          "id": "JavaScript",
          "data": [
            {
              "x": 2000,
              "y": 11
            },
            {
              "x": 2001,
              "y": 15
            },
            {
              "x": 2002,
              "y": 26
            },
            {
              "x": 2003,
              "y": 12
            },
            {
              "x": 2004,
              "y": 15
            },
            {
              "x": 2005,
              "y": 22
            }
          ]
        },
        {
          "id": "ReasonML",
          "data": [
            {
              "x": 2000,
              "y": 11
            },
            {
              "x": 2001,
              "y": 30
            },
            {
              "x": 2002,
              "y": 17
            },
            {
              "x": 2003,
              "y": 25
            },
            {
              "x": 2004,
              "y": 25
            },
            {
              "x": 2005,
              "y": 20
            }
          ]
        },
        {
          "id": "TypeScript",
          "data": [
            {
              "x": 2000,
              "y": 12
            },
            {
              "x": 2001,
              "y": 17
            },
            {
              "x": 2002,
              "y": 25
            },
            {
              "x": 2003,
              "y": 16
            },
            {
              "x": 2004,
              "y": 22
            },
            {
              "x": 2005,
              "y": 25
            }
          ]
        },
        {
          "id": "Elm",
          "data": [
            {
              "x": 2000,
              "y": 26
            },
            {
              "x": 2001,
              "y": 21
            },
            {
              "x": 2002,
              "y": 28
            },
            {
              "x": 2003,
              "y": 28
            },
            {
              "x": 2004,
              "y": 21
            },
            {
              "x": 2005,
              "y": 14
            }
          ]
        },
        {
          "id": "CoffeeScript",
          "data": [
            {
              "x": 2000,
              "y": 11
            },
            {
              "x": 2001,
              "y": 19
            },
            {
              "x": 2002,
              "y": 22
            },
            {
              "x": 2003,
              "y": 20
            },
            {
              "x": 2004,
              "y": 13
            },
            {
              "x": 2005,
              "y": 29
            }
          ]
        }
      ]

      const MyResponsiveBump = ({ data, colorScheme}) => (
        <ResponsiveBump
            data={data}
            colors={{ scheme: colorScheme }}
            lineWidth={3}
            activeLineWidth={6}
            inactiveLineWidth={3}
            inactiveOpacity={0.15}
            pointSize={10}
            activePointSize={16}
            inactivePointSize={0}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={3}
            activePointBorderWidth={3}
            pointBorderColor={{ from: 'serie.color' }}
            axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: -36
            }}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'ranking',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
            axisRight={null}
        />
    )

    MyResponsiveBump.propTypes = {
        data: PropTypes.object.isRequired,
        colorScheme: PropTypes.string.isRequired
    } 

    const MyResponsiveAreaBump = ({ data, colorScheme}) => (
        <ResponsiveAreaBump
            data={data}
            margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
            spacing={8}
            colors={{ scheme: colorScheme }}
            blendMode="multiply"
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'CoffeeScript'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'TypeScript'
                    },
                    id: 'lines'
                }
            ]}
            startLabel="id"
            endLabel="id"
            axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: -36
            }}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 32
            }}
        />
    )

    MyResponsiveAreaBump.propTypes = {
        data: PropTypes.object.isRequired,
        colorScheme: PropTypes.string.isRequired
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
            defaultValue={schemeOptions[0]}
            options={schemeOptions}
            onChange={handleChange}
        />
    )

    return(
        <>
            <CCard>
            <CCardHeader>
                <CRow>
                    <CCol sm={6}>
                    <h4>Nivo Bump Graph</h4>
                    </CCol>
                    <CCol sm={3}>
                        <CButtonGroup>
                            {['Bump', 'AreaBump'].map( (value) => (
                                <CButton 
                                color='outline-secondary'
                                active={isAreaBump ? value === 'AreaBump' :  value === 'Bump'}
                                onClick={() => setIsAreaBump(value === 'AreaBump' ? true: false)}
                                key={value}>
                                    {value}
                                </CButton>
                            ))}
                        </CButtonGroup>
                    </CCol>
                    <CCol sm={3}>
                        <CustomSelectOptions />
                    </CCol>
                </CRow>                
            </CCardHeader>
            <CCardBody style={{height:'600px'}}>
                {isAreaBump
                    ?<MyResponsiveAreaBump data={bumpData} colorScheme={colorScheme} />
                    :<MyResponsiveBump data={bumpData} colorScheme={colorScheme} />
                }
                
            </CCardBody>
        </CCard>
        </>
    )


}
export default NivoBump