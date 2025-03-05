import React, { useState, useEffect } from "react";
import { db } from "../../utilities/firebaseConfig";
import { collection, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";

const BottleCaseAssignment = () => {
  const [productOptions, setProductOptions] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [editOption, setEditOption] = useState(null);
  const [bottlesPerCase, setBottlesPerCase] = useState("");

  useEffect(() => {
    const fetchProductOptions = async () => {
      try {
        const optionsSnapshot = await getDocs(collection(db, "Product"));
        const optionsMap = new Map();

        optionsSnapshot.docs.forEach((doc) => {
          const productData = doc.data();
          if (productData.productOptions) {
            productData.productOptions.forEach((option) => {
              if (!optionsMap.has(option.name)) {
                optionsMap.set(option.name, { name: option.name });
              }
            });
          }
        });
        setProductOptions(Array.from(optionsMap.values()));
      } catch (error) {
        console.error("Error fetching product options:", error);
      }
    };

    const fetchAssignments = async () => {
      try {
        const assignmentsSnapshot = await getDocs(collection(db, "BottleCaseAssignments"));
        const assignmentsData = {};
        assignmentsSnapshot.docs.forEach((doc) => {
          const data = doc.data();
          assignmentsData[data.optionName] = data.bottlesPerCase;
        });
        setAssignments(assignmentsData);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchProductOptions();
    fetchAssignments();
  }, []);

  const handleAssign = async (optionName) => {
    if (!bottlesPerCase || isNaN(bottlesPerCase) || Number(bottlesPerCase) <= 0) {
      alert("Please enter a valid number of bottles per case.");
      return;
    }

    try {
      const assignmentDocRef = doc(db, "BottleCaseAssignments", optionName);
      await setDoc(assignmentDocRef, {
        optionName,
        bottlesPerCase: Number(bottlesPerCase),
      });
      setAssignments((prev) => ({
        ...prev,
        [optionName]: Number(bottlesPerCase),
      }));
      setBottlesPerCase("");
      setEditOption(null);
      alert(`Assigned ${bottlesPerCase} bottles per case to ${optionName}`);
    } catch (error) {
      console.error("Error assigning bottles per case:", error);
      alert("Failed to assign bottles per case.");
    }
  };

  const handleEdit = (optionName) => {
    setEditOption(optionName);
    setBottlesPerCase(assignments[optionName] || "");
  };

  const handleDelete = async (optionName) => {
    if (window.confirm(`Are you sure you want to delete the assignment for ${optionName}?`)) {
      try {
        await deleteDoc(doc(db, "BottleCaseAssignments", optionName));
        setAssignments((prev) => {
          const newAssignments = { ...prev };
          delete newAssignments[optionName];
          return newAssignments;
        });
        alert(`Assignment for ${optionName} deleted.`);
      } catch (error) {
        console.error("Error deleting assignment:", error);
        alert("Failed to delete assignment.");
      }
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <style>
        {`
          .table-header {
            padding: 10px;
            border-bottom: 2px solid #000;
            background-color: #f1f1f1;
            text-align: left;
            font-weight: bold;
            color: black;
          }
          .table-cell {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            text-align: left;
          }
          .action-btn {
            padding: 5px 10px;
            margin: 0 5px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 12px;
          }
          .edit-btn {
            background-color: #ffc107;
            color: white;
          }
          .delete-btn {
            background-color: #dc3545;
            color: white;
          }
          .save-btn {
            background-color: #28a745;
            color: white;
          }
          .input-field {
            padding: 5px;
            width: 80px;
            margin-right: 10px;
            border: 1px solid #ddd;
            border-radius: 3px;
          }
          .assigned-value {
            color: #28a745;
            font-weight: bold;
          }
        `}
      </style>

      <h2 style={{ marginBottom: "15px" }}>Bottle Case Assignment</h2>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff" }}>
          <thead>
            <tr>
              <th className="table-header">Product Option</th>
              <th className="table-header">Bottles Per Case</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productOptions.map((option) => (
              <tr key={option.name}>
                <td className="table-cell">{option.name}</td>
                <td className="table-cell">
                  {editOption === option.name ? (
                    <input
                      type="number"
                      className="input-field"
                      value={bottlesPerCase}
                      onChange={(e) => setBottlesPerCase(e.target.value)}
                      min="1"
                      placeholder="Enter bottles per case"
                    />
                  ) : (
                    <span className={assignments[option.name] ? "assigned-value" : ""}>
                      {assignments[option.name] ? `${assignments[option.name]} bottles` : "Not Assigned"}
                    </span>
                  )}
                </td>
                <td className="table-cell">
                  {editOption === option.name ? (
                    <button
                      className="action-btn save-btn"
                      onClick={() => handleAssign(option.name)}
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(option.name)}
                      >
                        Edit
                      </button>
                      {assignments[option.name] && (
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(option.name)}
                        >
                          Delete
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BottleCaseAssignment;