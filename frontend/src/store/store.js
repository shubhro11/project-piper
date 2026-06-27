import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import tracksSlice from "./slices/tracks.slice";
// import playlistsSlice from "./slices/playlists.slice";


export const store = configureStore({
  reducer: {
    user: userSlice,
    tracks: tracksSlice,
    // playlists: playlistsSlice,
  },
});

export default store;
