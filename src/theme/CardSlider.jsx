import { React, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, Typography } from "@material-ui/core";
import image1 from "../assets/pexels-david-yu-1624990-min.jpg";
import image2 from "../assets/pexels-sevenstorm-juhaszimrus-555460-min.jpg";
import image3 from "../assets/pexels-fuzail-ahmad-2792601-min.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    margin: "auto",
    marginBottom: theme.spacing(2),
    maxHeight: "500px",
    position: "relative",
    zIndex: "4000",
  },
  media: {
    width: "100%",
    height: "100%",
    position: "relative",
    cursor: "pointer",
    objectFit: "contain",
    transition: "transform 0.3s ease",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.7)",
    color: "white",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  overlayVisible: {
    opacity: "1",
  },
}));

const dummyData = [
  {
    id: 1,
    imageUrl: image1,
    title: "Image 1",
    description: "Description for Image 1",
  },
  {
    id: 2,
    imageUrl: image2,
    title: "Image 2",
    description: "Description for Image 2",
  },
  {
    id: 3,
    imageUrl: image3,
    title: "Image 3",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. type specimen book. It has survived not only five centuries, but also thpesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset",
  },
  {
    id: 4,
    imageUrl: image1,
    title: "Image 4",
    description: "Description for Image 4",
  },
  {
    id: 5,
    imageUrl: image2,
    title: "Image 5",
    description: "Description for Image 5",
  },
  {
    id: 6,
    imageUrl: image3,
    title: "Image 6",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. type specimen book. It has survived not only five centuries, but also thpesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset",
  },
];

const CardSlider = () => {
  const classes = useStyles();
  const [hoveredId, setHoveredId] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  console.log(hoveredId);

  const handleMouseEnter = (id) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };
  return (
    <div>
      <Slider {...settings}>
        {dummyData.map((item) => (
          <div
            key={item.id}
            // style={{ height: "200px" }}
          >
            <Card
              className={classes.root}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            >
              <CardMedia
                className={classes.media}
                component="img"
                image={item.imageUrl}
                alt={item.title}
              />
              {hoveredId && (
                <div
                  className={`${classes.overlay} ${
                    hoveredId === item.id ? classes.overlayVisible : ""
                  }`}
                >
                  {hoveredId === item.id && (
                    <Box
                      sx={{
                        width: { sm: "600px", xs: "300px" },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h3">{item.title}</Typography>
                      <Typography variant="body1">
                        {item.description}
                      </Typography>
                      {/* <Button
                        sx={{
                          bgcolor: "white",
                          width: "150px",
                          marginTop: "15px",
                        }}
                      >
                        View more
                      </Button> */}
                    </Box>
                  )}
                </div>
              )}
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;

export { dummyData };
