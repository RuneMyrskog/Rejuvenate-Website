import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route , Redirect} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//views
import Login from "./views/Login";
import Register from "./views/Register";
import PasswordReset from "./views/PasswordReset";

import Home from "./views/Home";
import AdminDashboard from "./views/AdminDashboard";
import EditableProfile from "./views/EditableProfile";

import TopNavbar from "./react-components/TopNavbar";
import LoadingDisplay from "./react-components/LoadingDisplay";
import "./index.css";

class App extends React.Component {
	constructor(props){
		super(props);
		//keep global state in App component's state object, pass down App obj to children
		this.state = {
			user: null,
			following: null,
			followers: null
		}
	}

	follow(user) {
		fetch(`/api/users/follow/${user._id}`, {
			method: "post",
		})
		.then(res => {
			if (res.status === 200) {
				return res.json();
			}
			return Promise.reject();
		})
		.then(json => {

			const following = this.state.following;
			following.push(json.follow);
			this.setState({following: following})
		})
	}

	unfollow(user) {
		fetch(`/api/users/unfollow/${user._id}`, {
			method: "post",
		})
		.then(res => {
			if (res.status === 200) {
				return res.json();
			}
			return Promise.reject();
		})
		.then(json => {
			
			const following = this.state.following;
			let index = following.findIndex(user => user._id === json.follow._id)
			following.splice(index, 1);
			this.setState({following: following})
		})
	}

	render() {
		//page still fetching the user, return loading screen for now
		if (!this.state.user){
			return (
				<LoadingDisplay/>
			);
		}
		console.log(`Logged in as user ${this.state.user._id}`);
		return (
			<>
				<TopNavbar app={this} follow={this.follow.bind(this)} unfollow={this.unfollow.bind(this)}/>
				<BrowserRouter>
					<Switch>
						<Route exact path="/home" render={() => (<Home app={this} follow={this.follow.bind(this)} unfollow={this.unfollow.bind(this)}/>)}/> 

						<Route exact path="/admin dashboard" render={() => (<AdminDashboard app={this}/>)} />

						<Route path="/profile/:id" render={() => (<EditableProfile app={this}/>)} />

						<Route exact path="/otherUserProfile" render={() => (<EditableProfile app={this}/>)} /> 

					</Switch>
				</BrowserRouter>
			</>
		);
	}

	componentDidMount(){
		fetch(`/api/users/currentuser`)
			.then(res => res.json())
			.then(user => {
				this.setState({user: user})

				fetch(`/api/users/${user._id}/followers`)
					.then(res => res.json())
					.then(followers => this.setState({followers: followers}))

				fetch(`/api/users/${user._id}/following`)
					.then(res => res.json())
					.then(following => this.setState({following: following}))
			})
			
		
		
	}

}

class AppLoginWrapper extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/"  render={()=> (<Redirect to="/login"/>)}/>
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/password reset" component={PasswordReset} />
					<Route path="/" component={App} />
				</Switch>
			</BrowserRouter>
		);
	}
}

ReactDOM.render(<AppLoginWrapper />, document.getElementById("root"));
