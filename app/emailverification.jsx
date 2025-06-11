import React, { useState } from "react";
import emailverficon from "../assets/images/emailverf.jpg"; // Adjust the path as necessary

const EmailVerification = () => {
    const [code, setCode] = useState(new Array(5).fill(""));

    const handleChange = (value, index) => {
        if (isNaN(value)) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Move to the next input box
        if (value && index < 4) {
            document.getElementById(`code-input-${index + 1}`).focus();
        }
    };

    const handleVerify = () => {
        alert(`Verification code entered: ${code.join("")}`);
        window.location.href = "/login"; // Redirect to the login page
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            {/* Section 1: Logo */}
            <div>
                <img
                    src={emailverficon}
                    alt="Logo"
                    style={{ width: "100px", marginBottom: "20px" }}
                />
            </div>

            {/* Section 2: Email Sent Message */}
            <div>
                <p>An email has been sent to your email address. Please enter the code below to verify your email.</p>
            </div>

            {/* Section 3: Input Boxes */}
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "20px 0" }}>
                {code.map((digit, index) => (
                    <input
                        key={index}
                        id={`code-input-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, index)}
                        style={{
                            width: "40px",
                            height: "40px",
                            textAlign: "center",
                            fontSize: "18px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                        }}
                    />
                ))}
            </div>

            {/* Section 4: Didn't Receive Code */}
            <div>
                <p>
                    Didn't receive the code?{" "}
                    <a
                        href="/resend-code"
                        style={{ color: "rgba(88, 0, 151, 1)" }}
                    >
                        Resend Code
                    </a>
                </p>
            </div>

            {/* Section 5: Verify Button */}
            <div>
                <button
                    onClick={handleVerify}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "rgba(88, 0, 151, 1)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Verify
                </button>
            </div>
        </div>
    );
};

export default EmailVerification;