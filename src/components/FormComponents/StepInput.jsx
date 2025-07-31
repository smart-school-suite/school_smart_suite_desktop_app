import React, { useState, useRef, useEffect } from 'react';
const OtpInput = ({ length = 6, onComplete, value: initialValue = '' }) => {
    const [otp, setOtp] = useState(Array(length).fill(''));
    const inputRefs = useRef([]);

    useEffect(() => {
        // Initialize OTP if an initial value is provided
        if (initialValue && initialValue.length <= length) {
            setOtp(initialValue.split(''));
        }
    }, [initialValue, length]);

    const handleChange = (e, index) => {
        const value = e.target.value;

        // Allow only single digit numbers
        if (!/^\d*$/.test(value)) {
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus to the next input if a digit is entered
        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // Call onComplete when all digits are filled
        if (newOtp.every(digit => digit !== '')) {
            onComplete?.(newOtp.join(''));
        }
    };

    const handleKeyDown = (e, index) => {
        // Backspace functionality
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            e.preventDefault(); // Prevent default backspace behavior (e.g., navigating back in browser)
            const newOtp = [...otp];
            newOtp[index - 1] = ''; // Clear the previous input
            setOtp(newOtp);
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').trim();

        // If pasted data is longer than the OTP length, truncate it
        const truncatedPasteData = pasteData.substring(0, length);

        // Check if all characters in pasted data are digits
        if (!/^\d*$/.test(truncatedPasteData)) {
            return;
        }

        const newOtp = Array(length).fill('');
        for (let i = 0; i < truncatedPasteData.length; i++) {
            newOtp[i] = truncatedPasteData[i];
        }
        setOtp(newOtp);

        // Move focus to the last filled input or the last input
        const lastFilledIndex = Math.min(truncatedPasteData.length - 1, length - 1);
        inputRefs.current[lastFilledIndex]?.focus();

        if (truncatedPasteData.length === length) {
            onComplete?.(newOtp.join(''));
        }
    };

    return (
        <div className="otp-input-container">
            {otp.map((digit, index) => (
                <input
                    key={index}
                    type="tel" // Use "tel" for numeric keypad on mobile
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="otp-input-field"
                    aria-label={`OTP digit ${index + 1}`}
                    autoComplete="off" // Prevent browser auto-fill
                />
            ))}
        </div>
    );
};

export default OtpInput;