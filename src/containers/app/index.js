import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Home from '../home';
import Comments from '../home/comments';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';


class App extends React.Component {

	render() {
		return(
			<div>
    <header>
    <div id='cssmenu' >
      <ul>
        <li><Link className="center" to='/'>Hacker News - Front Page</Link> ( Updated version - 5/29/2018, render and routing optimized)</li>
      </ul>
      </div>
    </header>
    <main>
		<Switch>

      <Route exact={true} path='/' component={Home} />
			<Route exact={true} path='/news' component={Home} />
			<Route exact={true} path='/comments/:id' component={Comments} />

		</Switch>
    </main>
  </div>
		)
	}
}

function mapStateToProps(state) {
	return state;
}

const mapDispatchToProps = dispatch =>
	bindActionCreators({
	}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
