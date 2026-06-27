import { createAsyncThunk } from "@reduxjs/toolkit";
import { musicApi } from "../../api/axios_config";



/*********** GET ARTIST PLAYLISTS ***********/

export const fetchArtistPlaylists = createAsyncThunk(
  "playlist/fetchArtistPlaylists",
  async (_, thunkAPI) => {
    try {
      const res = await musicApi.get("/artist-playlists");

      return res.data.playlists;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch artist playlists",
      );
    }
  },
);
/********************************************/


/************* CREATE PLAYLIST **************/

export const createPlaylist = createAsyncThunk(
  "playlists/createPlaylist",
  async (playlistData, { rejectWithValue }) => {
    try {
      const res = await musicApi.post("/new-playlist", playlistData);

      return res.data.playlist;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to create playlist",
      );
    }
  },
);
/********************************************/