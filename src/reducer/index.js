import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { workspace } from './workspace.reducer';

const rootReducer = combineReducers({
    authentication,
    alert,
    workspace
});

export default rootReducer;