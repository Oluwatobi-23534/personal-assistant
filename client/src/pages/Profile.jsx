import { useSelector } from "react-redux";

const Profile = () => {
  const {currentUser} = useSelector((state) => state.user);

  return (
    <div className="p-20  max-w-lg mx-auto">
      <h1 className="text-white text-3xl text-center">Profile</h1>
      <form className="gap-4 flex flex-col">
        <img
          src={currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 cursor-pointer rounded-full object-cover mt-4 self-center "
        />
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
        <button className="bg-blue-900 text-white rounded-lg uppercase hover:text-opacity-95 disabled:opacity-85">Update</button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-800 cursor-pointer"> Delete Account</span>
        <span className="text-red-800 cursor-pointer"> Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
