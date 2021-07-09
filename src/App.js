import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './Login'
import Welcome from './Welcome'
import Survey from './Survey'
import Complete from './Complete'
import { ProtectedRoute } from "./protected.route";
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/' exact component={Login}/>
          <ProtectedRoute exact path='/survey' component={Survey}/>
          <ProtectedRoute path='/welcome' exact component={Welcome}/>
          <ProtectedRoute path='/complete' exact component={Complete}/>
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
