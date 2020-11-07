import { combineReducers } from 'redux';
import journal from './journalReducer'
import tags from './tagReducer'
import planets from './planetReducer'

function rootReducer(state = {}, action){
    if(action.type == "NUKE"){
        return({
            tags: [], 
            planets: [], 
            journal: [], 
            tags: [],
        })
    }
    
    return appReducer(state, action);
}

const appReducer = combineReducers({
    journal, tags, planets
  });

  export default rootReducer;