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
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../src/firebase";

const DashboardAppPage = () => {
  const [files, setFiles] = useState([]);
  const [facility, setFacility] = React.useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [imageData, setImageData] = useState([]);
  const { loading, error } = useSelector((state) => state.scheduler);

  const defaultValues = {
    imageUrl: [],
    lectureTheatre: "placeholder",
    location: "placeholder",
    capacity: "placeholder",
    facilities: [],
    status: "placeholder",
    description: "",
  }

  const methods = useForm({
    defaultValues:  defaultValues,
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
      reset(defaultValues);
      // resetField("lectureTheatre", { keepError: true })
    
      // window.location.reload();
    } catch (error) {
      console.log("Error submitting form", error);
      toast.error("Error submitting form");
      dispatch(schedulerFailure(error.message));
    }
  };

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + imageData.length < 7) {
      setUploading(true);
      setImageUploadError(false);

      Promise.all(files.map((el) => storeImage(el))).then((urls) => {
        setUploading(false)
        setValue("imageUrl", urls);
        setImageData(urls);
      });
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setImage(event.dataTransfer.files[0]);
  };

  const handleImageClick = (e) => {
    inputRef.current.click();

  };

  const handleImageChange = (event) => {
    const selectedFiles = event.target.files;
    const new_files = Object.values(selectedFiles).map((el) => el);
    setFiles(new_files);
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
        files={files}
        setFiles={setFiles}
        inputRef={inputRef}
        loading={loading}
        facilities={facilities}
        facility={facility}
        handleImageSubmit={handleImageSubmit}
        setFacility={setFacility}
        imageData={imageData}
        setImageData={setImageData}
        uploading={uploading}
        setUploading={setUploading}
        imageUploadError={imageUploadError}
      />
    </div>
  );
};

export default DashboardAppPage;
