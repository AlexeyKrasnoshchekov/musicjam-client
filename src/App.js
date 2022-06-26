import "./App.css";
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Switch,
} from "react-router-dom";
import Playlist from "./components/Playlist/Playlist";
import ArtistPage from "./components/ArtistPage//ArtistPage";
import SavedTracks from "./components/SavedTracks/savedTracks";

import Login from "./pages/Login";
import Container from "./components/Container/Container";
import Home from "./pages/Home";
import SearchResults from "./components/SearchResults/SearchResults";
import Album from "./components/Album/Album";
import Callback from "./components/callback";
// import Callback from "./components/callback";

export default function App() {


  return (
    <HashRouter>
      <Switch>

        <Route path={"/album/:id"}>
        <Container>
            <Album />
            </Container>
        </Route>
        <Route path={"/artist/:id"}>
          <Container>
            <ArtistPage />
          </Container>
        </Route>
        <Route path={"/playlist/:id"}>
          <Container>
            <Playlist />
          </Container>
        </Route>
        <Route path={"/savedtracks"}>
          <Container>
            <SavedTracks />
          </Container>
        </Route>
        <Route path={"/search/:term"}>
          <Container>
            <SearchResults />
          </Container>
        </Route>
        <Route path={"/callback"}>
          <Callback />
        </Route>
        <Route path={"/home"}>
          <div className="App">{<Home/>}</div>
        </Route>
        <Route path={"/"}>
          <div className="App">{<Login/>}</div>
        </Route>
        
      </Switch>
    </HashRouter>
  );
}
