import { useReducer } from "react";
import { createContext } from "react";
// import SpotifyWebApi from "spotify-web-api-js";
import reducer from "./reducer";
import {
  SET_TOKEN_IS_SET,
  // CLEAR_SAVED_TRACKS,
  // CLEAR_SAVED_ALBUMS,
  // CLEAR_PLAYLISTS,
  // CLEAR_PLAYLIST_ITEMS,
} from "./reducer";

export const context = createContext();

const State = (props) => {
  const initialState = {
    // token: "",
    tokenIsSet: false,
    // urlIsSet: false,
    // mySavedTracks: [],
    // playlistItems: [],
    // artistAlbums: [],
    // relatedArtists: [],
    // playlist: null,
    // album: null,
    // artist: null,
    // albumId: "",
    // searchResult: null,
    // user: "",
    // total: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const setTokenIsSet = (bool) =>
    dispatch({ type: SET_TOKEN_IS_SET, payload: bool });



  const logout = () => {
    setTokenIsSet(false);
  };

  // const removeFromPlaylist = async (playlistId, uri) => {
  //   try {
  //     await spotifyApi.setAccessToken("BQDqZLbNe7COBWDWx4wPFPMXj8HguzdYSnFWZBCx9OARzxI4qcFSipOABdbY7zS6vuwUzJfkQeD4R4WJfckI3fvAyjA7BEppvtjK724X2cEf6EGcH5LGNgASzhuhbSnhZvqbkf5JZY1emJp0PfkvtpjiOxRQx0sE7q4D-JVDnQUAE5eAVI8utV3tGdE9-nHOsGic_00OwHQg-bpNL7PBLhpv90I0g9hXqTlPPVjqRdqEeGEidcdlzCyfkSRamgtNZSPjCd1qAeI9i_A7eBHcVRC_KpEERXxb-73alY-PZBcXUZ7kIB6MRdV-T_xFEONf8IbYFTeqoKTwGgf7Bg")
  //     await spotifyApi.removeTracksFromPlaylist(playlistId, [uri]);
  //     // await dispatch({
  //     //   type: DELETE_PLAYLIST_ITEM,
  //     //   payload: trackId,
  //     // });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };



  // const clearSavedTracks = () => dispatch({ type: CLEAR_SAVED_TRACKS });
  // const clearSavedAlbums = () => dispatch({ type: CLEAR_SAVED_ALBUMS });
  // const clearPlaylists = () => dispatch({ type: CLEAR_PLAYLISTS });
  // const clearPlaylistItems = () => dispatch({ type: CLEAR_PLAYLIST_ITEMS });

  return (
    <context.Provider
      value={{
        // token: state.token,
        // tokenIsSet: state.tokenIsSet,
        // playlist: state.playlist,
        // album: state.album,
        // artist: state.artist,
        // user: state.user,
        // searchResult: state.searchResult,
        // mySavedTracks: state.mySavedTracks,
        // playlistItems: state.playlistItems,
        // artistAlbums: state.artistAlbums,
        // relatedArtists: state.relatedArtists,
        // setToken,
        // auth,
        logout,
        setTokenIsSet,
        // removeFromPlaylist,
        // clearSavedTracks,
        // clearSavedAlbums,
        // clearPlaylists,
        // clearPlaylistItems,
      }}
    >
      {props.children}
    </context.Provider>
  );
};

export default State;
