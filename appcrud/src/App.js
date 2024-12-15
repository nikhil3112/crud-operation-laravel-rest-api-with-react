import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Navbar from './pages/Navbar';

import ViewUser from './pages/ViewUser';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';

import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  return (
    <div className="App">

        <Router>

          <Navbar />

          <Switch>

            <Route path="/users" component={ViewUser} />
            <Route path="/add-user" component={AddUser} />
            <Route path="/edit-user/:id" component={EditUser} />

          </Switch>
        </Router>
    </div>
  );
}

export default App;
