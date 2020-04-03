import React from 'react';  
import UserList from './UserList';
import UpdateUser from './UpdateUser';
import AddUser from './AddNewUser';
import Error404 from './404' 
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 

import './comman.css';
import './form.css';
import './usersList.css';


class App extends React.Component {
 
  render(){
    return (   
        <Router>  
          <Switch> 
              <Route exact path="/" component={UserList}/>
              <Route exact path="/add-user" component={AddUser} />
              <Route exact path="/edit-user/:user_id" component={UpdateUser} />
              <Route component={Error404} />
            </Switch>  
        </Router>  
    );
  }
}

export default App;


/*
<img src="data:image/jpeg;base64,iVBORw0K.....5CYII=" style=" width: 200px; height: 200px; background-color: black;">
*/