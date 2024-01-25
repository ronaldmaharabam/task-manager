import { createSlice } from "@reduxjs/toolkit";

const dataReducer = createSlice({
  name: "data",
  initialState: {
    data: {},
    overlay: false,
    curId: 1,
    priority: ["high", "medium", "low"],
    team: [],
    status: [],
    filter: {
      priority: "",
      date: "",
      assignee: "",
      reporter: "",

    },
    sortby: "",
  },
  reducers: {
    dataAdded(state, action) {
      Object.keys(action.payload).forEach((key, index) => {
        state.data[key] = action.payload[key];
      });
    },
    dataUpdated(state, action) {
      state.data = action.payload;
    },
    overlayUpdated(state, action) {
      state.overlay = action.payload;
    },
    curIdUpdated(state, action) {
      state.curId = action.payload;
    },
    priorityUpdated(state, action) {
      state.data[action.payload.id].priority = action.payload.priority;
    },
    statusUpdated(state, action) {
      // console.log("status", action.payload)
      state.data[action.payload.id].status = action.payload.status;
    },
    priorityLoaded(state, action) {
      state.priority = action.payload.priority;
    },
    teamLoaded(state, action) {
      state.team = action.payload.team;
    },
    statusLoaded(state, action) {
      state.status = action.payload.status;
    },
    itemUpdated(state, action) {
      state.data[action.payload.id] = {
        ...state.data[action.payload.id],
        ...action.payload.data,
      };
    },
    statusAdded(state, action) {
      state.status.push(action.payload);
    },
    filterUpdated(state, action) {
      state.filter = {...state.filter, ...action.payload}
    },
    sortUpdated(state, action) {
      state.sortby = action.payload;
    }
  },
});

export const {
  dataAdded,
  dataUpdated,
  overlayUpdated,
  curIdUpdated,
  priorityUpdated,
  statusUpdated,
  priorityLoaded,
  teamLoaded,
  itemUpdated,
  statusLoaded,
  statusAdded,
  filterUpdated,
  sortUpdated,
} = dataReducer.actions;

export default dataReducer.reducer;
