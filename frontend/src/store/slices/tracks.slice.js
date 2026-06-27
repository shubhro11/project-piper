import { createSlice } from "@reduxjs/toolkit";
import { fetchAllTracks, fetchArtistTracks, fetchTrackById, uploadTrack } from "../thunks/track.thunk";

const initialState = {
  tracks: [],
  selectedTrack: null,

  fetchArtistTracksLoading: false,
  fetchAllTracksLoading: false,
  fetchTrackByIdLoading: false,
  uploadTrackLoading: false,

  error: null,
  successMessage: null,
};

const tracksSlice = createSlice({
  name: "tracks",
  initialState,

  reducers: {
    setSelectedTrack: (state, action) => {
      state.selectedTrack = action.payload;
    },

    clearSelectedTrack: (state) => {
      state.selectedTrack = null;
    },

    clearTracksError: (state) => {
      state.error = null;
    },

    clearTracksSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /********** GET ARTIST'S OWN TRACKS *********/

      .addCase(fetchArtistTracks.pending, (state) => {
        state.fetchArtistTracksLoading = true;
        state.error = null;
      })

      .addCase(fetchArtistTracks.fulfilled, (state, action) => {
        state.fetchArtistTracksLoading = false;
        state.tracks = action.payload;
      })

      .addCase(fetchArtistTracks.rejected, (state, action) => {
        state.fetchArtistTracksLoading = false;
        state.error = action.payload;
      })
      /********************************************/



      /************** GET ALL TRACKS **************/

      .addCase(fetchAllTracks.pending, (state) => {
        state.fetchAllTracksLoading = true;
        state.error = null;
      })

      .addCase(fetchAllTracks.fulfilled, (state, action) => {
        state.fetchAllTracksLoading = false;
        state.tracks = action.payload;
      })

      .addCase(fetchAllTracks.rejected, (state, action) => {
        state.fetchAllTracksLoading = false;
        state.error = action.payload;
      })
      /********************************************/



      /********** GET SINGLE TRACK BY ID **********/

      .addCase(fetchTrackById.pending, (state) => {
        state.fetchTrackByIdLoading = true;
        state.error = null;
      })

      .addCase(fetchTrackById.fulfilled, (state, action) => {
        state.fetchTrackByIdLoading = false;
        state.selectedTrack = action.payload;
      })

      .addCase(fetchTrackById.rejected, (state, action) => {
        state.fetchTrackByIdLoading = false;
        state.error = action.payload;
      })
      /********************************************/



      /*************** UPLOAD TRACK ***************/

      .addCase(uploadTrack.pending, (state) => {
        state.uploadTrackLoading = true;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(uploadTrack.fulfilled, (state, action) => {
        state.uploadTrackLoading = false;

        if (action.payload) {
          state.tracks.unshift(action.payload);
        }

        state.successMessage = "Track uploaded successfully";
      })

      .addCase(uploadTrack.rejected, (state, action) => {
        state.uploadTrackLoading = false;
        state.error = action.payload;
      });
      /********************************************/
  },
});


export const {
  setSelectedTrack,
  clearSelectedTrack,
  clearTracksError,
  clearTracksSuccessMessage,
} = tracksSlice.actions;

export default tracksSlice.reducer;