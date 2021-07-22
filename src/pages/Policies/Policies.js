import React from 'react';
import {
  CCard, CCardBody, CCol, CDataTable, CRow, CBadge
} from '@coreui/react';
import API from '../../utils/api';
import { HTTP_SUCCESS, POLICIES } from '../../utils/constants';
import { PageLoader } from '../../components/Loaders';

export default class Policies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      processing: false,

      policies: []
    }
  };

  async componentDidMount() {
    document.title = "Policies | BGC";
    this.getPolicies();
  };

  //Retrieve policies
  getPolicies = async () => {
    this.setState({ loading: true });
    let response = await API.getAsync(`${POLICIES}`);
    if (HTTP_SUCCESS.includes(response.status)) {
      this.setState({ policies: response.data, loading: false });
    } else {
      //Add Error Alerts Messages here
      this.setState({ loading: false });
    }
  };

  getBadge = status => {
    if (status === true) {
      return <CBadge color="success">Yes</CBadge>
    } else if (status === false) {
      return <CBadge color="danger">No</CBadge>
    } else {
      return <CBadge color="warning">NA</CBadge>
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
                  items={this.state.policies}
                  fields={[
                    { key: 'policy_id', label: 'Policy Id', _classes: 'font-weight-bold' },
                    { key: 'vehicle_type', label: 'Vehicle Segment Code' },
                    { key: 'premium', label: 'Premium Amount' },
                    { key: 'injury_cover', label: 'Injury Cover' },
                    { key: 'personal_cover', label: 'Personal Cover' },
                    { key: 'property_damage_cover', label: 'Property Cover' },
                    { key: 'accidental_cover', label: 'Accidental Cover' },
                    { key: 'comprehensive_cover', label: 'Both Party Cover' }
                  ]}
                  scopedSlots={{
                    'injury_cover':
                      (item) => (
                      <td className="text-center">
                        {this.getBadge(item.injury_cover)}
                      </td>
                      ),
                      'personal_cover':
                      (item) => (
                      <td className="text-center">
                        {this.getBadge(item.injury_cover)}
                      </td>
                      ),
                      'property_damage_cover':
                      (item) => (
                      <td className="text-center">
                        {this.getBadge(item.injury_cover)}
                      </td>
                      ),
                      'accidental_cover':
                      (item) => (
                      <td className="text-center">
                        {this.getBadge(item.injury_cover)}
                      </td>
                      ),
                      'comprehensive_cover':
                      (item) => (
                      <td className="text-center">
                        {this.getBadge(item.injury_cover)}
                      </td>
                      )
                  }}
                  hover
                  pagination
                  columnFilter={true}
                  itemsPerPage={10}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    )
  }
}