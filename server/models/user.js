const mongoose = require('mongoose');

// The Artist Schema
const ArtistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: {
    type: { height: Number, width: Number, url: String },
    required: true,
  },
  url: { type: String, required: true },
  popularity: { type: Number, required: true },
  artistId: { type: String, required: true },
});

// The Tracks Schema
const TrackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  url: { type: String, required: true },
  album: { type: String, required: true },
  trackId: { type: String, required: true },
});

// The AudioFeatures Schema
const AudioFeaturesSchema = new mongoose.Schema({
  energy: { type: Number, required: true },
  valence: { type: Number, required: true },
  dancebility: { type: Number, required: true },
  liveness: { type: Number, required: true },
});

// The User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  spotifyData: {
    artists: { type: [ArtistSchema], required: false },
    tracks: { type: [TrackSchema], required: false },
    features: { type: [AudioFeaturesSchema], required: false },
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
