import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";

export default function MyAccount() {
  const { user } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const res = await API.post(
        "/api/upload-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      const imageUrl = res.data.profile_image;
      setProfileImage(imageUrl);
      localStorage.setItem("profileImage", imageUrl);
  
      alert("Profile image updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error uploading image!");
    }
  };
  
  
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ textAlign: "center" }}>
          <h2 style={styles.title}>👤 Account Information</h2>

          {/* ⭐ Show profile image */}
          {profileImage && (
  <img
  src={`http://localhost:5000${profileImage}`}
  alt="Profile"
  style={{
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    marginBottom: "10px",
    objectFit: "cover",
    border: "2px solid #1b5e20",
  }}
/>

)}



          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
          <p><strong>User ID:</strong> {user.id}</p>

          {/* ⭐ Upload Section */}
          <div style={{ marginTop: "15px" }}>
            <label style={styles.label}>
              📤 Upload Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={styles.fileInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "50px",
  },
  card: {
    width: "500px",
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
  },
  title: {
    color: "#1b5e20",
    marginBottom: "20px",
  },
  profileImg: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #1b5e20",
    marginBottom: "15px",
  },
  label: {
    fontWeight: "600",
    color: "#1b5e20",
    display: "block",
    marginBottom: "5px",
  },
  fileInput: {
    cursor: "pointer",
  },
};
