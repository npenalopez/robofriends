import React, {useEffect, useState, forwardRef} from 'react';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';


const App = forwardRef(() => {
	const [state, setState] = useState({
			robots: [],
			searchField:''
		});

	 useEffect(() => {
	    fetch('https://jsonplaceholder.typicode.com/users')
			.then(resp => resp.json())
			.then(users => setState((prevState) => {return { ...prevState, robots: users}}));
	  }, []);

	const onSearchChange = (e) => {
		setState((prevState) => { return {...prevState, searchField: e.target.value}});
	}

	const {robots, searchField} = state;

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
});

export default App;