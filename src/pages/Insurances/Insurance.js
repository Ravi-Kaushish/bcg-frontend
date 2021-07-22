import React from 'react';
import {
  CButton, CCard, CCardBody, CCardHeader, CModalHeader, CModal, CModalBody, CModalTitle, CModalFooter, CCol, CInput,
  CTabs, CTabPane, CTabContent, CNavItem, CAlert, CNav, CNavLink, CRow, CFormGroup, CLabel,
  CSelect, CCallout
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { PageLoader, ModalLoader } from '../../components/Loaders';
import { Popup } from '../../components/Popups';
import API from '../../utils/api';
import { HTTP_SUCCESS, INSURANCES } from '../../utils/constants';
import { POLICY_COVEREAGE } from '../../utils/iterables';
import { validatePolicyData } from '../../utils/validations';

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
      insurance: {},

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
      this.setState({ insurance: response.data, loading: false });
    } else {
      this.setState({ loading: false });
      //Add Error Alerts Messages here
      // console.log("An error occured while retreiving Insurances data");
    }
  };

  updatePolicy = async () => {
    let data = {
      policy_id: this.state.insurance.policy_id,
      premium: this.state.premium,
      body_injury_liability: this.state.body_injury_liability || false,
      personal_injury_protection: this.state.personal_injury_protection || false,
      property_damage_liability: this.state.property_damage_liability || false,
      collision: this.state.collision || false,
      comprehensive: this.state.comprehensive || false
    };
    let errors = validatePolicyData(data);
    if (!errors) {
      this.setState({ processing: true });
      let response = await API.putAsync(`${INSURANCES}/${this.state.insurance_id}`, data);
      if (HTTP_SUCCESS.includes(response.status)) {
        this.invokePopup("success", "Success", "Policy Details Updated")
      } else {
        this.invokePopup("danger", "Error", response.data)
      }
    } else {
      this.setState({
        policyError: errors, processing: false
      });
    }
  };

  resetControls = () => {
    this.setState({
      loading: false,
      processing: false,

      popup: false,
      popupType: '',
      popupHeader: '',
      popupMessage: '',

      policyModal: false
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

  getBadgeColor = status => {
    if (status === true) {
      return "success"
    } else if (status === false) {
      return "danger"
    } else {
      return "warning"
    }
  };

  render() {
    return (
      <div>
        {this.state.loading ? <PageLoader /> : null}
        {this.state.popup ? <Popup action={this.state.popupAction} handler={this.popupHandler} type={this.state.popupType} header={this.state.popupHeader} message={this.state.popupMessage} /> : null}
        <CTabs activeTab="policy">
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink data-tab="insurance">
                Insurance Details
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="policy">
                Policy Details
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="customer">
                Customer Details
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane data-tab="insurance">
              <CCard className="p-4">
                <CCardHeader>
                  <CRow>
                    <CCol xs="6">
                      <h3 >Insurance Id: {this.state.insurance.insurance_id}</h3>
                    </CCol>
                    <CCol xs="6" className="text-right">
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs="6">
                      <CIcon name="cil-user" /><strong> Customer Id: </strong>
                      <p className="text-muted">{this.state.insurance.customer_id}</p>
                    </CCol>
                    <CCol xs="6" className="text-right">
                      <CIcon name="cil-shield-alt" /><strong> Policy Id: </strong>
                      <p className="text-muted">{this.state.insurance.policy_id}</p>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="6">
                      <CIcon name="cil-history" /><strong> Purchase Date: </strong>
                      <p className="text-mutes">{this.state.insurance.purchase_date}</p>
                    </CCol>
                    <CCol xs="6" className="text-right">
                      <CIcon name="cil-history" /><strong> Expiry Date: </strong>
                      <p className="text-muted">{this.state.insurance.expiry_date}</p>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CTabPane>
            <CTabPane data-tab="policy">
              <CCard className="p-4">
                <CCardHeader>
                  <CRow>
                    <CCol xs="6">
                      <h3 >Policy Id: {this.state.insurance.policy_id}</h3>
                    </CCol>
                    <CCol xs="6" className="text-right">
                      <CButton variant="outline" color="dark" onClick={() => this.setState({ policyModal: true })}> {"Edit"} </CButton>
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs="6">
                      <strong> Premium Amount: </strong>
                      <p className="text-muted">$ {this.state.insurance.premium} Quarterly </p>
                    </CCol>
                    <CCol xs="6" className="text-right">
                      <strong> Vehilce Fuel Type: </strong>
                      <p className="text-muted">{this.state.insurance.fuel}</p>
                    </CCol>
                  </CRow>
                  <CCard>
                    <CCardBody>
                      <h3>Liabilities Covered</h3>
                      <hr></hr>
                      {
                        POLICY_COVEREAGE.map((cover, index) => {
                          return (
                            <CCallout key={index} color={this.getBadgeColor(this.state.insurance[cover.property])}>
                              <p className="h4">{cover.title}</p>
                              <small className="text-muted">{cover.name} is {!this.state.insurance[cover.property] ? "not" : ""} covered in this policy</small>
                            </CCallout>
                          )
                        })}
                    </CCardBody>
                  </CCard>
                </CCardBody>
              </CCard>
            </CTabPane>
            <CTabPane data-tab="customer">
              <CCard className="p-4">
                <CCardHeader>
                  <CRow>
                    <CCol xs="6">
                      <h3 >Customer Id: {this.state.insurance.customer_id}</h3>
                    </CCol>
                    <CCol xs="6" className="text-right">
                      <CButton variant="outline" color="dark" disabled onClick={() => this.setState({ customerModal: true })}> {"Edit"} </CButton>
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs="6">
                      <strong> Name: </strong>
                      <p className="text-muted">{this.state.insurance.name}</p>
                    </CCol>
                    <CCol xs="6" className="text-right">
                      <strong> Gender: </strong>
                      <p className="text-muted">{this.state.insurance.gender}</p>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="6">
                      <strong> Email: </strong>
                      <p className="text-muted">{this.state.insurance.email}</p>
                    </CCol>
                    <CCol xs="6" className="text-right">
                      <strong> Marital Status: </strong>
                      <p className="text-muted">{this.state.insurance.marital_status ? "Married" : this.state.insurance.marital_status === false ? "Single" : "Not Known"}</p>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="6">
                      <strong> Phone: </strong>
                      <p className="text-muted">{this.state.insurance.phone}</p>
                    </CCol>
                    <CCol xs="6" className="text-right">
                      <strong> Region: </strong>
                      <p className="text-muted">{this.state.insurance.region}</p>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="6">
                      <strong> Income Group: </strong>
                      <p className="text-muted">{this.state.insurance.income_range}</p>
                    </CCol>
                    <CCol xs="6" className="text-right">
                      <strong> Date of Birth: </strong>
                      <p className="text-muted">{"Not Known"}</p>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CTabPane>
          </CTabContent>
        </CTabs>
        <div className="action-modals">
          <CModal show={this.state.policyModal} onClose={() => this.resetControls()} size="lg">
            {this.state.processing ? <ModalLoader /> : null}
            <CModalHeader closeButton>
              <CModalTitle className="text-center"> {`Edit the insurance policy number: ${this.state.insurance.insurance_id}`} </CModalTitle>
            </CModalHeader>
            <CModalBody>
              {this.state.policyError ? <CAlert color="danger">{this.state.policyError}</CAlert> : null}
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="premium"> Premium Amount: </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput type="text" name="premium" value={this.state.premium} onChange={this.onChange} placeholder="Premium amount in $" />
                </CCol>
              </CFormGroup>
              {
                POLICY_COVEREAGE.map((cover, index) => {
                  return (
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="premium"> {cover.title}: </CLabel>
                      </CCol>
                      <CCol xs="6">
                        <CSelect custom name={cover.property} id={cover.property} onChange={this.onChange}>
                          <option value={false}>Not Covered</option>
                          <option value={true}>Covered</option>
                        </CSelect>
                      </CCol>
                    </CFormGroup>
                  )
                })}
            </CModalBody>
            <CModalFooter>
              <CButton color="primary" onClick={() => this.updatePolicy()}> Save </CButton>
              <CButton color="secondary" onClick={() => this.resetControls()}> Cancel </CButton>
            </CModalFooter>
          </CModal>
        </div>
      </div>
    )
  }
}