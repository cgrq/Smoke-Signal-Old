

// Action type constants
const CREATE_TEAM = 'teams/CREATE_TEAM';
const LOAD_TEAMS = 'teams/LOAD_TEAMS';


// Action creators
const createTeam = (team) => ({
    type: CREATE_TEAM,
    payload: team
});

const getAllTeams = (teams) => ({
    type: LOAD_TEAMS,
    payload: teams
});

// Thunk action creators
// Get all teams thunk
export const getAllTeamsThunk = () => async (dispatch) => {
    const response = await fetch('/api/teams');
    if (response.ok) {
        const teams = await response.json();
        dispatch(getAllTeams(teams));
    }
};

// Create a new team thunk
export const createNewTeamThunk = (payload) => async (dispatch) => {
    const { name, imageUrl } = payload
    console.log(`🖥 ~ file: teams.js:32 ~ createNewTeamThunk ~ name, imageUrl:`, name, imageUrl)
    const response = await fetch('/api/teams/new', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, imageUrl })
    });
    console.log(`🖥 ~ file: teams.js:40 ~ createNewTeamThunk ~ response:`, response)

    if (response.ok) {
        const team = await response.json();
        console.log(`🖥 ~ file: teams.js:44 ~ createNewTeamThunk ~ team:`, team)
        dispatch(createTeam(team));
        return null;
    } else {
        const errorResponse = await response.json();
        return errorResponse.errors;
    }
}

// Teams reducer
const initialState = { allTeams: {} };
const teamsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TEAMS: {
            const newState = {...state, allTeams: {...state.allTeams}};
            action.payload.teams.forEach(team => {
                newState.allTeams[team.id] = team
            });
            return newState;
        }
        case CREATE_TEAM: {
            const newState = {...state};
            console.log(`🖥 ~ file: teams.js:67 ~ teamsReducer ~ action.payload:`, action.payload)
            newState[action.payload.team.id] = action.payload.team;
            return newState;
        }
        default:
            return state;
    }
}


export default teamsReducer;
