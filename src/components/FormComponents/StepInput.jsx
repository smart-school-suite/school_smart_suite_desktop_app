import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
const OtpInput = ({ length = 6, onComplete, value: initialValue = '' }) => {
      const darkMode = useSelector((state) => state.theme.darkMode);
    const [otp, setOtp] = useState(Array(length).fill(''));
    const inputRefs = useRef([]);

    useEffect(() => {
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

        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        if (newOtp.every(digit => digit !== '')) {
            onComplete?.(newOtp.join(''));
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            e.preventDefault();
            const newOtp = [...otp];
            newOtp[index - 1] = ''; 
            setOtp(newOtp);
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').trim();

        const truncatedPasteData = pasteData.substring(0, length);

        if (!/^\d*$/.test(truncatedPasteData)) {
            return;
        }

        const newOtp = Array(length).fill('');
        for (let i = 0; i < truncatedPasteData.length; i++) {
            newOtp[i] = truncatedPasteData[i];
        }
        setOtp(newOtp);

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
                    type="tel" 
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className={`otp-input-field ${darkMode ? "dark" : null}`}
                    aria-label={`OTP digit ${index + 1}`}
                    autoComplete="off" 
                />
            ))}
        </div>
    );
};

export default OtpInput;