import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import ClipLoader from 'react-spinners/ClipLoader'; // Import the spinner
import { updateUserFailure, updateUserStart, updateUserSuccess,deleteUserStart,deleteUserFailure,deleteUserSuccess,signOut } from '../redux/user/userSlice';

export default function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePrecent, setImagePrecent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const { currentUser,newLoading,error } = useSelector((state) => state.user);
  const [updateSuccess,setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

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

    setLoading(true); // Start loading

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePrecent(Math.round(progress));
      },
      (error) => { // Error callback
        console.error("Error uploading image:", error);
        setImageError(true);
        setLoading(false); // Stop loading on error
      },
      () => { // Completion callback
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData(prevFormData => ({ ...prevFormData, profilePicture: downloadURL }));
          setLoading(false); // Stop loading on success
        });
      }
    );
  };

  const handleChange = (e) =>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:"POST",
        headers: {
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data = await res.json();
      if(data.success===false){
        dispatch(updateUserFailure(data))
        return
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    }catch(error){
      dispatch(updateUserFailure(error))
    }
  }

  const handleDeleteAccount = async()=>{
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE'
      }); 
      const data = await res.json();
      if(data.success===false){
        dispatch(deleteUserFailure(data))
        return;
      }
      dispatch(deleteUserSuccess(data))
      
    } catch (error) {
      dispatch(deleteUserFailure(data))
    }
  }
  const handleSignOut =async ()=>{
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h2 className="text-3xl font-semibold text-center my-7">Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <img
          src={formData.profilePicture ||currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {loading ? (
            <ClipLoader color={"#000"} loading={loading} size={35} /> // Show loading spinner
          ) : imageError ? (
            <span className="text-red-700">Error Uploading Image</span>
          ) : imagePrecent > 0 && imagePrecent < 100 ? (
            <span className="text-blue-700">{`Uploading: ${imagePrecent}%`}</span>
          ) : imagePrecent === 100 ? (
            <span className="text-green-700">Image Upload Successfully</span>
          ) : (
            ''
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading?'Loading...':'Update'}</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={handleDeleteAccount}>Delete Account</span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignOut}>Sign Out</span>
      </div>
      <p className="text-red-700 mt-5 ">{error&&"Something Went Wrong!.."}</p>
      <p className="text-green-700 mt-5 ">{updateSuccess&&"User is updated successufully!.."}</p>
    </div>
  );
}
