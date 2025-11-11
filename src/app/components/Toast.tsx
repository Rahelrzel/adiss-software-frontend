import { toast, type ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AxiosError } from "axios";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const getErrorMessage = (error: string | AxiosError | undefined): string => {
  if (!error) return "Something went wrong";
  if (typeof error === "string") return error;

  return (
    (error.response?.data as { message?: string })?.message ||
    error.message ||
    "Something went wrong"
  );
};

export const showErrorToast = (error: string | AxiosError | undefined) => {
  toast.error(getErrorMessage(error), defaultOptions);
};

export const showSuccessToast = (message: string) => {
  toast.success(message, defaultOptions);
};
