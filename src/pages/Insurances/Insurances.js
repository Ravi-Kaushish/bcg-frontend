import React from 'react';
import {
  CCard, CCardBody, CCol, CDataTable, CRow
} from '@coreui/react';
import API from '../../utils/api';
import { HTTP_SUCCESS, INSURANCES } from '../../utils/constants';
import { PageLoader } from '../../components/Loaders';

export default class Insurances extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      processing: false,

      insurances: []
    }
  };

  async componentDidMount() {
    document.title = "Insurances | BGC";
    this.getInsurances();
  };

  getInsurances = async () => {
    this.setState({ loading: true });
    let response = await API.getAsync(`${INSURANCES}`);
    if (HTTP_SUCCESS.includes(response.status)) {
      this.setState({ insurances: response.data, loading: false });
    } else {
      this.setState({ loading: false });
      //Add Error Alerts Messages here
      // console.log("An error occured while retreiving Insurances data");
    }
  };

  render() {
    return (
      <div>
        <CRow>
          {this.state.loading ? <PageLoader /> : null}
          <CCol xl={12}>
            <CCard>
              <CCardBody>
                <CDataTable
                  items={this.state.insurances}
                  fields={[
                    { key: 'insurance_id', label: 'Insurance Id', _classes: 'font-weight-bold' },
                    { key: 'policy_id', label: 'Policy Id' },
                    { key: 'customer_id', label: 'Customer Id' },
                    { key: 'name', label: 'Customer Name' },
                    { key: 'email', label: 'Customer Email' },
                    { key: 'purchase_date', label: 'Purchased On' },
                    { key: 'expiry_date', label: 'Expires On' }
                  ]}
                  hover
                  pagination
                  columnFilter={true}
                  itemsPerPage={10}
                  clickableRows
                  onRowClick={(item) => this.props.history.push(`/insurances/${item.insurance_id}`)}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    )
  }
}