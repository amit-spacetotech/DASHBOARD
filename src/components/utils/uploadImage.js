import axios from "axios";

const handleFileUpload = (file) => {
  // const file = event.target.files[0];

  const formData = new FormData();
  formData.append("file", file);

  let url = axios({
    method: "post",
    url: "/adminUser/uploadFile",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
    data: formData, // pass the form data as the request payload
  })
    .then((res) => {
      return res.data.url;
    })
    .catch((err) => {
      return false;
    });
  return url;
};

export default handleFileUpload;
