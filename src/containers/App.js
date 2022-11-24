import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField } from '../actions';

const mapStateToProps = state => {
	return {
		searchField: state.searchField
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value))
	}
}

const App = ({searchField, onSearchChange}) => {
	const [robots, setRobots] = useState([]);

	 useEffect(() => {
	    fetch('https://jsonplaceholder.typicode.com/users')
			.then(resp => resp.json())
			.then(users => setRobots(users));
	  }, []);

	return !robots.length ? 
		<h1>Loading</h1> :
		(
		<div className='tc'>
			<h1 className='f1'>RoboFriends</h1>
			<SearchBox searchChange={onSearchChange} />
			<Scroll>
				<ErrorBoundry>
    				<CardList robots={robots.filter(robot => robot.name.toLowerCase().includes(searchField))} />
    			</ErrorBoundry>
    		</Scroll>	
		</div>
		);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);