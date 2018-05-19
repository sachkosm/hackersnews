import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchData } from '../../modules/reducers'

class Home extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.updateComponent = this.updateComponent.bind(this);
		this.updateData = this.updateData.bind(this);
		this.state = { rows: null, timer: 60, updateInterval: 60000 }
	}
	componentWillMount() {
		this.props.fetchData();
	}
	componentDidMount() {
		this.interval = setInterval(this.updateData, this.state.updateInterval);
		this.timer = setInterval(this.updateComponent, 1000);
	}
	componentWillUnmount() {
		clearInterval(this.interval);
		clearInterval(this.timer);
	}

  updateData(){
		this.props.fetchData();
		this.setState({timer: 60})
	}
	updateComponent(){
		this.setState({timer: this.state.timer-1})
	}

	render() {
		let rows = this.props.rows;
		let arrNews = Object.entries(rows.hits).filter(item => item[1].title !== null && item[1].title !== '')
		return(
			<div>
			<div>Updating after {this.state.timer} seconds<img id='loading' alt='Loading...' className="loader"  src={ require("../../ajax-loader.gif") } style={{display:this.props.dataLoaded}}></img></div>
			<div id="HNTree" ref="HNTree" className="HNTree">
			{arrNews.map((news, i) => {
				return(	<div key={i}>
					<div style={{display: 'inline-block'}} >[ { news[1].points } ]</div>
					<div style={{display: 'inline-block'}} >[ {news[1].author} ]</div>
					<a href={news[1].url} >{news[1].title}</a>
					<a href={"comments/" + news[1].objectID} >commnents</a>
					</div>
				)
				})
			}
			</div>
			</div>
		)
	}
}



function mapStateToProps(state) {
	return {
		rows: state.data.rows,
		dataLoaded: state.data.dataLoaded,
		stateFromServer: state.data.stateFromServer
	};
}
const mapDispatchToProps = dispatch =>
	bindActionCreators({
		fetchData
	}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)
