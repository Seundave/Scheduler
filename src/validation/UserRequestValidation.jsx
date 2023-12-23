import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";


export const formSchema = yup.object().shape({
    purpose: yup.string().required("Purpose is required"),
    time: yup.array().required("Time is required"),
    date: yup.date().typeError("A schedule date is required"),

  });

  