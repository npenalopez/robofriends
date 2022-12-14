import {CHANGE_SEARCH_FIELD, REQUEST_ROBOTS_PENDING, REQUEST_ROBOTS_FAILED, REQUEST_ROBOTS_SUCCESS} from './constants.js';

const initialStateSearch = {
	searchField: '',
}

export const searchRobots = (state = initialStateSearch, action = {}) => {
	switch(action.type){
		case CHANGE_SEARCH_FIELD:
			return { ...state, searchField:action.payload };
		default:
			return state;
	}
}

const initialStateRobots = {
	robots: [],
	error: '',
	isPending: false
}
export const requestRobots = (state = initialStateRobots, action = {}) => {
	switch (action.type){
		case REQUEST_ROBOTS_PENDING:
			return { ...state, isPending: true};
		case REQUEST_ROBOTS_SUCCESS:
			return { ...state, robots: action.payload, isPending: false};
		case REQUEST_ROBOTS_FAILED:
			return { ...state, isPending: false, error: action.payload};
		default:
			return state;
	}
}