import { Col, Image, Row, Typography, Card } from "antd";

import "../SearchResults/SearchResults.css";

import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { context } from "../../context/context";
import { useGetArtistQuery } from "../../redux/artistQuery";

export default function Album() {
  const [imageIndex, setImageIndex] = useState(1);

  const { Title } = Typography;

  const {
    token,
    refreshPage,
    artist,
    getArtist,
    getArtistAlbums,
    getArtistRelatedArtists,
    relatedArtists,
    artistAlbums,
  } = useContext(context);

  const initialRender = useRef(true);
  const { id } = useParams();

  const {data: artist1, isLoading: isLoadingArtist} = useGetArtistQuery(id);
  console.log('artist',artist1);

  // const handleGetArtist = async (id) => {
  //   console.log("id11122", id);
  //   await getArtist(id);
  //   await getArtistAlbums(id);
  //   await getArtistRelatedArtists(id);
  // };

  // useEffect(() => {
  //   if (initialRender.current) {
  //     initialRender.current = false;
  //     return;
  //   }
  //   token === "" && refreshPage();
  // }, [token]);

  // useEffect(() => {
  //   if (initialRender.current) {
  //     initialRender.current = false;
  //     return;
  //   }
  //   handleGetArtist(id);
  // }, [id]);

  return (
    <>
      {artist1 && (
        <Row>
          <Col span={8}>
            <Image
              width={300}
              src={artist1.images.length !== 0 && artist1.images[imageIndex].url}
            />
          </Col>
          <Col span={16}>
            <Title level={2}>{`${artist1.name}`}</Title>
            <Title level={4}>{`Genres: ${artist1.genres.join("; ")}`}</Title>
            <Title level={4}>{`Popularity: ${artist1.popularity}`}</Title>
          </Col>
        </Row>
      )}

      {/* {artistAlbums.length !== 0 && (
        <Row>
          <Col span={24}>
            <Title level={4}>Albums</Title>
            <div className="albums-grid">
              {artistAlbums.length !== 0 &&
                artistAlbums.map((album, index) => {
                  return (
                    <Card
                      hoverable
                      title={album.name}
                      extra={<Link to={`/album/${album.id}`}>More</Link>}
                      style={{
                        width: "15rem",
                        height: "15rem",
                        backgroundImage: `url(${album.images[1].url})`,
                      }}
                      bodyStyle={{
                        color: "lightgray",
                        height: "calc(100% - 3rem",
                        backgroundColor: "rgba(000, 000, 000, 0.5)",
                      }}
                      headStyle={{
                        color: "lightgray",
                        height: "3rem",
                        backgroundColor: "rgba(000, 000, 000, 0.5)",
                      }}
                    >
                      <p>{`Artist: ${album.artists[0].name}`}</p>
                      <p>{`Released: ${album.release_date}`}</p>
                      <p>{`Total tracks: ${album.total_tracks}`}</p>
                    </Card>
                  );
                })}
            </div>
          </Col>
        </Row>
      )}
      {relatedArtists.length !== 0 && (
        <div>
          <Title level={4}>Related artists</Title>
          <div className="artists-grid">
            {relatedArtists.map((artist, index) => {
              return (
                <Card
                  hoverable
                  title={artist.name}
                  extra={<Link to={`/artist/${artist.id}`}>More</Link>}
                  style={{
                    width: "15rem",
                    height: "15rem",
                    backgroundImage: `url(${
                      artist.images.length !== 0 && artist.images[1].url
                    })`,
                  }}
                  bodyStyle={{
                    color: "lightgray",
                    height: "calc(100% - 3rem",
                    backgroundColor: "rgba(000, 000, 000, 0.5)",
                  }}
                  headStyle={{
                    color: "lightgray",
                    height: "3rem",
                    backgroundColor: "rgba(000, 000, 000, 0.5)",
                  }}
                >
                  <p>{`Genres: ${artist.genres.join("; ")}`}</p>
                  <p>{`Popularity: ${artist.popularity}`}</p>
                </Card>
              );
            })}
          </div>
        </div> */}
      )}
    </>
  );
}
