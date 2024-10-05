import React, { useState, useEffect } from "react";
import "./AdminInquiryPage.css";
import { FiEdit, FiArrowRight, FiSearch, FiTrash, FiFileText } from "react-icons/fi";
import axios from "axios";
import jsPDF from "jspdf";

const AdminInquiryPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [reply, setReply] = useState("");
  const [replyIndex, setReplyIndex] = useState(null);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/inquiries/getAll");
        setInquiries(response.data.inquiries);
        setFilteredInquiries(response.data.inquiries);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    };

    fetchInquiries();
  }, []);

  const fetchInquiryById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/inquiries/get/${id}`);
      setSelectedInquiry(response.data.inquiry);
    } catch (error) {
      console.error("Error fetching inquiry by ID:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = inquiries.filter(
      (inquiry) =>
        inquiry.fullName.toLowerCase().includes(query) ||
        inquiry.subject.toLowerCase().includes(query)
    );
    setFilteredInquiries(filtered);
  };

  const handleReply = () => {
    if (!reply || !selectedInquiry || !selectedInquiry._id) return;
    axios.post(`http://localhost:5000/inquiries/addReply/${selectedInquiry._id}`, { reply })
      .then((response) => {
        const updatedInquiry = { ...response.data.inquiry, status: "completed" }; // Set status to completed
        setInquiries(inquiries.map((inquiry) => 
          inquiry._id === selectedInquiry._id ? updatedInquiry : inquiry
        ));
        setFilteredInquiries(filteredInquiries.map((inquiry) => 
          inquiry._id === selectedInquiry._id ? updatedInquiry : inquiry
        ));
        setSelectedInquiry(updatedInquiry); // Update selected inquiry
        setReply("");
        setReplyIndex(null);
      })
      .catch((error) => {
        console.error("Error adding reply to inquiry:", error);
      });
  };
  
  const handleUpdateReply = () => {
    if (replyIndex === null || !reply) return;
    axios
      .post(`http://localhost:5000/inquiries/updateReply/${selectedInquiry._id}`, {
        replyIndex,
        newReply: reply,
      })
      .then((response) => {
        setInquiries(
          inquiries.map((inquiry) =>
            inquiry._id === selectedInquiry._id
              ? response.data.inquiry
              : inquiry
          )
        );
        setSelectedInquiry(response.data.inquiry);
        setReply("");
        setReplyIndex(null);
      })
      .catch((error) => {
        console.error("Error updating reply:", error);
      });
  };

  const handleDeleteReply = (index) => {
    axios.post(`http://localhost:5000/inquiries/deleteReply/${selectedInquiry._id}`, {
      reply: selectedInquiry.replies[index],
    })
      .then((response) => {
        const updatedInquiry = {
          ...response.data.inquiry,
          replies: response.data.inquiry.replies.filter((_, i) => i !== index),
          status: response.data.inquiry.replies.length > 1 ? "completed" : "pending"
        };
        setInquiries(inquiries.map((inquiry) => 
          inquiry._id === selectedInquiry._id ? updatedInquiry : inquiry
        ));
        setFilteredInquiries(filteredInquiries.map((inquiry) => 
          inquiry._id === selectedInquiry._id ? updatedInquiry : inquiry
        ));
        setSelectedInquiry(updatedInquiry);
        setReply("");
        setReplyIndex(null);
      })
      .catch((error) => {
        console.error("Error deleting reply:", error);
      });
  };
  

  const generateReport = () => {
    if (!selectedInquiry) return;

    const doc = new jsPDF("p", "pt", "a4");
    doc.setFontSize(12);

    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth() - margin * 2;
    const lineHeight = 14;
    const spaceBetweenFields = 10;
    let currentY = margin;

    doc.text(`Inquiry Details Report`, margin, currentY);
    currentY += lineHeight * 2;

    const addBoldText = (text, y) => {
      doc.setFont("helvetica", "bold");
      doc.text(text, margin, y);
      doc.setFont("helvetica", "normal");
    };

    const fields = [
      { label: 'Name:', value: selectedInquiry.fullName },
      { label: 'Email:', value: selectedInquiry.email },
      { label: 'Phone:', value: selectedInquiry.phone },
      { label: 'Subject:', value: selectedInquiry.subject },
      { label: 'Message:', value: selectedInquiry.message },
    ];

    fields.forEach(({ label, value }) => {
      addBoldText(label, currentY);
      const labelWidth = doc.getTextDimensions(label).w + 10;

      const splitText = doc.splitTextToSize(value, pageWidth - margin - labelWidth);
      
      splitText.forEach((line, index) => {
        if (currentY + lineHeight > doc.internal.pageSize.height - margin) {
          doc.addPage();
          currentY = margin;
        }
        doc.text(line, margin + labelWidth, currentY);
        currentY += lineHeight;
      });

      currentY += spaceBetweenFields;
    });

    addBoldText("Reply:", currentY);
    currentY += lineHeight;

    if (selectedInquiry.replies.length > 0) {
      selectedInquiry.replies.forEach((reply) => {
        const splitReply = doc.splitTextToSize(reply, pageWidth - margin);

        splitReply.forEach((line) => {
          if (currentY + lineHeight > doc.internal.pageSize.height - margin) {
            doc.addPage();
            currentY = margin;
          }
          doc.text(line, margin, currentY);
          currentY += lineHeight;
        });

        currentY += spaceBetweenFields;
      });
    } else {
      doc.text("No replies available.", margin, currentY);
    }

    const userName = selectedInquiry.fullName.replace(/[^a-zA-Z0-9]/g, " ");
    doc.save(`${userName} Inquiry Report.pdf`);
  };

  return (
    <>
      <h2 style={{ color: '#744ecd', textAlign: 'left', marginLeft: '153px' }}>Inquiry Management</h2>
      <div className="admin-container">
        <div className="inquiry-list">
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Search by name or subject..."
              className="search-bar"
              value={searchQuery}
              onChange={handleSearch}
            />
            <div className="search-icon-container">
              <FiSearch className="search-icon" />
            </div>
          </div>
          {filteredInquiries.length === 0 ? (
            <p className="no-inquiries-message">No inquiries found</p>
          ) : (
            filteredInquiries.map((inquiry) => (
              <div
                key={inquiry._id}
                className={`inquiry-item ${
                  selectedInquiry && selectedInquiry._id === inquiry._id
                    ? "active"
                    : ""
                }`}
              >
                <div className="inquiry-profile">
                  <img
                    src={inquiry.profilePic}
                    alt="Profile"
                    className="profile-img"
                  />
                  <div className="inquiry-info">
                    <h3>{inquiry.fullName}</h3>
                    <p>{inquiry.subject}</p>
                    <span className={`inquiry-status ${inquiry.status === "completed" ? "completed" : "pending"}`}>
  <strong>{inquiry.status === "completed" ? "Completed" : "Pending"}</strong>
</span>

                    <span className="inquiry-date">
                      {new Date(inquiry.Date).toLocaleDateString("en-CA", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
                <div className="arrow-icon-container">
                  <FiArrowRight
                    className="view-icon"
                    title="View inquiry details"
                    onClick={(e) => {
                      e.stopPropagation();
                      fetchInquiryById(inquiry._id);
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="content-area">
          {selectedInquiry ? (
            <>
              <div className="inquiry-header">
                <img
                  src={selectedInquiry.profilePic}
                  alt="Profile"
                  className="selected-profile-img"
                />
                <div className="inquiry-header-info">
                  <h3>{selectedInquiry.fullName}</h3>
                  <p>Email: {selectedInquiry.email}</p>
                  <p>Phone: {selectedInquiry.phone}</p>
                </div>
              </div>

              <h4>Subject: {selectedInquiry.subject}</h4>
              <p>Message: {selectedInquiry.message}</p>

              <div className="replies">
                {selectedInquiry.replies.length > 0 && (
                  <>
                    <h5>Reply:</h5>
                    {selectedInquiry.replies.map((rep, index) => (
                      <div key={index} className="reply-message">
                        <p>{rep}</p>
                        <div className="reply-icons">
                          <FiEdit
                            className="edit-icon"
                            onClick={() => {
                              setReply(rep);
                              setReplyIndex(index);
                            }}
                            title="Edit reply"
                          />
                          <FiTrash
                            className="delete-icon"
                            onClick={() => handleDeleteReply(index)}
                            title="Delete reply"
                          />
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {replyIndex !== null || selectedInquiry.replies.length === 0 ? (
                <div className="reply-area">
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type your response here..."
                  />
                  <div className="action-buttons">
                    <button
                      className="discard-btn"
                      onClick={() => {
                        setReply("");
                        setReplyIndex(null);
                      }}
                    >
                      Discard
                    </button>
                    <button
                      className="reply-btn"
                      onClick={() => {
                        if (replyIndex !== null) {
                          handleUpdateReply();
                        } else {
                          handleReply();
                        }
                        setReply("");
                        setReplyIndex(null);
                      }}
                    >
                      {replyIndex !== null ? "Update" : "Reply"}
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="generate-report-container">
                <button className="generate-report-btn" onClick={generateReport}>
                  <FiFileText className="pdf-icon" />
                  Generate Report
                </button>
              </div>
            </>
          ) : (
            <p>Please select an inquiry to view details.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminInquiryPage;
