import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPlaylist, fetchArtistPlaylists } from "../thunks/playlist.thunk";

const initialState = {
  playlists: [],
  createPlaylistLoading: false,
  error: null,
  successMessage: null,
};

const playlistsSlice = createSlice({
  name: "playlists",
  initialState,

  reducers: {
    clearPlaylistError: (state) => {
      state.error = null;
    },

    clearPlaylistSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /*********** GET ARTIST PLAYLISTS ***********/

      .addCase(fetchArtistPlaylists.pending, (state) => {
        state.fetchArtistPlaylistsLoading = true;
        state.error = null;
      })

      .addCase(fetchArtistPlaylists.fulfilled, (state, action) => {
        state.fetchArtistPlaylistsLoading = false;
        state.playlists = action.payload;
      })

      .addCase(fetchArtistPlaylists.rejected, (state, action) => {
        state.fetchArtistPlaylistsLoading = false;
        state.error = action.payload;
      })
      /********************************************/



      /************* CREATE PLAYLIST **************/
      .addCase(createPlaylist.pending, (state) => {
        state.createPlaylistLoading = true;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.createPlaylistLoading = false;

        if (action.payload) {
          state.playlists.unshift(action.payload);
        }

        state.successMessage = "Playlist created successfully";
      })

      .addCase(createPlaylist.rejected, (state, action) => {
        state.createPlaylistLoading = false;
        state.error = action.payload;
      });
    /********************************************/
  },
});

export const { clearPlaylistError, clearPlaylistSuccessMessage } =
  playlistsSlice.actions;

export default playlistsSlice.reducer;
