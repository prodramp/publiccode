import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { ResponsivePie } from '@nivo/pie'
import { CButton, CButtonGroup, CCard, CCardBody, CCardHeader, CCol, CHeader, CRow } from '@coreui/react'
import DataTableView from './DataTable';

const NivoPie = () => {
    const [viewType, setViewType] = useState('Graph')
    const [pieOrDonut, setPieOrDonut] = useState('Pie')

    const pieData = [
        {
          "id": "elixir",
          "label": "elixir",
          "value": 279,
          "color": "hsl(357, 70%, 50%)"
        },
        {
          "id": "css",
          "label": "css",
          "value": 562,
          "color": "hsl(52, 70%, 50%)"
        },
        {
          "id": "haskell",
          "label": "haskell",
          "value": 515,
          "color": "hsl(280, 70%, 50%)"
        },
        {
          "id": "hack",
          "label": "hack",
          "value": 148,
          "color": "hsl(31, 70%, 50%)"
        },
        {
          "id": "sass",
          "label": "sass",
          "value": 466,
          "color": "hsl(166, 70%, 50%)"
        }
    ]


    const MyResponsivePie = ({ data, pieType}) => (
        <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={pieType === 'pie' ? 0 : 0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={5}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'ruby'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'c'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'go'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'python'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'scala'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'lisp'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'elixir'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'javascript'
                    },
                    id: 'lines'
                }
            ]}
            legends={[
                {
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 0,
                    translateY: 150, //56
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 26,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    // symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    )

    MyResponsivePie.propTypes = {
        data: PropTypes.object.isRequired,
        pieType: PropTypes.bool.isRequired
    } 

    return(
        <>
        <CCard>
            <CCardHeader>
                <CRow>
                    <CCol sm={6}>
                    <h4>Nivo Pie Graph</h4>
                    </CCol>
                    <CCol sm={3}>
                        <CButtonGroup>
                            {['Graph', 'Data'].map( (value) => (
                                <CButton 
                                color='outline-secondary'
                                active={value === viewType}
                                onClick={() => setViewType(value)}
                                key={value}>
                                    {value}
                                </CButton>
                            ))}
                        </CButtonGroup>
                    </CCol>
                    <CCol sm={3}>
                        <CButtonGroup>
                            {['Pie', 'Donut'].map( (value) => (
                                <CButton 
                                color='outline-secondary'
                                active={value === pieOrDonut}
                                onClick={() => setPieOrDonut(value)}
                                key={value}>
                                    {value}
                                </CButton>
                            ))}
                        </CButtonGroup>
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
                </CRow>
                
            </CCardHeader>
            <CCardBody style={{height:'600px'}}>
                {viewType === 'Graph'
                ?<MyResponsivePie data={pieData} pieType={pieOrDonut.toLowerCase()} />
                :<DataTableView tableData={pieData} />
                }
            </CCardBody>
        </CCard>
        </>
    )
}
export default NivoPie
