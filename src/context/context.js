import { useReducer } from "react";
import { createContext } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import reducer from "./reducer";
import {
  SET_TOKEN,
  SET_TOKEN_IS_SET,
  SET_PLAYLISTS,
  SET_ARTIST_ALBUMS,
  SET_RELATED_ARTISTS,
  SET_PLAYLIST,
  SET_ALBUM,
  SET_MY_ALBUMS,
  SET_MY_TRACKS,
  SET_USER,
  SET_SEARCH_RESULT,
  DELETE_PLAYLIST_ITEM,
  SET_PLAYLIST_ITEMS,
  DELETE_MY_TRACKS_ITEM,
  CLEAR_SAVED_TRACKS,
  CLEAR_SAVED_ALBUMS,
  CLEAR_PLAYLISTS,
  CLEAR_PLAYLIST_ITEMS,
  SET_ARTIST,
} from "./reducer";

export const context = createContext();

const State = (props) => {
  const initialState = {
    token: "",
    tokenIsSet: false,
    urlIsSet: false,
    mySavedTracks: [],
    playlistItems: [],
    artistAlbums: [],
    relatedArtists: [],
    playlist: null,
    album: null,
    artist: null,
    albumId: "",
    searchResult: null,
    user: "",
    total: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const spotifyApi = new SpotifyWebApi();

  const setToken = (token) => {
    dispatch({ type: SET_TOKEN, payload: token });
  };
  const setTokenIsSet = (bool) =>
    dispatch({ type: SET_TOKEN_IS_SET, payload: bool });

  const auth = () => {
    spotifyApi.setAccessToken(state.token);
  };

  const refreshPage = () => {
    let tokenFromLS = localStorage.getItem("token");
    tokenFromLS !== "" && spotifyApi.setAccessToken(tokenFromLS);
  };

  const logout = () => {
    setTokenIsSet(false);
  };

  const setUrl = async () => {
    const accessUrl = `http://localhost:8000/login`;
    
    window.location = accessUrl;
  
    // let data = await fetch('http://localhost:8000/callback', { mode: "cors" });
    // console.log('data', data);
  }

  const getToken = async (code) => {
    
    await fetch(`http://localhost:8000/callback/${code}`, { mode: "cors" });
    // console.log('data', data);
  }

 
  const getPlaylist = async (playlistId) => {
    try {
      let data = await spotifyApi.getPlaylist(playlistId);
      dispatch({
        type: SET_PLAYLIST,
        payload: data,
      });
      if (data.tracks.items.length !== 0) {
        data.tracks.items.forEach((item) => {
          dispatch({
            type: SET_PLAYLIST_ITEMS,
            payload: item,
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAlbum = async (albumId) => {
    try {
      let data = await spotifyApi.getAlbum(albumId);
      dispatch({
        type: SET_ALBUM,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getArtist = async (artistId) => {
    try {
      let data = await spotifyApi.getArtist(artistId);
      await dispatch({
        type: SET_ARTIST,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getArtistAlbums = async (artistId) => {
    try {
      let data = await spotifyApi.getArtistAlbums(artistId, { limit: 10 });

      if (data.items.length !== 0) {
        data.items.forEach((item) => {
          dispatch({
            type: SET_ARTIST_ALBUMS,
            payload: item,
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getArtistRelatedArtists = async (artistId) => {
    try {
      let data = await spotifyApi.getArtistRelatedArtists(artistId);

      if (data.artists.length !== 0) {
        data.artists.forEach((item) => {
          dispatch({
            type: SET_RELATED_ARTISTS,
            payload: item,
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToPlaylist = async (playlistId, uri) => {
    let playlistTracks = await spotifyApi.getPlaylistTracks(playlistId);

    if (
      playlistTracks.items.filter((item) => item.track.uri === uri).length === 0
    ) {
      try {
        await spotifyApi.addTracksToPlaylist(playlistId, [uri]);
        return true;
      } catch (error) {
        console.log(error);
      }
    } else {
      return false;
    }
  };
  const removeFromPlaylist = async (playlistId, uri, trackId) => {
    try {
      await spotifyApi.removeTracksFromPlaylist(playlistId, [uri]);
      await dispatch({
        type: DELETE_PLAYLIST_ITEM,
        payload: trackId,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const addToMySavedAlbums = async (albumId) => {
    try {
      await spotifyApi.addToMySavedAlbums([albumId]);
    } catch (error) {
      console.log(error);
    }
  };

  const addToMySavedTracks = async (trackId) => {
    try {
      await spotifyApi.addToMySavedTracks([trackId]);
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromMySavedTracks = async (savedTrackIndex) => {
    const savedTrackId = state.mySavedTracks.filter(
      (_, index) => index === savedTrackIndex
    )[0].track.id;
    try {
      await spotifyApi.removeFromMySavedTracks([savedTrackId]);
      await dispatch({
        type: DELETE_MY_TRACKS_ITEM,
        payload: savedTrackId,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromMySavedAlbums = async (albumId) => {
    try {
      await spotifyApi.removeFromMySavedAlbums([albumId]);
    } catch (error) {
      console.log(error);
    }
  };

  const createPlaylist = async (playlistName) => {
    const data = await spotifyApi.getMe();

    try {
      let newPlaylist = await spotifyApi.createPlaylist(data.id, {
        name: playlistName,
      });
      await spotifyApi.addTracksToPlaylist(newPlaylist.id, [
        "spotify:track:2bfGNzdiRa1jXZRdfssSzR",
      ]);

    } catch (error) {
      console.log(error);
    }
  };
  const search = async (searchTerm) => {
    const types = ["artist", "album", "track"];
    // spotifyApi.setAccessToken(state.token);
    try {
      let data = await spotifyApi.search(searchTerm, types, { limit: 5 });
      dispatch({
        type: SET_SEARCH_RESULT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const clearSavedTracks = () => dispatch({ type: CLEAR_SAVED_TRACKS });
  const clearSavedAlbums = () => dispatch({ type: CLEAR_SAVED_ALBUMS });
  const clearPlaylists = () => dispatch({ type: CLEAR_PLAYLISTS });
  const clearPlaylistItems = () => dispatch({ type: CLEAR_PLAYLIST_ITEMS });

  return (
    <context.Provider
      value={{
        token: state.token,
        tokenIsSet: state.tokenIsSet,
        playlist: state.playlist,
        album: state.album,
        artist: state.artist,
        user: state.user,
        searchResult: state.searchResult,
        mySavedTracks: state.mySavedTracks,
        playlistItems: state.playlistItems,
        artistAlbums: state.artistAlbums,
        relatedArtists: state.relatedArtists,
        setToken,
        auth,
        logout,
        getAlbum,
        getPlaylist,
        setTokenIsSet,
        search,
        addToPlaylist,
        removeFromPlaylist,
        createPlaylist,
        addToMySavedAlbums,
        addToMySavedTracks,
        removeFromMySavedTracks,
        clearSavedTracks,
        clearSavedAlbums,
        removeFromMySavedAlbums,
        clearPlaylists,
        clearPlaylistItems,
        getArtist,
        getArtistAlbums,
        getArtistRelatedArtists,
        refreshPage,
        setUrl,
        getToken
      }}
    >
      {props.children}
    </context.Provider>
  );
};

export default State;
