import React from 'react';
import {
  CCard, CCardBody, CCardHeader, CCol, CRow, CSelect
} from '@coreui/react';
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import API from '../../utils/api';
import { ANALYTICS, HTTP_SUCCESS, CHART_OPTIONS } from '../../utils/constants';
import { PageLoader } from '../../components/Loaders';

export default class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      processing: false,

      insurances: [],
      analytics: {}
    }
    this.onChange = this.onChange.bind(this);
  };

  async componentDidMount() {
    document.title = "Analytics | BGC";
    this.getAnalyticsData();
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "regionFilter") {
      this.getAnalyticsData(e.target.value);
    }
  };

  //Retrieve analytics data
  getAnalyticsData = async (region="all") => {
    this.setState({ loading: true });
    let response = await API.getAsync(`${ANALYTICS}?region=${region}`);
    if (HTTP_SUCCESS.includes(response.status)) {
      this.setState({ analytics: response.data, loading: false });
      this.transformAnalyticsData(response.data);
    } else {
      this.setState({ loading: false });
      //Add error Popup or messaging here
    }
  };

  transformAnalyticsData = (insurances) => {
    let labels = this.GetMonth(0, true);
    let data = [];
    for (let i = 0; i < 12; i++) {
      data.push(insurances.filter((insurance) => {
        let month = parseInt(insurance.purchase_date.split("-")[1]);
        return month === i + 1;
      }).length);
    }
    this.setState({
      analytics: {
        labels,
        data
      }
    });
  };

  GetMonth = (month = 0, all = false) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if (all === true) {
      return months;
    } else {
      return months[month - 1];
    }
  };

  render() {
    return (
      <div>
        <CRow>
          {this.state.loading ? <PageLoader /> : null}
          <CCol xl={12}>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol xs="6">
                    <h3> Analytics </h3>
                  </CCol>
                  <CCol xs="6">
                    <CRow>
                      <CCol xs="6">
                        <CSelect custom name="chartType" id="chartType" onChange={this.onChange}>
                          <option value="line">Line Chart</option>
                          <option value="bar">Bar Chart</option>
                        </CSelect>
                      </CCol>
                      <CCol xs="6">
                        <CSelect custom name="regionFilter" id="regionFilter" onChange={this.onChange}>
                          <option value="all">All Regions</option>
                          <option value="east">East</option>
                          <option value="west">West</option>
                          <option value="north">North</option>
                          <option value="south">South</option>
                        </CSelect>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                {this.state.chartType === 'bar' ?
                  <CChartBar
                    datasets={[{
                      label: 'Policies Per Month',
                      backgroundColor: '#F46224',
                      data: this.state.analytics.data
                    }]}
                    labels={this.state.analytics.months}
                    options={CHART_OPTIONS}
                  />
                  :
                  <CChartLine
                    datasets={[{
                      label: 'Policies Per Month',
                      backgroundColor: '#F46224',
                      data: this.state.analytics.data
                    }]}
                    labels={this.state.analytics.months}
                    options={CHART_OPTIONS}
                  />
                }
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    )
  }
}