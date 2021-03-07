import { useState, useEffect } from 'react';
import queryString from 'query-string';

//JS and Component imports
import {
  respToAudioFeatures,
  respToTrackData,
  respToArtistData,
} from '../utility/clean-data';
import Login from '../components/Login';
import TopArtists from '../components/TopArtists';
import TopTracks from '../components/TopTracks';
import AudioFeatures from '../components/AudioFeatures';

// UI Imports
import 'milligram';
import '../App.css';

// User Dashboard
function Home() {
  const [state, setState] = useState({
    accessToken: '',
    signedIn: false,
    artistData: [],
    trackData: [],
    audioFeatures: [],
  });

  const signedIn = state.signedIn;
  const accessToken = state.accessToken;

  // Update access token if available(once signed in)
  useEffect(() => {
    if (accessToken == '') {
      // Getting the access token from the url parems
      let parsedAccessToken = queryString.parse(window.location.search)
        .access_token;

      // Ensuring access token exists
      if (parsedAccessToken && parsedAccessToken != '') {
        setState({
          ...state,
          signedIn: true,
          accessToken: parsedAccessToken,
        });
      }
    } else {
      // Fetch artist data
      getArtists();
    }
  }, [state.signedIn]);

  // Get the track data once the artist data has been fetched
  useEffect(() => {
    if (state.artistData != []) {
      getTracks();
    }
  }, [state.artistData]);

  // Get the audio features once the track data has been fetched
  useEffect(() => {
    if (state.trackData != []) {
      getAudioFeatures();
    }
  }, [state.trackData]);

  // Fetch relevant top artist data from Spotify API
  async function getArtists() {
    const url = 'https://api.spotify.com/v1/me/top/artists';
    const token = 'Bearer ' + accessToken;

    // Make fetch request for artists
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Transform the data and update state
        let transformedData = respToArtistData(responseData);
        setState({
          ...state,
          artistData: transformedData,
        });
      })
      .catch((err) => console.log('oops ' + err));
  }

  // Fetch relevant top tracks data from Spotify API
  async function getTracks() {
    const url = 'https://api.spotify.com/v1/me/top/tracks';
    const token = 'Bearer ' + accessToken;

    // Make fetch request for tracks
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Transform the data and update state
        let transformedData = respToTrackData(responseData);
        setState({
          ...state,
          trackData: transformedData,
        });
      })
      .catch((err) => console.log('oops ' + err));
  }

  // Fetch relevant top tracks data from Spotify API
  async function getAudioFeatures() {
    // Get ids of top songs
    let ids = [];
    if (state.trackData != []) {
      ids = state.trackData.map((track) => track.id);
    }

    // API endpoint to get audio features
    const url =
      'https://api.spotify.com/v1/audio-features?ids=' + ids.join(',');
    const token = 'Bearer ' + accessToken;

    // Make fetch request for audio features
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Transform the data and update state
        let transformedData = respToAudioFeatures(responseData);
        console.log(transformedData);
        setState({
          ...state,
          audioFeatures: transformedData,
        });
      })
      .catch((err) => console.log('oops ' + err));
  }

  if (signedIn) {
    return (
      <div id="home-page" className="container">
        <div className="row">
          <div className="column">
            <h1>Your Home Page</h1>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <h2>Your Top Tracks</h2>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <TopTracks tracks={state.trackData} />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <h2>Your Top Artists</h2>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <TopArtists artists={state.artistData} />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <AudioFeatures audioFeatures={state.audioFeatures} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Login />
      </div>
    );
  }
}

export default Home;
