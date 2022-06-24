import { Col, Image, Row, Typography, Card } from "antd";

import "../SearchResults/SearchResults.css";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetArtistQuery } from "../../redux/artistQuery";

export default function Album() {
  const [imageIndex, setImageIndex] = useState(1);

  const { Title } = Typography;

  const { id } = useParams();

  const { data: artistObj, isLoading: isLoadingArtist } = useGetArtistQuery(id);

  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimenion]);

  return (
    <>
      {artistObj && artistObj.artist && (
        <>
          {windowDimenion.winWidth > 576 && (
            <Row gutter={50}>
              <Col lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 12 }}>
                <Image
                  width="100%"
                  src={
                    artistObj.artist.images.length !== 0 &&
                    artistObj.artist.images[imageIndex].url
                  }
                />
              </Col>
              <Col lg={{ span: 16 }} md={{ span: 12 }} sm={{ span: 12 }}>
                <Title level={2}>{`${artistObj.artist.name}`}</Title>
                <Title level={4}>{`Genres: ${artistObj.artist.genres.join(
                  "; "
                )}`}</Title>
                <Title
                  level={4}
                >{`Popularity: ${artistObj.artist.popularity}`}</Title>
              </Col>
            </Row>
          )}
          {windowDimenion.winWidth < 576 && (
            <Row align="center" gutter={50}>
              <Col>
                <Image
                  width="100%"
                  preview={false}
                  src={
                    artistObj.artist.images.length !== 0 &&
                    artistObj.artist.images[imageIndex].url
                  }
                />
              </Col>
              <Row justify="center" style={{ width: "100%" }}>
                <Col style={{ padding: "1rem 0", textAlign: "center" }}>
                  <Title level={2}>{`${artistObj.artist.name}`}</Title>
                  <Title level={4}>{`Genres: ${artistObj.artist.genres.join(
                    "; "
                  )}`}</Title>
                  <Title
                    level={4}
                  >{`Popularity: ${artistObj.artist.popularity}`}</Title>
                </Col>
              </Row>
            </Row>
          )}
        </>
      )}

      {artistObj && artistObj.artistAlbums.length !== 0 && (
        <Row>
          <Col span={24}>
            <Title level={4}>Albums</Title>
            <div className="albums-grid">
              {artistObj.artistAlbums.length !== 0 &&
                artistObj.artistAlbums.map((album, index) => {
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
      {artistObj && artistObj.relatedArtists.length !== 0 && (
        <div>
          <Title level={4}>Related artists</Title>
          <div className="artists-grid">
            {artistObj.relatedArtists.map((artist, index) => {
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
        </div>
      )}
    </>
  );
}
