import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//views 
import Login from './views/Login';
import Register from './views/Register';
import PasswordReset from './views/Password Reset';
import AdminLogin from './views/Admin Login';
import AdminRegister from './views/Admin Register';
import AdminPasswordReset from './views/Admin Password Reset';

import Home from './views/Home';
import Profile from './views/Profile';
import Statistics from './views/Statistics';
import CreateStatistic from './views/CreateStatistic';
import AddFriend from './views/AddFriend';
import RecordStatistics from './views/RecordStatistics';
import Setting from './views/Setting';

import TopNavbar from './react-components/TopNavbar';

import './index.css';
var user = null;

class App extends React.Component{
    render() {
        return (
                <>
                <TopNavbar/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/home" component={Home}/>
                        
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/password reset" component={PasswordReset}/>
                        <Route exact path="/statistics" component={Statistics}/>
                        <Route exact path="/statistics/create" component={CreateStatistic}/>
                        <Route exact path="/addFriend" component={AddFriend}/>
                        <Route exact path="/recordStatistics" component={RecordStatistics}/>
                        <Route exact path="/setting" component={Setting}/>
                    </Switch>
                </BrowserRouter>
                </>
        );
    }
    
    componentDidMount() {
        if(user == null){
            console.log("user not logged in");
        }
    }
}

class AppLoginWrapper extends React.Component {
    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/password reset" component={PasswordReset} />
                    <Route exact path="/admin" component={AdminLogin} />
                    <Route exact path="/admin register" component={AdminRegister} />
                    <Route exact path="/admin password reset" component={AdminPasswordReset} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/profile" component={Profile} />
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<AppLoginWrapper/>, document.getElementById('root'));

