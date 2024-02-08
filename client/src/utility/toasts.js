const commonToastAttributes = {
  position: "bottom-left",
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

export const toastSuccessObject = {
  autoClose: 2000,
  ...commonToastAttributes,
};

export const toastErrorObject = {
  autoClose: 5000,
  ...commonToastAttributes,
};
