import React from 'react'
import {
    CButton,
    CModal,
    CModalFooter,
    CCol,
    CAlert
} from '@coreui/react'

export const Popup = (props) => {
    return (
        <CModal size="sm" show={props.show || true} onClose={props.handler}>
            <CAlert color={props.type} >
                <h5 className="text-center">{props.header}</h5>
            </CAlert>
                <p style={{padding:'0px 10px'}} className="text-center">{props.message}</p>
            <CModalFooter>
                <CCol xs="12" className="text-center">
                    <CButton color={props.type} onClick={props.handler} > {props.action} </CButton>
                </CCol>
            </CModalFooter>
        </CModal>
    )
};