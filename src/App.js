import { forwardRef } from 'react';
import React, { Component } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import {map, filter} from './data.js';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  class App extends Component {
    state = {
      allColumns: new Set([{ title: "Date", field: "date" },
      { title: "State", field: "state" },
      { title: "Positive", field: "positive" },
      { title: "Negative", field: "negative" },
      { title: "Pending", field: "pending" },
      { title: "Hospitalized Currently", field: "hospitalizedCurrently" },
      { title: "Hospitalized Cumulative", field: "hospitalizedCumulative" },
      { title: "ICU Current", field: "inIcuCurrently" },
      { title: "ICU Cumulative", field: "inIcuCumulative" },
      { title: "Ventilator Current", field: "onVentilatorCurrently" },
      { title: "Ventilator Cumulative", field: "onVentilatorCumulative" },
      { title: "Recovered", field: "recovered" },
      { title: "Date Checked", field: "dateChecked" },
      { title: "Deaths", field: "death" },
      { title: "Hospitalized", field: "hospitalized" },
      { title: "Total Tests", field: "total" },
      { title: "Total Tests field 2", field: "totalTestResults" },
      { title: "Positive plus Negative", field: "posNeg" },
      { title: "Deaths Increase", field: "deathIncrease" },
      { title: "Hospitalized Increase", field: "hospitalizedIncrease" },
      { title: "Negative Increase", field: "negativeIncrease" },
      { title: "Positive Increase", field: "positiveIncrease" },
      { title: "Total Test Increase", field: "totalTestResultsIncrease"}]
    ),
      columns: [
        { title: "Date", field: "date" },
        { title: "State", field: "state" },
        { title: "Positive", field: "positive" },
        { title: "Negative", field: "negative" },
        { title: "Positive Ratio", field: "positiveRatio" },
        { title: "Pending", field: "pending" },
        { title: "Hospitalized Currently", field: "hospitalizedCurrently" },
        { title: "Hospitalized Cumulative", field: "hospitalizedCumulative" },
        { title: "ICU Current", field: "inIcuCurrently" },
        { title: "ICU Cumulative", field: "inIcuCumulative" },
        { title: "Ventilator Current", field: "onVentilatorCurrently" },
        { title: "Ventilator Cumulative", field: "onVentilatorCumulative" },
        { title: "Recovered", field: "recovered" },
        { title: "Date Checked", field: "dateChecked" },
        { title: "Deaths", field: "death" },
        { title: "Hospitalized", field: "hospitalized" },
        { title: "Total Tests", field: "total" },
        { title: "Total Tests field 2", field: "totalTestResults" },
        { title: "Positive plus Negative", field: "posNeg" },
        { title: "Deaths Increase", field: "deathIncrease" },
        { title: "Hospitalized Increase", field: "hospitalizedIncrease" },
        { title: "Negative Increase", field: "negativeIncrease" },
        { title: "Positive Increase", field: "positiveIncrease" },
        { title: "Total Test Increase", field: "totalTestResultsIncrease"}
      ],
      data: [{
        "date":20200404,
        "state":"AK",
        "positive":171,
        "negative":5869,
        "pending":null,
        "hospitalizedCurrently":null,
        "hospitalizedCumulative":16,
        "inIcuCurrently":null,
        "inIcuCumulative":null,
        "onVentilatorCurrently":null,
        "onVentilatorCumulative":null,
        "recovered":null,
        "hash":"10a0cf7d2d88dce27674dda730950a2661caa4b0",
        "dateChecked":"2020-04-04T20:00:00Z",
        "death":5,
        "hospitalized":16,
        "total":6040,
        "totalTestResults":6040,
        "posNeg":6040,
        "fips":"02",
        "deathIncrease":2,
        "hospitalizedIncrease":1,
        "negativeIncrease":10,
        "positiveIncrease":14,
        "totalTestResultsIncrease":24
    }]
    }

    componentDidMount() {
      fetch('https://covidtracking.com/api/states/daily')
      .then(res => res.json())
      .then(json => {
        let mappedData = map(json, 'positiveRatio', item => Math.floor((item.positiveIncrease / item.totalTestResultsIncrease) * 100))
        this.setState({data: mappedData, rawData: json});
      });
    }

    render() {
      return (
        <div style={{ maxWidth: "100%" }}>
          <MaterialTable
            icons={tableIcons}
            columns={this.state.columns}
            data={this.state.data}
            title="Demo Title"
          />
        </div>
      );
    }
  }

  ReactDOM.render(<App />, document.getElementById("root"));

export default App;
