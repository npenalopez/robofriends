import React, {Component} from 'react';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';


class App extends Component {
	constructor() {
		super();
		this.state = {
			robots: [],
			searchField:''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(resp => resp.json())
			.then(users => this.setState({robots: users}));
	}

	onSearchChange = (e) => {
		this.setState({searchField: e.target.value});
	}

	render() {
		const {robots, searchField} = this.state;
		return !robots.length ? 
			<h1>Loading</h1> :
			(
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={this.onSearchChange} />
				<Scroll>
					<ErrorBoundry>
	    				<CardList robots={robots.filter(robot => robot.name.toLowerCase().includes(searchField))} />
	    			</ErrorBoundry>
	    		</Scroll>	
			</div>
			);
	}
}

export default App;