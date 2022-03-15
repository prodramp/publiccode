import React from 'react'
import PropTypes from 'prop-types';
const { CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell } = require("@coreui/react");


function DataTableView( {tableData}){
    const columns = Object.keys(tableData[0])

    const tableHeaderData = () => {
        return(columns.map( (data) => {
            return <CTableHeaderCell scope="col" key={data}>
                {data.toUpperCase()}
            </CTableHeaderCell>
            }
        ))
    }    

    const tableBodyData = () => {
        return tableData.map((rowData) => {
            return(
                <CTableRow key={rowData}>
                    {
                       columns.map( (colId) => {
                            return <CTableDataCell scope='col' key={colId}>
                                {rowData[colId]}
                            </CTableDataCell>
                       }) 
                    }
                </CTableRow>
            )
        })
    }

    DataTableView.propTypes = {
        tableData: PropTypes.object.isRequired,
    } 

    return(
        <CTable bordered striped>
            <CTableHead>
                <CTableRow>
                    {tableHeaderData()}
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {tableBodyData(0)}
            </CTableBody>
        </CTable>
    )

}
export default DataTableView