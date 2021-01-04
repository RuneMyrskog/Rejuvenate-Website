import React from "react";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import SearchBar from "../../react-components/SearchBar";

export default class TopNavbar extends React.Component {
	logout = () => {
		fetch(`/api/logout`, {
			method: "post",
		});
		this.props.history.push("/login");
	};

	dashboardLinkIfAdmin() {
		const app = this.props.app;
		if (app.state.user.isAdmin) {
			return (
				<div id="adminDashboardNavLinkContainer">
					<Nav.Link id="topNavBarOption" href="/admin dashboard">
						Admin Dashboard
					</Nav.Link>
				</div>
			);
		}
	}

	render() {
		return (
			<div className="topRow">
				<BrowserRouter>
					<Navbar className="Navbar" expand="lg" sticky="top">
						<Navbar.Brand href="/home" id="title">
							Rejuvenate
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<SearchBar
								maxusers={10}
								loginUserid={this.props.app.state.user._id}
								app={this.props.app}
								follow={this.props.follow}
								unfollow={this.props.unfollow}
							/>
							<Nav className="navContent">
								<Nav.Link id="topNavBarOption" href="/userProfile">
									Profile
								</Nav.Link>
								<Nav.Link id="topNavBarOption" href="/statistics">
									Statistics
								</Nav.Link>
								{/* <NavDropdown title="Statistics" id="option">
									<NavDropdown.Item href="/statistics/record">
										Record Statistics
									</NavDropdown.Item>
									<NavDropdown.Item href="/statistics">
										View Statistics
									</NavDropdown.Item>
								</NavDropdown> */}
								{/* <Nav.Link id="topNavBarOption" href="/settings">
									Settings
								</Nav.Link> */}
								<Nav.Link
									id="topNavBarOption"
									onClick={this.logout}
									href="/login"
								>
									Sign Out
								</Nav.Link>
								{this.dashboardLinkIfAdmin()}
							</Nav>
						</Navbar.Collapse>
					</Navbar>
				</BrowserRouter>
			</div>
		);
	}
}
