import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import login from './components/login';
import OrgOwnerDashboard from './components/OrgOwnerDashboard';
import updateProfile from './components/updateProfile';
import OrgOwnerReg from './components/OrgOwnerReg';
import OrgOwnerLogin from './components/OrgOwnerLogin';
import Organization from './components/Organization';
import OrgRegistration from './components/OrgRegistration';
import AgentsList from './components/AgentsList'

 class Main extends Component {
    render() {
        return (
          <div>
            <Route exact path="/" component={OrgOwnerLogin} />
            <Route exact path ="/OrgOwnerReg" component={OrgOwnerReg}/>
            <Route exact path="/OrgOwnerLogin" component={OrgOwnerLogin}/>
            <Route exact path="/OrgOwnerDashboard" component={OrgOwnerDashboard} />
            <Route exact path="/Organization" component={Organization}/>
            <Route exact path="/updateProfile" component={updateProfile} />
            <Route exact path="/OrgRegistration" component = {OrgRegistration}/>
            <Route exact path = "/Agents" component = {AgentsList}/>
          </div>
        );
    }
}

export default Main;