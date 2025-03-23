import { ToastContainerProps } from "react-toastify";

export const toastConfig: ToastContainerProps = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "light",
  closeButton: false,
  style: {
    fontSize: "1.3rem",
    padding: "2rem",
    lineHeight: "2rem",
    fontFamily: "arial, sans-serif",
  },
};
