import { BUSY  } from './action-types';

const DEFAULT_STATE = 0;

export default (state = DEFAULT_STATE, action = {}) => {
	switch (true) {
		case action.type === 'BUSY':
			return state + 1;

		case action.type.substring(action.type.length - 6) === 'FAILED':
			return state ? state - 1 : state;

		case action.type.substring(action.type.length - 7) === 'SUCCESS':
			return state ? state - 1 : state;

		default:
			return state;
	}
};
