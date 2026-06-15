import mongoose from "mongoose";
import musicModel from "../models/music.model.js";
import playlistModel from "../models/playlist.model.js";
import { getPresignedUrl, uploadFile } from "../services/storage.service.js";

// Upload a Track
export async function uploadMusic(req, res) {
  const musicFile = req.files["musicFile"][0];
  const coverImageFile = req.files["coverImageFile"][0];

  if (!musicFile || !coverImageFile) {
    return res.status(400).json({
      status: false,
      message: "Music file and Cover image are required",
    });
  }

  try {
    // Uploading both files to S3 Bucket
    const [musicKey, coverImageKey] = await Promise.all([
      uploadFile(musicFile),
      uploadFile(coverImageFile),
    ]);

    const { firstName, lastName } = req.user.fullName;
    const fullName = [firstName, lastName]
      .filter((name) => name?.trim())
      .join(" ");

    const artistName = req.user.stageName?.trim()
      ? req.user.stageName
      : fullName;

    console.log("stageName", req.user.stageName);

    const music = await musicModel.create({
      title: req.body.title,
      genre: req.body.genre,
      subGenre: req.body.subGenre,
      language: req.body.language,
      isExplicit: req.body.isExplicit,
      releaseYear: req.body.releaseYear,

      artist: artistName,
      artistId: req.user.id,

      musicKey,
      coverImageKey,
    });

    return res.status(201).json({
      status: false,
      message: "Music Uploaded Successfully",
      music,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

export async function getMusicTrackByID(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid Track ID",
      });
    }

    const music = await musicModel.findById(id).lean();

    if (!music) {
      return res.status(404).json({
        status: false,
        message: "Track not found",
      });
    }

    const [musicUrl, coverImageUrl] = await Promise.all([
      music.musicKey ? getPresignedUrl(music.musicKey) : null,
      music.coverImageKey ? getPresignedUrl(music.coverImageKey) : null,
    ]);

    return res.status(200).json({
      status: true,
      message: "Track fetched successfully",
      music: {
        ...music,
        musicUrl,
        coverImageUrl,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

// Get All Music Tracks (Pagination)
export async function getAllMusicTracks(req, res) {
  try {
    const { skip = 0, limit = 10 } = req.query;

    const musicDocs = await musicModel.find().lean();

    const musics = await Promise.all(
      musicDocs.map(async (music) => {
        const [musicUrl, coverImageUrl] = await Promise.all([
          getPresignedUrl(music.musicKey),
          getPresignedUrl(music.coverImageKey),
        ]);

        return { ...music, musicUrl, coverImageUrl };
      }),
    );

    return res.status(200).json({
      status: true,
      message: "Successfully fetched all music tracks",
      musics,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

// Get all tracks of Artist
export async function getArtistMusic(req, res) {
  try {
    const musics = await musicModel.find({ artistId: req.user.id }).lean();

    const musicsWithUrls = await Promise.all(
      musics.map(async (music) => {
        const musicUrl = await getPresignedUrl(music.musicKey);
        const coverImageUrl = await getPresignedUrl(music.coverImageKey);

        return {
          ...music,
          musicUrl,
          coverImageUrl,
        };
      }),
    );

    return res.status(200).json({
      status: true,
      musics: musicsWithUrls,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

// Create a Playlist
export async function createPlaylist(req, res) {
  const { title, tracks } = req.body;

  try {
    const playlist = await playlistModel.create({
      title: title,
      artist: req.user.stageName,
      artistId: req.user.id,
      tracks,
    });

    return res.status(201).json({
      status: true,
      message: "Playlist created successfully",
      playlist,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

// Get all Playlists
export async function getAllPlaylists(req, res) {
  try {
    const playlists = await playlistModel.find();
    // const playlists = await playlistModel.find({ artistId: req.user.id })

    return res.status(200).json({
      status: true,
      message: "Successfully fetched all playlists",
      playlists,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

// Get Playlist by Id
export async function getPlaylistById(req, res) {
  try {
    const { id } = req.params;

    const playlistDocs = await playlistModel.findById(id).lean();

    if (!playlistDocs) {
      return res.status(404).json({
        status: false,
        message: "Playlist not found",
      });
    }

    const tracks = await Promise.all(
      playlistDocs.tracks.map(async (musicId) => {
        const track = await musicModel.findById(musicId).lean();

        if (!track) {
          return null;
        }

        const [musicUrl, coverImageUrl] = await Promise.all([
          getPresignedUrl(track.musicKey),
          getPresignedUrl(track.coverImageKey),
        ]);

        return {
          ...track,
          musicUrl,
          coverImageUrl,
        };
      }),
    );

    const validTracks = tracks.filter(Boolean);

    return res.status(200).json({
      status: true,
      message: "Playlist fetched successfully",
      playlist: {
        ...playlistDocs,
        tracks: validTracks,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
