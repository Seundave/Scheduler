import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardSlider from "../theme/CardSlider";
import { yupResolver } from "@hookform/resolvers/yup";
import { createScheduler } from "../validation/createScheduler";
import { useForm } from "react-hook-form";
import CreateSchedulerForm from "../sections/@dashboard/createSchedulerForm";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  schedulerFailure,
  schedulerStart,
  schedulerSuccess,
} from "../redux/admin-scheduler/scheduleSlice";



const DashboardAppPage = () => {
  const [image, setImage] = useState();
  const [facility, setFacility] = React.useState([]);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.scheduler);

  const methods = useForm({
    defaultValues: {
      lectureTheatre: "",
      location: "",
      capacity: "",
      facilities:[],
      description: "",
    },
    resolver: yupResolver(createScheduler),
  });

  const {
    reset,
    register,
    setError,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = methods;

  const facilities = watch("facilities", []);

  //handles create scheduler submission
  const onSubmit = async (data) => {
    try {
      dispatch(schedulerStart());
      const res = await axios.post(
        "http://localhost:3000/scheduler/create-scheduler",
        data
      );
      console.log("Scheduler created successfully", res.data);
      dispatch(schedulerSuccess(res.data));
      toast.success("Scheduler created successfully!");
      console.log(res.data);
      reset();
      // window.location.reload();
    } catch (error) {
      console.log("Error submitting form", error);
      toast.error("Error submitting form");
      dispatch(schedulerFailure(error.message));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setImage(event.dataTransfer.files[0]);
  };

  const handleImageClick = () => {
    inputRef.current.click();
    console.log("clicked");
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div>
      <Helmet>
        <title> Home </title>
      </Helmet>

      <CardSlider />

      <CreateSchedulerForm
        methods={methods}
        onSubmit={onSubmit}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
        handleImageClick={handleImageClick}
        handleImageChange={handleImageChange}
        image={image}
        setImage={setImage}
        inputRef={inputRef}
        loading={loading}
        facilities={facilities}
        facility={facility}
        setFacility={setFacility}
      />
    </div>
  );
};

export default DashboardAppPage;
