import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import './ViewApplicants.css';
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';

// const processString = require('react-process-string');

addStyle(Button, 'view-more');
addStyle(Button, 'first-rank');
addStyle(Button, 'reject-rank');
addStyle(Button, 'maybe-rank');

class ViewApplicants extends Component {
	state = {
        viewStartup: false,
        fullList: [],
        startup:''
	};

	constructor(props) {
		super(props);

		this.displayInfo = this.displayInfo.bind(this);
		this.displayTable = this.displayTable.bind(this);
		this.changeStatusFirst = this.changeStatusFirst.bind(this);
		this.changeStatusReject = this.changeStatusReject.bind(this);
		this.changeStatusMaybe = this.changeStatusMaybe.bind(this);
		// this.sortFirstName = this.sortFirstName.bind(this);
		// this.sortLastName = this.sortLastName.bind(this);
		// this.sortConcentration = this.sortConcentration.bind(this);
		// this.sortClassYear = this.sortClassYear.bind(this);
		// this.sortRank = this.sortRank.bind(this);
		// this.sortFirstNamePres = this.sortFirstNamePres.bind(this);
		// this.sortLastNamePres = this.sortLastNamePres.bind(this);
	}

	async componentDidMount() {
		await axios
			.get('/api/trialcompany')
			.then(res => {
                console.log("component mount",res.data);
				this.setState({ fullList: res.data });
			})
			.catch(err => console.log(err));
	}

	async displayInfo(startupId) {
    	await axios
			.get('/api/trialcompany/' + startupId)
			.then(res => {
				console.log('Display Info Current Startup', res.data);
				this.setState(
					{
						startup: res.data,
						viewStartup: true
					},
					function () {
						// console.log('Get user on display info');
						// console.log(this.state.user);
						// console.log(this.state.teamOne);
					}
				);
			})
			.catch(err => console.log(err));
	}

	displayTable() {
		this.setState({
			viewStartup: false
		});
	}

	// async sortFirstName() {
	// 	await axios
	// 		.get('/api/users/firstname')
	// 		.then(res => {
	// 			// allApplicants = res.data;
	// 			this.setState({ applicants: res.data });
	// 		})
	// 		.catch(err => console.log(err));
	// }
	// async sortFirstNamePres() {
	// 	await axios
	// 		.get('/api/users/all/firstname')
	// 		.then(res => {
	// 			// allApplicants = res.data;
	// 			this.setState({ fullList: res.data });
	// 		})
	// 		.catch(err => console.log(err));
	// }
	// async sortLastName() {
	// 	await axios
	// 		.get('/api/users/lastname')
	// 		.then(res => {
	// 			// allApplicants = res.data;
	// 			this.setState({ applicants: res.data });
	// 		})
	// 		.catch(err => console.log(err));
	// }
	// async sortLastNamePres() {
	// 	await axios
	// 		.get('/api/users/all/lastname')
	// 		.then(res => {
	// 			// allApplicants = res.data;
	// 			this.setState({ fullList: res.data });
	// 		})
	// 		.catch(err => console.log(err));
	// }
	// async sortConcentration() {
	// 	await axios
	// 		.get('/api/users/concentration')
	// 		.then(res => {
	// 			// allApplicants = res.data;
	// 			this.setState({ applicants: res.data });
	// 		})
	// 		.catch(err => console.log(err));
	// }
	// async sortClassYear() {
	// 	await axios
	// 		.get('/api/users/classyear')
	// 		.then(res => {
	// 			// allApplicants = res.data;
	// 			this.setState({ applicants: res.data });
	// 		})
	// 		.catch(err => console.log(err));
	// }
	// async sortRank() {
	// 	await axios
	// 		.get('/api/users/rank')
	// 		.then(res => {
	// 			// allApplicants = res.data;
	// 			this.setState({ applicants: res.data });
	// 		})
	// 		.catch(err => console.log(err));
	// }

	changeStatusFirst() {
        var trialCompanyList = this.state.fullList;
		console.log('TRIAL COMPANY LIST', trialCompanyList);
		var startup = '';
		trialCompanyList.forEach(element => {
			if (element.id === this.state.startup.id) {
				startup = element;
			}
		});
        var newTrialCompany = startup;
		newTrialCompany.status = 'Accept';
		axios
			.patch('/api/trialcompany/' + startup.id, newTrialCompany)
			.then(res => {
				console.log('update trialcompany response: ', res.data);
				this.setState({
					viewStartup: false
				});
			})
			.catch(err => console.log(err));
	}

	changeStatusReject() {
		var trialCompanyList = this.state.fullList;
		console.log('TRIAL COMPANY LIST', trialCompanyList);
		var startup = '';
		trialCompanyList.forEach(element => {
			if (element.id === this.state.startup.id) {
				startup = element;
			}
		});
        var newTrialCompany = startup;
		newTrialCompany.status = 'Reject';
		axios
			.patch('/api/trialcompany/' + startup.id, newTrialCompany)
			.then(res => {
				console.log('update trialcompany response: ', res.data);
				this.setState({
					viewStartup: false
				});
			})
			.catch(err => console.log(err));
	}

	changeStatusMaybe() {
		var trialCompanyList = this.state.fullList;
		console.log('TRIAL COMPANY LIST', trialCompanyList);
		var startup = '';
		trialCompanyList.forEach(element => {
			if (element.id === this.state.startup.id) {
				startup = element;
			}
		});
        var newTrialCompany = startup;
		newTrialCompany.status = 'Maybe';
		axios
			.patch('/api/trialcompany/' + startup.id, newTrialCompany)
			.then(res => {
				console.log('update trialcompany response: ', res.data);
				this.setState({
					viewStartup: false
				});
			})
			.catch(err => console.log(err));
	}

	render() {
        console.log('before render table');
		let renderTable = this.state.fullList.map(startup => {
            console.log('in render table');
			var trialCompanyList = this.state.fullList;
			// console.log('USER TEAM LIST', userTeamList);
			var trialCompany = '';
			if (trialCompanyList == null) {
				trialCompany = {
					status: 'none'
				};
			} else {
				trialCompanyList.forEach(element => {
					if (element.id === this.state.startup.id) {
						trialCompany = element;
					}
				});
			}
			return [
				<TableEntry
					key={startup.id}
					name={startup.name}
					industry={startup.industry}
					technology={startup.technology}
                    region={startup.region}
                    employeeCount={startup.employeeCount}
                    totalFunding={startup.totalFunding}
                    websiteLink={startup.websiteLink}
					status={startup.status}
					onClick={() => this.displayInfo(startup.id)}
				/>
			];
        });
        console.log('after render table');

		let display;
		let viewStartup = this.state.viewStartup;

		if (!viewStartup) {
            display = (
                <div>
                    <Row className="center-block text-center">
                        <Table id="user-table">
                            <thead>
                                <tr id="head">
                                    <th><button class="button">First Name</button></th>
                                    <th><button class="button">Last Name</button></th>
                                    <th><button class="button">Concentration</button></th>
                                    <th><button class="button">Class Year</button></th>
                                    <th><button class="button">Status</button></th>
                                    <th>More Details</th>
                                </tr>
                            </thead>
                            <tbody>{renderTable}</tbody>
                        </Table>
                        <BackButton onClick={this.props.backButton} />
                    </Row>
                </div >
            );
		} else {
            display = (
                <StartupProfile
                    // startup={this.state.startup}
                    name={this.state.startup.name}
					industry={this.state.startup.industry}
					technology={this.state.startup.technology}
                    region={this.state.startup.region}
                    employeeCount={this.state.startup.employeeCount}
                    totalFunding={this.state.startup.totalFunding}
                    websiteLink={this.state.startup.websiteLink}
					status={this.state.startup.status}
                    onClick={this.displayTable}
                    onAccept={this.changeStatusFirst}
                    onReject={this.changeStatusReject}
                    onMaybe={this.changeStatusMaybe}
                />
            );
			
		}

		return <div>{display}</div>;
	}
}

function StartupProfile(props) {
	return (
		<div>
			<div id="user-profile">
				<div id="chunk">
					<p id="header">
						{props.startup.name}
					</p>
					<p id="information"> Name: {props.name}</p>
					<p id="information"> Industry: {props.industry}</p>
					<p id="information"> Technology: {props.technology}</p>
					<p id="information"> Region: {props.region}</p>
					<p id="information"> Employee Count: {props.employeeCount}</p>
					<p id="information"> Total Funding: {props.totalFunding}</p>
					<p id="information"> Website Link: <a href={props.websiteLink}>{props.startup.websiteLink}</a></p>
					<p id="information"> Status:  {props.status}</p>
				</div>
			</div>
			<div align="center">
				<div style={{ display: 'inline-block' }}>
					<AcceptStatusButton onClick={props.onAccept} />
				</div>
				<div style={{ display: 'inline-block' }}>
					<MaybeStatusButton onClick={props.onMaybe} />
				</div>
				<div style={{ display: 'inline-block' }}>
					<RejectStatusButton onClick={props.onReject} />
				</div>
			</div>

			<BackButton onClick={props.onClick} />
		</div>
	);
}

// function ShortResponseSection(props) {
// 	let config = [
// 		{
// 			regex: /(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
// 			fn: (key, result) => (
// 				<span key={key}>
// 					<a target="_blank" href={`${result[1]}://${result[2]}.${result[3]}${result[4]}`}>
// 						{result[2]}.{result[3]}
// 						{result[4]}
// 					</a>
// 					{result[5]}
// 				</span>
// 			)
// 		},
// 		{
// 			regex: /(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
// 			fn: (key, result) => (
// 				<span key={key}>
// 					<a target="_blank" href={`http://${result[1]}.${result[2]}${result[3]}`}>
// 						{result[1]}.{result[2]}
// 						{result[3]}
// 					</a>
// 					{result[4]}
// 				</span>
// 			)
// 		}
// 	];

// 	let stringWithLinks = props.resp;
// 	let processed = processString(config)(stringWithLinks);
// 	return (
// 		<div id="choice-section">
// 			<p id="question">{props.question}</p>
// 			<p id="response">{processed}</p>
// 		</div>
// 	);
// }
// function PdfUploadSection(props) {
// 	return (
// 		<div>
// 			<p id="question">{props.question}</p>
// 			<p id="response"> Response File: <a href={"/api/responses/filedownload/" + props.currResponseId}>Download</a></p>
// 		</div>
// 	);
// }
// function TeamResponses(props) {
// 	const responses = props.questions.map(question => {
// 		var currResponse = '';
// 		var currResponseId = 0;
// 		for (var i = 0; i < props.resp.length; i++) {
// 			if (props.resp[i].questionId == question.id) {
// 				currResponse = props.resp[i].text;
// 				currResponseId = props.resp[i].id;
// 			}
// 		}
// 		if (question.pdfUpload == true) {
// 			return (
// 				<PdfUploadSection
// 					id="response-last"
// 					question={question.text}
// 					currResponseId={currResponseId}
// 				/>
// 			);
// 		} else {
// 			return (
// 				<ShortResponseSection
// 					// key={currResponseId}
// 					id="response-last"
// 					// name={props.team}
// 					// num={props.num}
// 					question={question.text}
// 					// qId={question.id}
// 					resp={currResponse}
// 				/>
// 			);
// 		}
// 	});

// 	return (
// 		<div id="choice-section">
// 			<p id="review-choice"> Choice: {props.team} </p>
// 			<div id="responses">{responses}</div>
// 		</div>
// 	);
// }

function TableEntry(props) {
	return (
		<tr>
			<td>{props.name}</td>
			<td>{props.industry}</td>
			<td>{props.technology}</td>
			<td>{props.region}</td>
			<td>{props.employeeCount}</td>
            <td>{props.totalFunding}</td>
            <td>{props.websiteLink}</td>
            <td
				style={{
					'background-color':
						props.status === 'Accept'
							? 'lightgreen'
							: props.status === 'Reject' ? 'lightcoral' : 'white'
				}}
			>
				{props.status}
			</td>
			<td>
				<Button bsStyle="view-more" onClick={props.onClick}>
					view
				</Button>
			</td>
		</tr>
	);
}

function BackButton(props) {
	return (
		<div id="welcome-content">
			<Row className="center-block text-center">
				<div>
					<Button bsStyle="admin" bsSize="large" onClick={props.onClick}>
						Back
					</Button>
				</div>
			</Row>
		</div>
	);
}
function AcceptStatusButton(props) {
	return (
		<div id="welcome-content">
			<Row className="center-block text-center">
				<div>
					<Button bsStyle="first-rank" bsSize="large" onClick={props.onClick}>
						Accept
					</Button>
				</div>
			</Row>
		</div>
	);
}

function RejectStatusButton(props) {
	return (
		<div id="welcome-content">
			<Row className="center-block text-center">
				<div>
					<Button bsStyle="reject-rank" bsSize="large" onClick={props.onClick}>
						Reject
					</Button>
				</div>
			</Row>
		</div>
	);
}

function MaybeStatusButton(props) {
	return (
		<div id="welcome-content">
			<Row className="center-block text-center">
				<div>
					<Button bsStyle="maybe-rank" bsSize="large" onClick={props.onClick}>
						Maybe
					</Button>
				</div>
			</Row>
		</div>
	);
}

export default ViewApplicants;
