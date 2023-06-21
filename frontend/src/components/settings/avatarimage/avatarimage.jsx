import { useState } from "react";
import { patchUserById } from "../../../utils/apiUser";
import { setUserSession } from "../../../utils/localStorage.utils";
import styles from "./avatarimage.module.css";
import axios from "axios";

const AvatarImage = ({ userSessionContext, setUserSessionContext }) => {
  const { id: userId, profilepic } = userSessionContext;
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(profilepic);
  const [buttonState, setButtonState] = useState(false);

  const handleImageUpload = async () => {
    if (!selectedImage) {
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "mzhflh8v"); // Replace with your upload preset name

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/djcaqznth/image/upload",
        formData
      );
      if (response.statusText === "OK") {
        const imgUrl = response.data.url;
        const resFromUserPatch = await patchUserById(userId, {
          profilepic: imgUrl,
        });
        if (resFromUserPatch.statusText !== "OK") {
          alert("something went wrong");
        } else {
          setUserSessionContext({ ...userSessionContext, profilepic: imgUrl });
          setUserSession({ ...userSessionContext, profilepic: imgUrl });
          setButtonState(false)
        }
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.log("Error uploading image: ", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
    setButtonState(true);
  };

  return (
    <div className={styles.avatarImageContainer}>
      <img id="exampleimg" src={previewImage} className={styles.avatarImage} />
      <div className={styles.wrapper}>
        {!buttonState ? (
          <label htmlFor="avatarUpload" className={styles.inputLabel}>
            <input
              id="avatarUpload"
              type="file"
              onChange={handleFileChange}
              className={styles.avatarInput}
            />
            Change profile picture
          </label>
        ) : (
          <button
            className={styles.inputLabel}
            onClick={() => {
                setPreviewImage(profilepic)
                setButtonState(false)}}
          >
            Cancel
          </button>
        )}
        {buttonState && (
          <button onClick={handleImageUpload} className={styles.avatarButton}>
            Upload
          </button>
        )}
      </div>
    </div>
  );
};

export default AvatarImage;