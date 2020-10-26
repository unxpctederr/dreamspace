import { combineReducers } from 'redux';
import journal from './journalReducer'
import tags from './tagReducer'

function rootReducer(state = {}, action){
    if(action.type == "NUKE"){
        return(null)
    }
    
    return appReducer(state, action);
}

const appReducer = combineReducers({
    journal, tags
  });

  export default rootReducer;