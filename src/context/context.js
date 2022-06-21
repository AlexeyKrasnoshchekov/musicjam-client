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
        setTokenIsSet,
        removeFromPlaylist,
        removeFromMySavedTracks,
        clearSavedTracks,
        clearSavedAlbums,
        removeFromMySavedAlbums,
        clearPlaylists,
        clearPlaylistItems,
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
