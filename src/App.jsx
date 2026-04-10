import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchStudents = () => {
    axios
      .get("http://localhost:8080/students")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Please enter name and email");
      return;
    }

    const newStudent = {
      name,
      email,
    };

    axios
      .post("http://localhost:8080/students", newStudent)
      .then(() => {
        setName("");
        setEmail("");
        fetchStudents();
      })
      .catch((err) => {
        console.error("Error adding student:", err);
      });
  };

  const handleDeleteStudent = (id) => {
    axios
      .delete(`http://localhost:8080/students/${id}`)
      .then(() => {
        fetchStudents();
      })
      .catch((err) => {
        console.error("Error deleting student:", err);
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f7fb",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            margin: 0,
            marginBottom: "10px",
            fontSize: "40px",
            textAlign: "center",
            color: "#1f2d3d",
          }}
        >
          Student Management System
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginBottom: "30px",
          }}
        >
          Manage student records with a simple full-stack interface
        </p>

        <div
          style={{
            backgroundColor: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: "20px",
              fontSize: "24px",
              color: "#374151",
            }}
          >
            Add New Student
          </h2>

          <form onSubmit={handleAddStudent}>
            <div style={{ marginBottom: "14px" }}>
              <input
                type="text"
                placeholder="Enter student name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  fontSize: "16px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <input
                type="email"
                placeholder="Enter student email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  fontSize: "16px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "12px 18px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Add Student
            </button>
          </form>
        </div>

        <div>
          <h2
            style={{
              marginBottom: "18px",
              fontSize: "24px",
              color: "#374151",
            }}
          >
            Student List
          </h2>

          {students.length === 0 ? (
            <p style={{ color: "#6b7280" }}>No students found.</p>
          ) : (
            <div style={{ display: "grid", gap: "12px" }}>
              {students.map((s) => (
                <div
                  key={s.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 16px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "10px",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#111827",
                        marginBottom: "4px",
                      }}
                    >
                      {s.name}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#6b7280",
                      }}
                    >
                      {s.email}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteStudent(s.id)}
                    style={{
                      backgroundColor: "#ef4444",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;