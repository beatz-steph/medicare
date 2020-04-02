import React, { useEffect } from 'react';

//redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectToken } from './redux/token/token.functions';
import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.action';

//ui
import { Switch, Route, Link, Redirect, useRouteMatch } from 'react-router-dom';
import Landing from './screens/landing/landing.screen';
import Dashboard from './screens/dashboard//dashbaord.screens';

import './vendor.css';

const App = ({ currentUser, dispatch, token }) => {
	const { url, path } = useRouteMatch();
	useEffect(() => {
		dispatch(checkUserSession());
	}, [dispatch]);

	return (
		<div>
			<Switch>
				<Route path="/" exact>
					{!currentUser ? <Landing /> : <Redirect to="/dashboard" />}
				</Route>
				<Route
					path="/dashboard"
					render={routeProps => (
						<Dashboard
							{...routeProps}
							token={token}
							currentUser={currentUser}
						/>
					)}
				></Route>
			</Switch>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	token: selectToken,
});
export default connect(mapStateToProps)(App);
