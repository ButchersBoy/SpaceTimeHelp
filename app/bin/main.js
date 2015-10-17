var React = require('react');
var ReactDOM = require('react-dom');
var Button = require('react-bootstrap/lib/Button');
var Overlay = require('react-bootstrap/lib/Overlay');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');

var Icon = React.createClass({
	render: function() {
		var style = { 
			height: this.props.height + "px",
			width: this.props.width + "px",
			verticalAlign: "middle"
		};
		var data = "";
		switch (this.props.name)
		{
			case "clock":
				data = "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z";
				break;
			case "sun":
				data = "M3.55,18.54L4.96,19.95L6.76,18.16L5.34,16.74M11,22.45C11.32,22.45 13,22.45 13,22.45V19.5H11M12,5.5A6,6 0 0,0 6,11.5A6,6 0 0,0 12,17.5A6,6 0 0,0 18,11.5C18,8.18 15.31,5.5 12,5.5M20,12.5H23V10.5H20M17.24,18.16L19.04,19.95L20.45,18.54L18.66,16.74M20.45,4.46L19.04,3.05L17.24,4.84L18.66,6.26M13,0.55H11V3.5H13M4,10.5H1V12.5H4M6.76,4.84L4.96,3.05L3.55,4.46L5.34,6.26L6.76,4.84Z";
				break;
			case "speed":
				data = "M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.32,20.45 4.93,20.07V20.07C3.12,18.26 2,15.76 2,13A10,10 0 0,1 12,3M22,13C22,15.76 20.88,18.26 19.07,20.07V20.07C18.68,20.45 18.05,20.45 17.66,20.06C17.27,19.67 17.27,19.04 17.66,18.65V18.65C19.11,17.2 20,15.21 20,13C20,12 19.81,11 19.46,10.1L20.67,8C21.5,9.5 22,11.18 22,13Z";
				break;
			case "flash":
				data = "M7,2V13H10V22L17,10H13L17,2H7Z";
				break;
			case "run":
				data = "M17.12,10L16.04,8.18L15.31,11.05L17.8,15.59V22H16V17L13.67,13.89L12.07,18.4L7.25,20.5L6.2,19L10.39,16.53L12.91,6.67L10.8,7.33V11H9V5.8L14.42,4.11L14.92,4.03C15.54,4.03 16.08,4.37 16.38,4.87L18.38,8.2H22V10H17.12M17,3.8C16,3.8 15.2,3 15.2,2C15.2,1 16,0.2 17,0.2C18,0.2 18.8,1 18.8,2C18.8,3 18,3.8 17,3.8M7,9V11H4A1,1 0 0,1 3,10A1,1 0 0,1 4,9H7M9.25,13L8.75,15H5A1,1 0 0,1 4,14A1,1 0 0,1 5,13H9.25M7,5V7H3A1,1 0 0,1 2,6A1,1 0 0,1 3,5H7Z";
				break;
		}
		return (
			<svg style={style} viewBox="0 0 24 24">
				<path fill="#000000" d={data} />
			</svg>
		);
	}
});

var Point = React.createClass({
	render: function() {
		var viewBox="0 0 26 26";
		var className = this.props.isFilled ? "point-filled" : "point-not-filled";
		className += " point";   
		return (
			<svg className="point-container" viewBox={viewBox} width="26" height="26">
				<circle className={className} />
			</svg>
		);
	}
});

var PointsBox = React.createClass({
	render: function() {
		var elements = [];
		for (var i = 0; i < this.props.max; i++)
			elements.push(<Point key={i} isFilled={i < this.props.val}/>);						 
		return (
			<span>
				{elements}
			</span>
		);
	}
});

var Main = React.createClass({
	maxPoints: 10,
	getInitialState: function() {
		return { space: 5, time: 5 };		
	},
	_swapStats: function(incProp, decProp) {
		this.setState(function(previousState, currentProps) {
			var incCurrent = previousState[incProp];
			if (incCurrent == this.maxPoints)
				return previousState;
  			return {
				  [incProp]: previousState[incProp] + 1,
				  [decProp]: previousState[decProp] - 1,
				  };
		});
	},
	render: function() {
		var additionalInfo = null;
		switch (this.state.space) {
			case 9:
				additionalInfo = (<div><Icon name="run" width={48} height={48} /><strong>Approaching light speed...</strong> Time slows down.</div>);
				break;
			case 10:
				additionalInfo = (<div><Icon name="flash" width={48} height={48} /><strong>Light speed!</strong> Time stops. Light photons don't age.</div>);
			default:
				break;
		}; 
		
		const additionalInfoStyle = {
			position: 'absolute',
			backgroundColor: '#EEE',
			boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
			border: '1px solid #CCC',
			borderRadius: 3,
			marginLeft: -5,
			marginTop: 5,
			padding: 10
			};
			
		var isDecAllowed = this.state.space == 1 ? "disabled" : ""; 
		
		return (
			<div>
				<div>
					<Icon width={28} height={28} name="speed" />
					<span className="variable-desc">Velocity (speed) through space</span>					
				</div>
				<div className="points-container">
					<PointsBox 
						max={this.maxPoints} val={this.state.space} 						
						ref={(input) => this._spaceBox} />
					<Button bsStyle="info" onClick={this._swapStats.bind(this, "time", "space")} disabled={isDecAllowed}>-</Button>
					<Button bsStyle="success" onClick={this._swapStats.bind(this, "space", "time")}>+</Button>
				</div>
				<Overlay 
					show={additionalInfo != null} 
					placement="left"
					container={this}					
					target={() => this._spaceBox}
					>
					<div style={additionalInfoStyle}>
						{additionalInfo}
					</div>
				</Overlay>
				<div>									
					<Icon width={28} height={28} name="clock" />
					<span className="variable-desc">Rate of passage time</span>
				</div>
				<div className="points-container">
					<PointsBox max={this.maxPoints} val={this.state.time} />
				</div>
			</div>
		);
	}
});

ReactDOM.render(
	<Main  />,
	document.getElementById('pointsBoard')
);
