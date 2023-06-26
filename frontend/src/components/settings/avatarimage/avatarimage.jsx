import { useState } from "react";
import { patchUserById } from "../../../utils/apiUser";
import {
  setUserSession,
  getUserToken,
} from "../../../utils/localStorage.utils";
import styles from "./avatarimage.module.css";
import axios from "axios";
import { CLOUDINARY_ID, CLOUDINARY_UPLOAD_PRESET } from "../../../route-path";

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
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_ID}/image/upload`,
        formData
      );
      console.log(response);
      if (response.status === 200) {
        const imgUrl = response.data.url;
        const resFromUserPatch = await patchUserById(userId, {
          profilepic: imgUrl,
        });
        if (resFromUserPatch.status !== 200) {
          console.log(
            "resFromUserPatch, somethingWent wrong:",
            resFromUserPatch
          );
          alert("something went updating your profile");
        } else {
          console.log("resFromUserPatch everythingok:", resFromUserPatch);
          const token = getUserToken();
          setUserSessionContext({ ...userSessionContext, profilepic: imgUrl });
          setUserSession({
            user: { ...userSessionContext, profilepic: imgUrl },
            token: token,
          });
          setButtonState(false);
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
              setPreviewImage(profilepic);
              setButtonState(false);
            }}
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
