import { useState, useEffect } from 'react';
import queryString from 'query-string';

//JS and Component imports
import {
  respToAudioFeatures,
  respToTrackData,
  respToArtistData,
} from '../clean-data';
import TopArtists from '../TopArtists';
import TopTracks from '../TopTracks';

// UI Imports
import 'milligram';
import Button from '@material-ui/core/Button';
import '../App.css';

const URL = 'http://localhost:9000/login';

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
      console.log(parsedAccessToken);
      if (parsedAccessToken && parsedAccessToken != '') {
        setState({
          ...state,
          signedIn: true,
          accessToken: parsedAccessToken,
        });
        return 'success';
      }
    } else {
      // Fetch SPOTIFY track and artist data
      getArtists()
        .then((msg) => {
          console.log('2');
          getTracks();
        })
        .then((msg) => console.log(msg));
    }
  }, [state.signedIn]);

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
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        let transformedData = respToArtistData(responseData);
        console.log('Gotten artists');
        console.log(transformedData);
        if (transformedData)
          setState({
            ...state,
            artistData: transformedData,
          });
        return 'success';
      })
      .catch((err) => console.log('oops ' + err));
  }

  // Fetch relevant top tracks data from Spotify API
  async function getTracks() {
    const url = 'https://api.spotify.com/v1/me/top/tracks';
    const token = 'Bearer ' + accessToken;

    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        let transformedData = respToTrackData(responseData);
        console.log('Gotten tracks');
        console.log(transformedData);
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

    // Fetching
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        let transformedData = respToAudioFeatures(responseData);
        console.log('Gotten audio features');
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

function Login() {
  return (
    <div>
      <div id="login-page" className="container">
        <div className="row">
          <div className="column">
            <h1>Login Page</h1>
          </div>
        </div>
        <div className="row" id="login-button">
          <div className="column">
            <Button
              onClick={() => (window.location.href = URL)}
              size="large"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
