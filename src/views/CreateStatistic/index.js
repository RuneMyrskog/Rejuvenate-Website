import React from "react";
import "./styles.css";

import { Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";


export default class CreateStatistic extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			category: "",
			xAxis: "",
			yAxis: "",
		};
	}

	updateStatTitle = (e) => {
		e.preventDefault();
		this.setState({ title: e.target.value });
	}

	updateStatCategory = (e) => {
		e.preventDefault();
		this.setState({ category: e.target.value });
	}

	updateStatXAxis = (e) => {
		e.preventDefault();
		this.setState({ xAxis: e.target.value });
	}

	updateStatYAxis = (e) => {
		e.preventDefault();
		this.setState({ yAxis: e.target.value });
	}

	createNewStatistic = () => {
		console.log("doenswef")
		fetch(`/api/statistics`, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userid: this.props.app.state.user._id,
				category: this.state.category,
				title: this.state.title,
				xAxis: this.state.xAxis,
				yAxis: this.state.yAxis
			})
		})
			.then(res => res.json())
			.catch(error => console.log(error));
	}

	render() {
		return (
			<div id="createStatContainer">
				<span id="createStatTitle">Create New Statistic</span>
				<div className="loginComponent">
					<FormControl>
						<TextField
							id="statistic-title"
							value={this.state.title}
							onChange={this.updateStatTitle.bind(this)}
							label="Statistic Name"
						/>
						<TextField
							id="statistic-category"
							value={this.state.category}
							onChange={this.updateStatCategory.bind(this)}
							label="Statistic Category"
						/>
						<TextField
							id="statistic-x-axis"
							value={this.state.xAxis}
							onChange={this.updateStatXAxis.bind(this)}
							label="X-Axis Label"
						/>
						<TextField
							id="statistic-y-axis"
							value={this.state.yAxis}
							onChange={this.updateStatYAxis}
							label="Y-Axis Label"
						/>
						<br></br>
						<Button
							className="createStatisticsButton"
							onClick={this.createNewStatistic.bind(this)}
							href='/statistics'
							disabled={!this.state.title
								|| !this.state.category
								|| !this.state.xAxis
								|| !this.state.yAxis}
							variant="contained"
						>
							Create New Statistic
						</Button>
						<Button
							className="createStatisticsButton"
							href="/statistics"
							variant="contained"
						>
							Go Back
						</Button>
					</FormControl>
				</div>
			</div>
		);
	}
}
