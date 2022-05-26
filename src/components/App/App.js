import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import SpotifyWebApi from "spotify-web-api-js";
import Playlist from "../Playlist/Playlist";
// import Playlist from "../Playlist/Playlist";
// import SearchBar from "../SearchBar/SearchBar";
// import SearchResults from "../SearchResults/SearchResults";
// import { search, savePlaylist, getAccessToken } from "../../util/Spotify";
// import Playlists from "../Playlists/Playlists";
// import { useAppDispatch } from "../../hooks/redux";
// import { loadPlaylists } from "../Playlists/playlistsSlice";
import Login from "../Login/Login";
import Container from "../Container/Container";
import { context } from "../../store/context";

export default function App() {
  // const [accessToken, setAccessToken] = useState("");
  // const [tokenIsSet, setTokenIsSet] = useState(false);

  const {
    tokenIsSet,
    // getToken,
    // logout,
  } = useContext(context);
  // const spotifyApi = new SpotifyWebApi();

  // const handleLogin = () => {
  //   token !== "" && auth();
  // };
  // const handleSearch = (searchTerm, types) => {
  //   return spotifyApi.search(searchTerm, types, {
  //     limit: 10,
  //     market: "ES",
  //   });
  // };

  // const handleLogout = () => {
  //   logout();
  // };

  // get Elvis' albums, passing a callback. When a callback is passed, no Promise is returned
  // spotifyApi.getArtistAlbums(
  //   "43ZHCT0cAZBISjO8DG9PnE",
  //   function (err: any, data: any) {
  //     if (err) console.error(err);
  //     else console.log("Artist albums", data);
  //   }
  // );

  // get Elvis' albums, using Promises through Promise, Q or when
  // spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
  //   function (data) {
  //     console.log("Artist albums", data);
  //   },
  //   function (err) {
  //     console.error(err);
  //   }
  // );
  // spotifyApi
  //   .getMe() // note that we don't pass a user id
  //   .then(
  //     function (data) {
  //       console.log('User', data);
  //     },
  //     function (err) {
  //       console.error(err);
  //     }
  //   );
  console.log('tokenIsSet', tokenIsSet)
  return (
    
    <Router>
      <div className="App">{tokenIsSet ? <Container /> : <Login />}</div>

      {/* <Switch>
        <Route path="/playlist">
          <Playlist />
        </Route>
      </Switch> */}
    </Router>
  );
}
