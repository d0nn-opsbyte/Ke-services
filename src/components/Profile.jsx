import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "./BackButton";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);

  // Convert file to Base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleUpdate = async (e) => {
    e.preventDefault();

    let profilePic = user.profilePic;
    if (selectedFile) {
      profilePic = await fileToBase64(selectedFile);
    }

    const updatedUser = {
      ...user,
      name: e.target.name.value,
      email: e.target.email.value,
      profilePic: profilePic,
    };

    fetch(`http://localhost:3001/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        alert("Profile updated successfully!");
      });
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <BackButton />
      <div className="content">
        <h1>My Profile</h1>

        <div className="profile-card">
          <img
            src={user.profilePic || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-pic"
          />
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>Role: {user.role}</p>
          </div>
        </div>

        <form className="profile-form" onSubmit={handleUpdate}>
          <h3>Update Profile</h3>
          <input type="text" name="name" defaultValue={user.name} required />
          <input type="email" name="email" defaultValue={user.email} required />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <button type="submit">Save Changes</button>
        </form>
       </div>
      </div>
  );
}

export default Profile;