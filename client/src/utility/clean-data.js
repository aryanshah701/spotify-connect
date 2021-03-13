// A file that provides pure functions that clean data
// fetched from the Spotify API

// Convert the audio features object response to an array with
// relevant data
export function respToAudioFeatures(response) {
  let transformedData = [];
  if (response) {
    for (let audioFeature of response.audio_features) {
      let newAudioFeature = {
        energy: audioFeature.energy,
        valence: audioFeature.valence,
        danceability: audioFeature.danceability,
        liveness: audioFeature.liveness,
      };
      transformedData.push(newAudioFeature);
    }
  }
  console.log(transformedData);
  return transformedData;
}

// Convert the track data object to an array with
// relevant data
export function respToTrackData(response) {
  let transformedData = [];
  if (response) {
    for (let track of response.items) {
      let newTrack = {
        name: track.name,
        image: track.album.images[0].url,
        url: track.external_urls.spotify,
        album: track.album.name,
        trackId: track.id,
      };
      transformedData.push(newTrack);
    }
  }
  console.log(transformedData);
  return transformedData;
}

// Convert the artist object response to artist array with
// relevant data
export function respToArtistData(response) {
  let transformedData = [];
  if (response) {
    for (let artist of response.items) {
      let newArtist = {
        name: artist.name,
        image: artist.images[2],
        popularity: artist.popularity,
        url: artist.external_urls.spotify,
        artistId: artist.id,
      };

      transformedData.push(newArtist);
    }
  }
  console.log(transformedData);
  return transformedData;
}
