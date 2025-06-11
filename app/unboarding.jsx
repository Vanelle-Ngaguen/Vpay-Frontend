import React from 'react';

const Unboarding = () => {
    const navigateToSignup = () => {
        window.location.href = '/signup';
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* Header Section */}
            <header style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <span style={{ fontSize: '24px' }}>←</span>
                </button>
                <h1 style={{ marginLeft: '10px', fontSize: '20px' }}>Unboarding</h1>
            </header>

            {/* Paragraph Section */}
            <section style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '16px', color: '#555' }}>
                Fill in your details to begin your
                journey with VPay.
                </p>
            </section>

            {/* Input Fields Section */}
            <section style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px', position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        style={{
                            width: '100%',
                            padding: '10px 40px',
                            fontSize: '16px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    />
                    <span
                        style={{
                            position: 'absolute',
                            left: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '18px',
                            color: '#888',
                        }}
                    >
                        👤
                    </span>
                </div>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Username"
                        style={{
                            width: '100%',
                            padding: '10px 40px',
                            fontSize: '16px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    />
                    <span
                        style={{
                            position: 'absolute',
                            left: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '18px',
                            color: '#888',
                        }}
                    >
                        🆔
                    </span>
                </div>
            </section>

            {/* Continue Button Section */}
            <section>
                <button
                    onClick={navigateToSignup}
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        color: '#fff',
                        backgroundColor: 'rgba(88, 0, 151, 1)',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Continue
                </button>
            </section>
        </div>
    );
};

export default Unboarding;