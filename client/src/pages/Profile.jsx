import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
      },
      (error) => {
        setImagePercentage(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  return (
    <div className="p-20  max-w-lg mx-auto">
      <h1 className="text-white text-3xl text-center">Profile</h1>
      <form className="gap-4 flex flex-col">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 cursor-pointer rounded-full object-cover mt-4 self-center "
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-500">
              Error uploading image (File size must be less than 2mb)
            </span>
          ) : imagePercentage > 0 && imagePercentage < 100 ? (
            <span className="text-blue-500">{`Uploading:  ${imagePercentage} %`}</span>
          ) : imagePercentage === 100 ? (
            <span className="text-green-500">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-200 text-blue-800"
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-200 text-blue-800"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-200"
        />
        <button className="bg-blue-900 text-white rounded-lg uppercase hover:text-opacity-95 disabled:opacity-85">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-800 cursor-pointer"> Delete Account</span>
        <span className="text-red-800 cursor-pointer"> Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
