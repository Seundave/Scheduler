import { React, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, Typography } from "@material-ui/core";
import image1 from "../assets/pexels-david-yu-1624990-min.jpg";
import image2 from "../assets/pexels-sevenstorm-juhaszimrus-555460-min.jpg";
import image3 from "../assets/pexels-fuzail-ahmad-2792601-min.jpg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  getSchedulerFailure,
  getSchedulerStart,
  getSchedulerSuccess,
} from "../redux/get-schedulers/getScheduler";

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


const CardSlider = () => {
  const [schedulers, setSchedulers] = useState([]);
  const classes = useStyles();
  const [hoveredId, setHoveredId] = useState(null);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.getSchedulers);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        dispatch(getSchedulerStart());
        const response = await axios.get(
          "http://localhost:3000/scheduler/get-schedulers"
        );
        console.log(response);
        const fetchedSchedulers = response.data;
        dispatch(getSchedulerSuccess(response.data));
        setSchedulers(fetchedSchedulers);
        // setLoading(false);
      } catch (error) {
        dispatch(getSchedulerFailure(error.message));
        console.log("Error fetching admins", error);
        // setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

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

  const handleMouseEnter = (_id) => {
    setHoveredId(_id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };
  return (
    <div>
      <Slider {...settings}>
        {schedulers.map((item) => (
          <div
            key={item._id}
            // style={{ height: "200px" }}
          >
            <Card
              className={classes.root}
              onMouseEnter={() => handleMouseEnter(item._id)}
              onMouseLeave={handleMouseLeave}
            >
              <CardMedia
                className={classes.media}
                component="img"
                image={item.imageUrl}
                alt={item.lectureTheatre}
              />
              {hoveredId && (
                <div
                  className={`${classes.overlay} ${
                    hoveredId === item._id ? classes.overlayVisible : ""
                  }`}
                >
                  {hoveredId === item._id && (
                    <Box
                      sx={{
                        width: { sm: "600px", xs: "300px" },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h4">{item.lectureTheatre}</Typography>
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

// export { schedulers };
