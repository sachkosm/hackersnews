import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
        <li><a className=" center" href='/news'>Hacker News - Front Page</a></li>
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
