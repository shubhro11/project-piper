import { createAsyncThunk } from "@reduxjs/toolkit";
import { musicApi } from "../../api/axios_config";


/********** GET ARTIST'S OWN TRACKS *********/

export const fetchArtistTracks = createAsyncThunk(
  "tracks/fetchArtistTracks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await musicApi.get("/artist-musics");

      return res.data.musics || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to fetch artist tracks"
      );
    }
  }
);
/********************************************/


/************** GET ALL TRACKS **************/

export const fetchAllTracks = createAsyncThunk(
  "tracks/fetchAllTracks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await musicApi.get("/", {
        withCredentials: true,
      });

      return res.data?.musics || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to fetch tracks"
      );
    }
  }
);
/********************************************/


/********** GET SINGLE TRACK BY ID **********/

// GET SINGLE TRACK BY ID
export const fetchTrackById = createAsyncThunk(
  "tracks/fetchTrackById",
  async (trackId, { rejectWithValue }) => {
    try {
      const res = await musicApi.get(`/track/${trackId}`);

      return res.data.music;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to fetch track"
      );
    }
  }
);
/********************************************/


/*************** UPLOAD TRACK ***************/

export const uploadTrack = createAsyncThunk(
  "tracks/uploadTrack",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await musicApi.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data.music;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.response?.data?.errors?.[0]?.msg ||
          "Failed to upload track"
      );
    }
  }
);
/********************************************/