import React from "react";
import { useAuth } from "../../context/useAuth";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>My Profile</h1>

      <div style={styles.card}>
        <p>
          <strong>Username:</strong> {user?.username}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Role:</strong> {user?.role}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
  },
  header: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  card: {
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f5f5f5",
    width: "300px",
    border: "1px solid #ddd",
  },
};

export default ProfilePage;
