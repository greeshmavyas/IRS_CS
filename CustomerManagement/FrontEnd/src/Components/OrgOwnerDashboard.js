import React, { Component } from "react";
import NavbarDash from "./NavbarDash";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Container } from "react-bootstrap";
import config from "../config/settings";
import { getOrganizationID } from "./utils";
import NoOrgFound from './NoOrgFound.js';
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  Cell,
} from "recharts";
var HashMap = require("hashmap");
var casesByCategory = [];
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={"middle"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class OrgOwnerDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pieChartData: [],
      barGraphData: [],
      casesAvailable: true
    };
    this.getCasesByOrgID = this.getCasesByOrgID.bind(this);
    this.populateBarGraphData = this.populateBarGraphData.bind(this);
  }
  componentWillMount() {
    console.log("component will mount");
    this.getCasesByOrgID();
  }
  getCasesByOrgID() {
    axios.defaults.withCredentials = true;
    let orgID = getOrganizationID();
    axios({
      method: "get",
      url: config.rooturl + "/casesForDashboardByOrgID/" + orgID,
    })
      .then((response) => {
        console.log("Status Code : ", response.status);
        console.log("Response from get cases by org ");
        console.log(response.data);
        let resCasesNumber = 0;
        let inProgCasesNumber = 0;
        let assignedCasesNumber = 0;
        let categoriesToCases = new HashMap();

        if (response.data && response.status == 200) {
          if(response.data.cases.length == 0){
            this.setState({
             casesAvailable: false
            });
          }
          for (let i = 0; i < response.data.cases.length; i++) {
            let myCase = response.data.cases[i];
            if (myCase.Status == "Resolved") {
              resCasesNumber++;
            } else if (myCase.Status == "InProgress") {
              inProgCasesNumber++;
            } else {
              assignedCasesNumber++;
            }

            if (categoriesToCases.has(response.data.cases[i].Category)) {
              categoriesToCases.set(
                response.data.cases[i].Category,
                categoriesToCases.get(response.data.cases[i].Category) + 1
              );
            } else {
              categoriesToCases.set(response.data.cases[i].Category, 1);
            }
          }
          casesByCategory = [];
          categoriesToCases.forEach(this.populateBarGraphData);

          this.setState({
            pieChartData: [
              { name: "Resolved", cases: resCasesNumber },
              { name: "In Progress", cases: inProgCasesNumber },
              { name: "Assigned", cases: assignedCasesNumber },
            ],
            barGraphData: casesByCategory,
          });

          console.log(this.state.barGraphData);
          console.log(this.state.pieChartData);
        } else {
          console.log("Unable to display dashboard");
          alert("unable to display dashboard");
        }
      })
      .catch((error) => {
        console.log("Unable to display dashboard");
      });
  }
  populateBarGraphData(value, key, map) {
    casesByCategory.push({ name: key, cases: value });
  }

  render() {
    let redirectVar = null;
    let orgId = getOrganizationID()
    if(!orgId){
        return <div style={{ marginTop: '6rem' }}><NoOrgFound/></div>
    }
    return (
      <div>
        {redirectVar}
        <NavbarDash />
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          
        </div>
        {this.state.casesAvailable? (
        <Container>
          <div style={{ textAlign: "center" }}>
            <div className="Dashboard">
              <div style={{ textAlign: "center", marginTop: "90px" }}>
                <div style={{ marginLeft: "120px" }}>
                  <h4>Cases by Status</h4>
                  
                </div>
                {/* cases by status */}
                <PieChart width={500} height={400} margin={{ left: 100 }}>
                  <Pie
                    dataKey="cases"
                    nameKey="name"
                    isAnimationActive={true}
                    data={this.state.pieChartData}
                    cx={200}
                    cy={200}
                    outerRadius={150}
                    labelLine={false}
                    cursor="pointer"
                    label={renderCustomizedLabel}
                  >
                    {this.state.pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index]}
                        label={entry.name}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ marginLeft: "120px" }}>
                  <h4>Cases by Category</h4>
                </div>
                <BarChart
                  width={500}
                  height={300}
                  data={this.state.barGraphData}
                  margin={{
                    top: 50,
                    right: 30,
                    left: 100,
                    bottom: 5,
                  }}
                  barSize={10}
                >
                  <XAxis
                    dataKey="name"
                    scale="point"
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar
                    dataKey="cases"
                    fill="#8884d8"
                    background={{ fill: "#eee" }}
                  />
                </BarChart>
              </div>
            </div>
          </div>
        </Container>
         ) : (
          <div>
            <h4 style={{ marginLeft: "8em" }}>No existing cases to display the dashboard!</h4>
          </div>
        )}
      
      </div>
    );
  }
}
export default OrgOwnerDashboard;
