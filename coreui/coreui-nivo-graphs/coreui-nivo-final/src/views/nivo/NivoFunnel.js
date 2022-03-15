import React, {useState} from "react";
import PropTypes from 'prop-types'
import { ResponsiveFunnel } from "@nivo/funnel";
import { CButton, CButtonGroup, CCard, CCardBody, CCardHeader, CCol, CHeader, CRow } from '@coreui/react'
import {SchemeOptions} from './ColorSchemeOptions'
import Select from "react-select"

const NivoFunnel = () => {
    const [colorScheme, setColorScheme] = useState('spectral')
    const [vertOrHor, setVertOrHor] = useState('vertical')

    const funnelData = [
        {
          "id": "step_sent",
          "value": 72053,
          "label": "Sent"
        },
        {
          "id": "step_viewed",
          "value": 49434,
          "label": "Viewed"
        },
        {
          "id": "step_clicked",
          "value": 41686,
          "label": "Clicked"
        },
        {
          "id": "step_add_to_card",
          "value": 37960,
          "label": "Add To Card"
        },
        {
          "id": "step_purchased",
          "value": 32094,
          "label": "Purchased"
        }
      ]


    const MyResponsiveFunnel = ({ data, colorScheme, vertOrHor}) => (
        <ResponsiveFunnel
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            direction={vertOrHor}
            interpolation="smooth"
            valueFormat=">-.4s"
            colors={{ scheme: colorScheme }}
            fillOpacity={0.95}
            borderWidth={7}
            labelColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        3
                    ]
                ]
            }}
            beforeSeparatorLength={100}
            beforeSeparatorOffset={20}
            afterSeparatorLength={100}
            afterSeparatorOffset={20}
            currentPartSizeExtension={10}
            currentBorderWidth={40}
            motionConfig="wobbly"
        />
    )

    MyResponsiveFunnel.propTypes = {
        data: PropTypes.object.isRequired,
        colorScheme: PropTypes.string.isRequired,
        vertOrHor:PropTypes.string.isRequired
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
                        <h4>Nivo Funnel Graph</h4>
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
                        <CCol sm={3}>
                            <CustomSelectOptions />
                        </CCol>
                    </CRow>                
                </CCardHeader>
                <CCardBody style={{height:'600px'}}>
                    <MyResponsiveFunnel 
                        colorScheme={colorScheme}
                        vertOrHor={vertOrHor}
                        data={funnelData} />
                </CCardBody>    
            </CCard>    
        </>
    )

}
export default NivoFunnel;
