import express from "express";
import multer from "multer";

import * as middleware from "../middlewares/auth.middleware.js"
import * as validators from "../validators/validators.js";
import * as musicController from "../controllers/music.controller.js";


const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

// Upload a music => POST => /upload
router.post("/upload", middleware.artistAuthMiddleware, upload.fields([ { name: "musicFile", maxCount: 1 }, { name: "coverImageFile", maxCount: 1 } ]), validators.validateTrackUpload, musicController.uploadMusic);


// Get All Music Tracks => GET => / (Pagination)
router.get("/", middleware.userAuthMiddleware, musicController.getAllMusicTracks)


// Get Tracks by Id => GET => /track/:id
router.get("/track/:id", middleware.userAuthMiddleware, musicController.getMusicTrackByID)



// Get all tracks of Artist => GET => /artist-musics
router.get("/artist-musics", middleware.artistAuthMiddleware, musicController.getArtistMusic)


// Create New Playlist => POST => /new-playlist
router.post("/new-playlist", middleware.artistAuthMiddleware, musicController.createPlaylist)


// Get All Playlists => GET => /playlists
router.get("/playlists", middleware.userAuthMiddleware, musicController.getAllPlaylists)


// Get all playlists of Artist
router.get("/artist-playlists", middleware.userAuthMiddleware, musicController.getArtistPlaylists)




// Get Playlist By Id => GET => /playlist/:id
router.get("/playlist/:id", middleware.userAuthMiddleware, musicController.getPlaylistById)



export default router;
