// Action type constants
const GET_ALL_CHANNELS = "channels/GET_ALL_CHANNELS";
const GET_USER_CHANNELS = "channels/GET_USER_CHANNELS";
const GET_TEAM_CHANNELS = "channels/GET_TEAM_CHANNELS";
const CREATE_CHANNEL = "channels/CREATE_CHANNEL";
const EDIT_CHANNEL = "channels/EDIT_CHANNEL";
const DELETE_CHANNEL = "channels/DELETE_CHANNEL";

// Action creators
const getAllChannels = (channels) => ({
  type: GET_ALL_CHANNELS,
  payload: channels,
});

const getUserChannels = (channels) => ({
  type: GET_USER_CHANNELS,
  payload: channels,
});

const getTeamChannels = (channels) => ({
  type: GET_TEAM_CHANNELS,
  payload: channels,
});

const createChannel = (channel) => ({
  type: CREATE_CHANNEL,
  payload: channel,
});

const editChannel = (channel) => ({
  type: EDIT_CHANNEL,
  payload: channel,
});

const deleteChannel = (channelId) => ({
  type: DELETE_CHANNEL,
  payload: channelId,
});

// Thunk action creators

// Get all channels
export const getAllChannelsThunk = () => async (dispatch) => {
  const response = await fetch("/api/channels/all");

  if (response.ok) {
    const { channels } = await response.json();
    dispatch(getAllChannels(channels));

    return channels;
  }
};

// Get user channels
export const getUserChannelsThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/channels/user/${userId}`);

  if (response.ok) {
    const { channels } = await response.json();
    dispatch(getUserChannels(channels));

    return channels;
  }
};

// Get team channels
export const getTeamChannelsThunk = (teamId) => async (dispatch) => {
  const response = await fetch(`/api/channels/team/${teamId}`);

  if (response.ok) {
    const { channels } = await response.json();
    dispatch(getTeamChannels(channels));

    return channels;
  }
};

// Create channel
export const createChannelThunk = (channel) => async (dispatch) => {
  const response = await fetch("/api/channels/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(channel),
  });

  if (response.ok) {
    const { channel } = await response.json();
    dispatch(createChannel(channel));

    return channel;
  }
};

// Edit channel
export const editChannelThunk = (channel) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channel.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(channel),
  });

  if (response.ok) {
    const { channel } = await response.json();
    dispatch(editChannel(channel));

    return channel;
  }
};

// Delete channel
export const deleteChannelThunk = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const deleteSuccessMessage = await response.json();
    dispatch(deleteChannel(channelId));

    return deleteSuccessMessage;
  }
};

// Channel reducer
const initialState = { allChannels: {}, userChannels: {}, teamChannels: {} };

const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CHANNELS: {
      const newState = { ...state };

      // Normalize data
      const channels = {};
      action.payload.forEach((channel) => (channels[channel.id] = channel));

      newState.allChannels = { ...state.allChannels, ...channels };
      return newState;
    }
    case GET_USER_CHANNELS: {
      const newState = { ...state };

      // Normalize data
      const channels = {};
      action.payload.forEach((channel) => (channels[channel.id] = channel));

      newState.userChannels = { ...state.userChannels, ...channels };
      return newState;
    }
    case GET_TEAM_CHANNELS: {
      const newState = { ...state };

      // Normalize data
      const channels = {};
      action.payload.forEach((channel) => (channels[channel.id] = channel));

      newState.teamChannels = { ...state.teamChannels, ...channels };
      return newState;
    }
    case CREATE_CHANNEL: {
      const newState = { ...state };

      newState.allChannels[action.payload.id] = action.payload;
      newState.userChannels[action.payload.id] = action.payload;
      newState.teamChannels[action.payload.id] = action.payload;

      return newState;
    }
    case EDIT_CHANNEL: {
      const newState = { ...state };

      newState.allChannels[action.payload.id] = action.payload;
      newState.userChannels[action.payload.id] = action.payload;
      newState.teamChannels[action.payload.id] = action.payload;

      return newState;
    }
    case DELETE_CHANNEL: {
      const newState = { ...state };

      delete newState.allChannels[action.payload];
      delete newState.userChannels[action.payload];
      delete newState.teamChannels[action.payload];

      return newState;
    }
    default:
      return state;
  }
};

export default channelsReducer;
