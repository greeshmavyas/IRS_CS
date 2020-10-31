import React from '../node_modules/@types/react';
import { BrowserRouter } from '../node_modules/react-router-dom';
import Main from "./components/Main"
import './App.css';

import AgentLogin from "../../../frontend/src/components/AgentFunctionalities/login";
import AgentDashboard from "../../../frontend/src/components/AgentFunctionalities/Dashboard";
import AgentSettings from '../../../frontend/src/components/AgentFunctionalities/Settings';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/AgentLogin" component={AgentLogin} />
        <Route exact path="/AgentDashboard" component={AgentDashboard} />
        <Route exact path="/AgentSettings" component={AgentSettings} />
      </Switch>
    </Router>
  );
}

export default App;
