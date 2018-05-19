import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchComments } from '../../modules/reducers'

class Comments extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.generateNestedCommentHtml2 = this.generateNestedCommentHtml2.bind(this);
		this.setExpandable = this.setExpandable.bind(this);
		this.updateComponent = this.updateComponent.bind(this);
		this.updateData = this.updateData.bind(this);
		this.state = { rows: null, timer: 60, updateInterval: 60000 }
		console.log('Page Comments')
	}
	componentWillMount() {
		//console.log(this.props.match.params.id)
		this.props.fetchComments(this.props.match.params.id);
	}
	componentDidMount() {
		this.interval = setInterval(this.updateData, this.state.updateInterval);
		this.timer = setInterval(this.updateComponent, 1000);

	}
	componentDidUpdate() {
		console.log('ComponentUpdated')
		this.setExpandable();
	}
	componentWillUnmount() {
		clearInterval(this.interval);
		clearInterval(this.timer);
	}
	updateData() {
		this.setState({ timer: 60 })
		this.props.fetchComments(this.props.match.params.id);

	}
	updateComponent() {
		this.setState({ timer: this.state.timer - 1 })
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
			console.log(data)
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
			<div className="title" ><p style={{display: this.props.commentsLoaded}}>Comments loaded. Click on the plus sign to expand. Updating after approximately {this.state.timer} seconds</p><img id='loading' alt='Loading...' className="loader"  src={ require("../../ajax-loader.gif") } style={{display:this.props.dataLoaded}}></img></div>
			<ul id="tree" className="tree" ref="tree">

		{this.generateNestedCommentHtml2(this.props.rows, this.refs.tree)}

      </ul>
			</div>
		)
	}
}



function mapStateToProps(state) {
	return {
		rows: state.data.rows,
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
