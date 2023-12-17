import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const validFileExtensions = { image: ["jpg"] };

function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
}

const MAX_FILE_SIZE = 1024000;

export const createScheduler = yup.object().shape({
  // photo: yup
  //   .mixed()
  //   .required("Required")
  //   .test("is-valid-type", "Not a valid image type", (value) =>
  //     isValidFileType(value && value.name.toLowerCase(), "image")
  //   )
  //   .test(
  //     "is-valid-size",
  //     "Max allowed size is 100KB",
  //     (value) => value && value.size <= MAX_FILE_SIZE
  //   ),
  lectureTheatre: yup.string().required("Lecture Theatre is required"),
  location: yup.string().required("Location is required"),
  capacity: yup.string().required("Capacity is required"),
  facilites: yup
    .array()
    .min(1, "Please select at least one facility."),
  description: yup.string().required("Description is required"),
});
