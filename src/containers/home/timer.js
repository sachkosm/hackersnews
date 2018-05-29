import React from 'react'
import Config from "../../config.js";

class Timer extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.updateComponent = this.updateComponent.bind(this);
		this.updateData = this.updateData.bind(this);
		this.state = { rows: null, timer: Config.updateInterval , updateInterval: Config.updateInterval * 1000 }
	}
	componentWillMount() {

	}
	componentDidMount() {
    this.interval = setInterval(this.updateData, this.state.updateInterval);
		this.timer = setInterval(this.updateComponent, 1000);
	}
	componentWillUnmount() {
		clearInterval(this.timer);
	}

  updateData(){
		this.setState({timer: Config.updateInterval })

	}
	updateComponent(){
		this.setState({timer: this.state.timer-1})
	}

	render() {
		return(
			<span>{this.state.timer}</span>
    )
	}
}

export default Timer;
