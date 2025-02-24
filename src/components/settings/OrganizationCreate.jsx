import React, { useState } from "react";

const OrganizationCreate = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token is missing. Please log in.");
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("title", title);
      formData.append("description", description.trim());
      formData.append("email", email.trim());
      formData.append("address", address.trim());

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch("https://localhost:7053/api/Organization/create-organization", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create organization. HTTP Status: ${response.status}. Response: ${errorText}`);
      }

      setMessage("Organization created successfully!");
      setName("");
      setTitle("");
      setDescription("");
      setEmail("");
      setAddress("");
      setImage(null);
    } catch (error) {
      console.error("Error creating organization:", error.message);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-header">
          <h5>Create Organization</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Organization Name */}
            <div className="mb-3">
              <label htmlFor="organizationName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="organizationName"
                placeholder="Enter organization name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Organization Title */}
            <div className="mb-3">
              <label htmlFor="organizationTitle" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="organizationTitle"
                placeholder="Enter organization title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Organization Description */}
            <div className="mb-3">
              <label htmlFor="organizationDescription" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="organizationDescription"
                placeholder="Enter organization description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="organizationEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="organizationEmail"
                placeholder="Enter organization email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Address */}
            <div className="mb-3">
              <label htmlFor="organizationAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="organizationAddress"
                placeholder="Enter organization address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* Organization Image */}
            <div className="mb-3">
              <label htmlFor="organizationImage" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="organizationImage"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {image && (
                <div className="mt-2">
                  <p>Selected File: {image.name}</p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Creating..." : "Create Organization"}
            </button>
          </form>

          {/* Success/Error Message */}
          {message && (
            <div className={`alert mt-3 ${message.startsWith("Error") ? "alert-danger" : "alert-success"}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationCreate;
