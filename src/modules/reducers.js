import $ from "jquery";
import Config from "../config.js";
import 'core-js/es6/array';

export const INCREMENT_REQUESTED = 'counter/INCREMENT_REQUESTED'
export const INCREMENT = 'counter/INCREMENT'
export const DECREMENT_REQUESTED = 'counter/DECREMENT_REQUESTED'
export const DECREMENT = 'counter/DECREMENT'
export const FETCH_DATA_REQUESTED = 'fetch_data_requested'
export const LOAD_DATA_SUCCESS = 'load_data_success'
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS'
export const DATA_IS_NOT_LOADED = 'Loading data...'
export const DATA_IS_LOADED_ALREADY = 'DATA_IS_LOADED_ALREADY'
export const FILTER_DATA = 'FILTER_DATA'
export const MANAGE_SELECTED_PI = 'MANAGE_SELECTED_PI'
export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const CLEAR_FILTER = 'CLEAR_FILTER'
export const FETCH_COMMENTS_REQUESTED = 'FETCH_COMMENTS_REQUESTED'
export var STATE_FROM_SERVER = ''

const initialState = {
	rows: {
		hits: 0,
		points: 0,
		author: '',
		title: '',
		url: ''
	},
	rowsComments: {
		children: []
	}
};

//================  REDUCERS ====================
export default(state = initialState, action) => {
	switch(action.type) {
		case FETCH_DATA_REQUESTED:
			return state
		case FETCH_COMMENTS_REQUESTED:
		// using JQuery extend as the polifill for Obeject.assign and spread is not working in all browsers
			return $.extend({}, state,  { dataLoaded: 'block' }, { commentsLoaded: 'none' });
		case LOAD_DATA_SUCCESS:
			return $.extend({}, state, { rows: action.data }, { dataLoaded: 'none' });
		case LOAD_COMMENTS_SUCCESS:
				return $.extend({}, state, { rowsComments: action.data }, { dataLoaded: 'none' }, { commentsLoaded: 'block' });
		case DATA_IS_LOADED_ALREADY:
			return state
		default:
			//console.log(state)
			return state
	}
}
//================  END OF REDUCERS ====================

//================  Action Creators ====================
export const loadSuccess = (data) => {
	return {
		type: LOAD_DATA_SUCCESS,
		data
	};
}

export const loadCommentsSuccess = (data) => {
	return {
		type: LOAD_COMMENTS_SUCCESS,
		data
	};
}

export const fetchData = (state) => {
	console.log('fetching news')
	return dispatch => {
		dispatch({
			type: FETCH_DATA_REQUESTED
		})
		return $.get(Config.DataURL, function(data) {}).then(data => {
			dispatch(loadSuccess(data));
		}).catch(error => {
			throw(error);
		});
	}
}

export const fetchComments = (itemId) => {
	console.log('fetching comments')
	return dispatch => {
		dispatch({ type: FETCH_COMMENTS_REQUESTED })
    $.get({ url: Config.ItemURL + itemId + '?tags=comment&page=1', cache: true }).then(data => {dispatch(loadCommentsSuccess(data))});
		return true;
	}
}

//================  End of Action Creators ====================
