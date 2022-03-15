import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {ResponsiveBar}  from '@nivo/bar'
import { CButton, CButtonGroup, CCard, CCardBody, CCardHeader, CCol, CHeader, CRow } from '@coreui/react'
import DataTableView from './DataTable';

const NivoBar = () => {

    const [vertOrHor, setVertOrHor] = useState('vertical')
    const [viewType, setViewType] = useState('Graph')
    
    const barData = [
        {
          "country": "AD",
          "hot dog": 121,
          "hot dogColor": "hsl(13, 70%, 50%)",
          "burger": 71,
          "burgerColor": "hsl(257, 70%, 50%)",
          "sandwich": 28,
          "sandwichColor": "hsl(168, 70%, 50%)",
          "kebab": 95,
          "kebabColor": "hsl(234, 70%, 50%)",
          "fries": 83,
          "friesColor": "hsl(44, 70%, 50%)",
          "donut": 10,
          "donutColor": "hsl(293, 70%, 50%)"
        },
        {
          "country": "AE",
          "hot dog": 162,
          "hot dogColor": "hsl(258, 70%, 50%)",
          "burger": 176,
          "burgerColor": "hsl(86, 70%, 50%)",
          "sandwich": 47,
          "sandwichColor": "hsl(258, 70%, 50%)",
          "kebab": 40,
          "kebabColor": "hsl(331, 70%, 50%)",
          "fries": 78,
          "friesColor": "hsl(84, 70%, 50%)",
          "donut": 154,
          "donutColor": "hsl(57, 70%, 50%)"
        },
        {
          "country": "AF",
          "hot dog": 195,
          "hot dogColor": "hsl(25, 70%, 50%)",
          "burger": 89,
          "burgerColor": "hsl(60, 70%, 50%)",
          "sandwich": 67,
          "sandwichColor": "hsl(201, 70%, 50%)",
          "kebab": 66,
          "kebabColor": "hsl(254, 70%, 50%)",
          "fries": 27,
          "friesColor": "hsl(101, 70%, 50%)",
          "donut": 99,
          "donutColor": "hsl(211, 70%, 50%)"
        },
        {
          "country": "AG",
          "hot dog": 97,
          "hot dogColor": "hsl(68, 70%, 50%)",
          "burger": 159,
          "burgerColor": "hsl(290, 70%, 50%)",
          "sandwich": 181,
          "sandwichColor": "hsl(214, 70%, 50%)",
          "kebab": 158,
          "kebabColor": "hsl(255, 70%, 50%)",
          "fries": 25,
          "friesColor": "hsl(190, 70%, 50%)",
          "donut": 117,
          "donutColor": "hsl(105, 70%, 50%)"
        },
        {
          "country": "AI",
          "hot dog": 164,
          "hot dogColor": "hsl(114, 70%, 50%)",
          "burger": 191,
          "burgerColor": "hsl(52, 70%, 50%)",
          "sandwich": 104,
          "sandwichColor": "hsl(283, 70%, 50%)",
          "kebab": 182,
          "kebabColor": "hsl(357, 70%, 50%)",
          "fries": 121,
          "friesColor": "hsl(89, 70%, 50%)",
          "donut": 167,
          "donutColor": "hsl(321, 70%, 50%)"
        },
        {
          "country": "AL",
          "hot dog": 167,
          "hot dogColor": "hsl(172, 70%, 50%)",
          "burger": 0,
          "burgerColor": "hsl(155, 70%, 50%)",
          "sandwich": 39,
          "sandwichColor": "hsl(96, 70%, 50%)",
          "kebab": 124,
          "kebabColor": "hsl(113, 70%, 50%)",
          "fries": 78,
          "friesColor": "hsl(45, 70%, 50%)",
          "donut": 195,
          "donutColor": "hsl(27, 70%, 50%)"
        },
        {
          "country": "AM",
          "hot dog": 42,
          "hot dogColor": "hsl(290, 70%, 50%)",
          "burger": 51,
          "burgerColor": "hsl(70, 70%, 50%)",
          "sandwich": 63,
          "sandwichColor": "hsl(113, 70%, 50%)",
          "kebab": 193,
          "kebabColor": "hsl(69, 70%, 50%)",
          "fries": 178,
          "friesColor": "hsl(33, 70%, 50%)",
          "donut": 90,
          "donutColor": "hsl(329, 70%, 50%)"
        }
    ]

    const MyResponsiveBar = ({data, vertOrHor}) => (
        <ResponsiveBar
            data={data}
            keys={[
                'hot dog',
                'burger',
                'sandwich',
                'kebab',
                'fries',
                'donut'
            ]}
            indexBy="country"
            layout={vertOrHor}
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
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
                        id: 'fries'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'sandwich'
                    },
                    id: 'lines'
                }
            ]}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend:(vertOrHor === 'vertical' ? 'country' : 'food'),
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend:(vertOrHor === 'vertical' ? 'food' : 'country'),
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={20}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right', //'top', // '
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 30,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            tooltip={({ id, value, color }) => (
                <div
                    style={{
                        padding: 12,
                        color,
                        background: '#222222',
                    }}
                >
                    <span>
                        Bar Graph Value
                    </span>
                    <br />
                    <strong>
                        {id}: {value}
                    </strong>
                </div>
            )}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
        />
    )

    MyResponsiveBar.propTypes = {
        data: PropTypes.object.isRequired,
        vertOrHor: PropTypes.string.isRequired
    } 

    return(
        <>
        <CCard>
            <CCardHeader>
                <CRow>
                    <CCol sm={6}>
                    <h4>Nivo Bar Graph</h4>
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
                            {['horizontal', 'vertical'].map( (value) => (
                                <CButton 
                                color='outline-secondary'
                                active={value === vertOrHor}
                                onClick={() => setVertOrHor(value.toLowerCase())}
                                key={value}>
                                    {value}
                                </CButton>
                            ))}
                        </CButtonGroup>
                    </CCol>
                </CRow>
                
            </CCardHeader>
            <CCardBody style={{height:'600px'}}>
                {viewType === 'Graph'
                ?<MyResponsiveBar 
                    data={barData}
                    vertOrHor={vertOrHor}
                     />
                :<DataTableView tableData={barData} />
                }
            </CCardBody>
        </CCard>
        </>
    )
}
export default NivoBar
