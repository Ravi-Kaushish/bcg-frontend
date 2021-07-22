import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  CButton, CCard, CCardBody, CCardHeader, CCardFooter, CModalHeader, CModal, CModalBody, CModalTitle, CModalFooter, CBadge, CCol, CInput, CInputGroup,
  CDataTable, CInputGroupPrepend, CInputGroupText, CTabs, CSwitch, CTabPane, CTabContent, CNavItem, CAlert, CNav, CNavLink, CRow, CFormGroup, CLabel,
  CSelect, CInputRadio, CTooltip
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { PageLoader, ModalLoader } from '../../components/Loaders';
import { Popup } from '../../components/Popups';
import API from '../../utils/api';
import { HTTP_SUCCESS, INSURANCES } from '../../utils/constants';

export default class Insurance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      processing: false,
      redirect: false,

      popup: false,
      popupType: 'primary',
      popupHeader: '',
      popupMessage: '',
      popupAction: '',

      insurance_id: this.props.match.params.id
    }
    this.onChange = this.onChange.bind(this);
    this.popupHandler = this.popupHandler.bind(this);
  };

  componentDidMount() {
    document.title = this.state.insurance_id;
    this.getInsurance();
  };

  getInsurance = async () => {
    this.setState({ loading: true });
    let response = await API.getAsync(`${INSURANCES}/${this.state.insurance_id}`);
    if (HTTP_SUCCESS.includes(response.status)) {
      this.setState({ insurances: response.data, loading: false });
    } else {
      this.setState({ loading: false });
      //Add Error Alerts Messages here
      // console.log("An error occured while retreiving Insurances data");
    }
  };

  resetControls = () => {
    this.setState({
      loading: false,
      processing: false,

      popup: false,
      popupType: '',
      popupHeader: '',
      popupMessage: ''
    });
  };

  popupHandler = () => {
    this.setState({
      popup: false,
      popupType: '',
      popupHeader: '',
      popupMessage: ''
    });
  };

  invokePopup = (popupType, popupHeader, popupMessage, popupAction = 'Okay', popup = true) => {
    this.resetControls();
    this.setState({ popupType, popupHeader, popupMessage, popupAction, popup });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div>
        {this.state.loading ? <PageLoader /> : null}
        {this.state.popup ? <Popup action={this.state.popupAction} handler={this.popupHandler} type={this.state.popupType} header={this.state.popupHeader} message={this.state.popupMessage} /> : null}
        <CTabs activeTab="app">
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink data-tab="info">
                Policy Details
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="settings">
                Settings
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane data-tab="info">
              <h3> Information </h3>
            </CTabPane>
            <CTabPane data-tab="settings">
              <h3> Settings </h3>
            </CTabPane>
          </CTabContent>
        </CTabs>
        <div className="action-modals">
          <CModal show={this.state.tabModal} onClose={() => this.resetControls()} size="lg">
            {this.state.processing ? <ModalLoader /> : null}
            <CModalHeader closeButton>
              <CModalTitle className="text-center"> Add a new tab to this app. </CModalTitle>
            </CModalHeader>
            <CModalBody>
              {this.state.tabError ? <CAlert color="danger">{this.state.tabError}</CAlert> : null}
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="tabTitle"> Tab Title </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput type="text" name="tabTitle" value={this.state.tabTitle} onChange={this.onChange} placeholder="Custom Tab" />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="tabUrl"> Tab Content URL </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput type="text" name="tabUrl" value={this.state.tabUrl} onChange={this.onChange} placeholder="https://ignite-app.com/ui" />
                </CCol>
              </CFormGroup>
            </CModalBody>
            <CModalFooter>
              <CButton color="primary" onClick={() => this.addTab()}> Save </CButton>
              <CButton color="secondary" onClick={() => this.resetControls()}> Cancel </CButton>
            </CModalFooter>
          </CModal>
        </div>
      </div>
    )
  }
}