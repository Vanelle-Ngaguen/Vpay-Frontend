import React, { useState } from "react";

const IDVerification = () => {
    const [idUploaded, setIdUploaded] = useState(false);
    const [faceCaptured, setFaceCaptured] = useState(false);

    const handleIDScan = () => {
        // Logic for real-time ID scan
        setIdUploaded(true);
    };

    const handleIDUpload = () => {
        // Logic for uploading ID
        setIdUploaded(true);
    };

    const handleFaceCapture = () => {
        // Logic for real-time face capture
        setFaceCaptured(true);
    };

    const handleSubmit = () => {
        // Logic for submitting verification
        if (idUploaded && faceCaptured) {
            alert("Verification submitted successfully!");
        } else {
            alert("Please complete all steps before submitting.");
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>KYC Verification</h1>
            <p>
                Please complete the following steps to verify your identity. This
                process ensures the security of your account.
            </p>

            <div style={{ margin: "20px 0" }}>
                <h2>Step 1: ID Verification</h2>
                <button
                    onClick={() => {
                        alert("Scanning front of ID...");
                        handleIDScan();
                    }}
                    style={{
                        display: "block",
                        margin: "10px 0",
                        padding: "10px",
                        border: "2px dotted #000",
                        background: "none",
                        cursor: "pointer",
                    }}
                >
                    Scan Front of ID
                </button>
                <button
                    onClick={() => {
                        alert("Scanning back of ID...");
                        handleIDScan();
                    }}
                    style={{
                        display: "block",
                        margin: "10px 0",
                        padding: "10px",
                        border: "2px dotted #000",
                        background: "none",
                        cursor: "pointer",
                    }}
                >
                    Scan Back of ID
                </button>
                <button
                        onClick={() => {
                            alert("Uploading ID...");
                        }}
                        style={{
                            display: "block",
                            margin: "10px 0",
                            padding: "10px",
                            border: "2px dotted #000",
                            background: "none",
                            cursor: "pointer",
                        }}
                    >
                        Upload ID
                    </button>
                    <input
                        type="file"
                        onChange={(e) => {
                            if (e.target.files.length > 0) {
                                alert(`Uploading file: ${e.target.files[0].name}`);
                                handleIDUpload();
                            }
                        }}
                        style={{
                            display: "block",
                            margin: "10px 0",
                            padding: "10px",
                            border: "2px dotted #000",
                            background: "none",
                            cursor: "pointer",
                        }}
                    />

                    <div style={{ margin: "20px 0" }}>
                        <h2>Step 2: Face Verification</h2>
                        <button
                            onClick={() => {
                        alert("Performing real-time face capture...");
                        handleFaceCapture();
                    }}
                    style={{
                        display: "block",
                        margin: "10px 0",
                        padding: "10px",
                        border: "2px dotted #000",
                        background: "none",
                        cursor: "pointer",
                    }}
                >
                    Perform Real-Time Face Capture
                </button>
            </div>

            <div style={{ margin: "20px 0" }}>
                <button
                    onClick={handleSubmit}
                    style={{
                        display: "block",
                        margin: "10px 0",
                        padding: "10px",
                        border: "2px dotted #000",
                        background: "none",
                        cursor: "pointer",
                    }}
                >
                    Submit Verification
                </button>
            </div>
        </div>
    </div>
    );
};

export default IDVerification;