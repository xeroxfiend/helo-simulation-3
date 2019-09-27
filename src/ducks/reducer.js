const initialState = {
  username: "",
  user_id: "",
  pic: ""
};

const UPDATE_STATE = "UPDATE_STATE";

export function updateState(user_id, username, pic) {
  return {
    type: UPDATE_STATE,
    payload: {user_id, username, pic}
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_STATE:
      return {
        ...state,
        username: action.payload.username,
        user_id: action.payload.user_id,
        pic: action.payload.pic
      };
    default:
      return state;
  }
}
