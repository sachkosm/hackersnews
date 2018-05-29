import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchComments } from '../../modules/reducers'
import Timer from '../home/timer'
import Config from "../../config.js";

class Comments extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.generateNestedCommentHtml2 = this.generateNestedCommentHtml2.bind(this);
		this.setExpandable = this.setExpandable.bind(this);
		this.updateData = this.updateData.bind(this);
		this.returnNumberOfComments = this.returnNumberOfComments.bind(this);
		this.state = { rows: null, updateInterval: Config.updateInterval * 1000, numberOfComments: 0 };
		this.count = 0;
		console.log('Page Comments')
	}
	componentWillMount() {
		this.props.fetchComments(this.props.match.params.id);
	}
	componentDidMount() {
		this.interval = setInterval(this.updateData, this.state.updateInterval);
	}
	componentDidUpdate() {
		console.log('ComponentUpdated')
		this.setExpandable();

	}
	componentWillReceiveProps(nextProps) {
		this.count = nextProps.rowsComments.children ? nextProps.rowsComments.children.length : 0;
		this.returnNumberOfComments(nextProps.rowsComments);
		this.setState({ numberOfComments: this.count })
	}

	returnNumberOfComments(n) {
		var self = this;
		if(n.children === undefined || n.children === 0) {
			self.count = self.count + 1;
			return 0;
		};
		if(n.children.length > 0) {
			n.children.forEach(function(c) {
				self.returnNumberOfComments(c);
				self.count = self.count + c.children.length;
			});
		}
		return n.children.length;
	}
	shouldComponentUpdate(nextProps, nextState) {
		if(this.props.rowsComments !== nextProps.rowsComments || this.props.dataLoaded !== nextProps.dataLoaded) {
			return true;
		}
		return false;
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	updateData() {
		this.props.fetchComments(this.props.match.params.id);
	}

	generateNestedCommentHtml2(data, el) {

		if(data.children) {
			return(
				<li>
					<div >
						<p className="user">{data.author}</p>
						<p className="text" dangerouslySetInnerHTML={{__html: data.text}}></p>
					</div>
						{data.children.map((c, i) =>  (<ul key={i} > {this.generateNestedCommentHtml2(c)}  </ul>))}
				</li>
			);
		} else {
			//console.log(data)
		}
	}




	setExpandable() {
		var tree = document.querySelectorAll('ul.tree div:not(:last-child)');
		for(var i = 0; i < tree.length; i++) {
			if(!tree[i].classList.contains("eventLs")) {
				tree[i].classList.add('eventLs');
				tree[i].addEventListener('click', function(e) {
					var parent = e.target.parentElement;
					var classList = parent.classList;
					if(classList.contains("open")) {
						classList.remove('open');
						var opensubs = parent.querySelectorAll(':scope .open');
						for(var i = 0; i < opensubs.length; i++) {
							opensubs[i].classList.remove('open');
						}
					} else {
						classList.add('open');
					}
				});
			}
		}
	}

	render() {
		return(
			<div id="Comments">
			<div className="title" ><p style={{display: this.props.commentsLoaded}}>Comments loaded: {this.state.numberOfComments}. Click on the plus sign to expand. Updating after approximately <Timer/> seconds</p><img id='loading' alt='Loading...' className="loader"  src={ require("../../ajax-loader.gif") } style={{display:this.props.dataLoaded}}></img></div>
			<ul id="tree" className="tree" ref="tree">

		{this.generateNestedCommentHtml2(this.props.rowsComments, this.refs.tree)}

      </ul>
			</div>
		)
	}
}



function mapStateToProps(state) {
	return {
		rowsComments: state.data.rowsComments,
		dataLoaded: state.data.dataLoaded,
		commentsLoaded: state.data.commentsLoaded
	};
}
const mapDispatchToProps = dispatch =>
	bindActionCreators({
		fetchComments
	}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Comments)
