import React, { Component } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';
import {withRouter} from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

import './StartupPage.css';

class StartupPage extends Component {
	state = {
        currStartup: '',
        currStartupId: 0,
    };

	constructor(props) {
		super(props);
		this.changeStatusFirst = this.changeStatusFirst.bind(this);
		this.changeStatusReject = this.changeStatusReject.bind(this);
		this.changeStatusMaybe = this.changeStatusMaybe.bind(this);
	}

	componentDidMount() {
		const values = queryString.parse(this.props.location.search);
		var startupId = values.id;

        axios
			.get('/api/trialcompany/'+startupId)
			.then(res => {
                console.log(res);
                console.log(res.data);
				this.setState({ currStartup: res.data });
			})
			.catch(err => console.log(err));
	}

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
        var newCompany = {
            name: startup.name,
            industry: startup.industry,
            technology: startup.technology,
            region: startup.region,
            employeeCount: startup.employeeCount,
            totalFunding: startup.totalFunding,
            websiteLink: startup.websiteLink,
			startupLogo: startup.startupLogo,
			stage: startup.stage,
			about: startup.about,
			productInnovation: startup.productInnovation,
			traction: startup.traction,
			futurePlans: startup.futurePlans,
			email: startup.email,
			tags: startup.tags,
			oneLiner: startup.oneLiner,
			founderName: startup.founderName,
			founderRole: startup.founderRole,
			founderPhoto: startup.founderPhoto
        }
		newTrialCompany.status = 'Accept';
		// axios
		// 	.patch('/api/trialcompany/' + startup.id, newTrialCompany)
		// 	.then(res => {
		// 		this.setState({
		// 			viewStartup: false
		// 		});
		// 	})
        //     .catch(err => console.log(err));
        
        axios
            .post('/api/companies/new', newCompany)
            .then(res => {
                this.setState({
                    viewStartup: false
                })
            })
            .catch(err => console.log(err));

        axios
            .delete('/api/trialcompany/' + startup.id)
            .then(res => {
                this.setState({
                    viewStartup: false
                })
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
        console.log(this.state.currStartup);
		var display = (<StartupProfile startup={this.state.currStartup}></StartupProfile>);

		return <div>{display}</div>;
	}
}

function StartupProfile(props) {
	return (
		<div>
			<div class="grid-container">
				<div class="startup-logo"><StartupLogoName startup={props.startup}></StartupLogoName></div>
				<div class="some-fields"><SomeFields startup={props.startup}></SomeFields></div>
				<div class="tags"><Tags startup={props.startup}></Tags></div>  
				{/* <div class="industry-hq"><IndustryHQ startup={props.startup}></IndustryHQ></div> */}
				<div class="about"><About startup={props.startup}></About></div>
				<div class="product-innovation"><ProductInnovation startup={props.startup}></ProductInnovation></div>
				<div class="traction"><Traction startup={props.startup}></Traction></div>
				<div class="future-plans"><FuturePlans startup={props.startup}></FuturePlans></div>
				<div class="one-liner"><OneLiner startup={props.startup}></OneLiner></div>
				<div class="founding-team"><FoundingTeam startup={props.startup}></FoundingTeam></div>
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
		</div>
	);
}

function StartupLogoName(props) {
	const data = props.startup.startupLogo;
	const imageString = "data:image/png;base64,"+data;
	// console.log(imageString);
	return(
		<div>
			<img id="startupLogo" src={imageString} width="100" height="auto"></img>
			<br />
			<b style={{fontSize: '30px'}}>{props.startup.name}</b>
			<hr style={{width:'60%',height:'2px',color:'#484848','background-color':'#484848'}}/>
		</div>
	);
}

function SomeFields(props) {
	return(
		<div style={{fontSize:'16px'}}>
			<div style={{textAlign:'left',width:'60%',margin:'auto'}}>
				Website: <a class="web-link" href={"//"+props.startup.websiteLink} target="_blank">{props.startup.websiteLink}</a>
				<br />
				Email: <a class="web-link" href={"mailto:"+props.startup.email}>{props.startup.email}</a>
				<br />
				Stage: {props.startup.stage}
			</div>
			<hr style={{width:'60%',height:'2px',color:'#484848','background-color':'#484848'}}/>
		</div>
	);
}

function Tags(props) {
	return(
		<div>
			<b style={{fontSize:'18px'}}>TAGS</b>
			<br />
			<div style={{fontSize:'16px',display:'flex',justifyContent:'center',marginTop:'30px',marginBottom:'30px'}}>
				<div class="industryhqtags">{props.startup.industry}</div>
				<div class="industryhqtags">{props.startup.region}</div>
			</div>
		</div>
	);
}

function IndustryHQ(props) {
	return(
		<div style={{fontSize:'16px',display:'flex'}}>
			<div class="industryhqtags">{props.startup.industry}</div>
			<div class="industryhqtags">{props.startup.region}</div>
		</div>
	);
}	

function About(props) {
	return(
		<div>
			<b style={{fontSize:'18px'}}>ABOUT</b>
			<br />
			<div class="middle-column">
				{props.startup.about}
			</div>
		</div>
	);
}

function ProductInnovation(props) {
	return(
		<div>
			<b style={{fontSize:'18px'}}>PRODUCT INNOVATION</b>
			<br />
			<div class="middle-column">
				{props.startup.productInnovation}
			</div>
		</div>
	);
}

function Traction(props) {
	return(
		<div>
			<b style={{fontSize:'18px'}}>TRACTION</b>
			<br />
			<div class="middle-column">
				{props.startup.traction}
			</div>
		</div>
	);
}

function FuturePlans(props) {
	return(
		<div>
			<b style={{fontSize:'18px'}}>FUTURE PLANS</b>
			<br />
			<div class="middle-column">
				{props.startup.futurePlans}
			</div>
		</div>
	);
}

function OneLiner(props) {
	return(
		<div>
			<b style={{fontSize:'18px'}}>ONE LINER</b>
			<br />
			<div class="left-column">
				{props.startup.oneLiner}
			</div>
			<hr style={{width:'80%',height:'2px',color:'#484848','background-color':'#484848'}}/>
		</div>
	);
}

function FoundingTeam(props) {
	const data = props.startup.founderPhoto;
	const imageString = "data:image/png;base64,"+data;
	return(
		<div>
			<b style={{fontSize:'18px'}}>FOUNDING TEAM</b>
			<br />
			<img id="founderLogo" src={imageString} width="100" height='auto'></img>
			<br />
			<div style={{fontSize: '18px'}}>{props.startup.founderName}, {props.startup.founderRole}</div>
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

export default StartupPage;
