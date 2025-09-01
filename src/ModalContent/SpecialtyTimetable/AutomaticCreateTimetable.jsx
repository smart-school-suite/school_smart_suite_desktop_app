import TimetableConfig from "./TimetableConfig";
import TimetablePreview from "./TimetablePreview";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function AutomaticCreateTimetable({ handleClose, rowData }) {
    const [isActive, setIsActive] = useState('timetableConfig');

    const handleStateChange = (value) => {
        setIsActive(value);
    };

    const variants = {
        initial: { opacity: 0, x: -100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 100 },
    };

    return (
        <AnimatePresence mode="wait">
            {isActive === 'timetableConfig' && (
                <motion.div
                    key="timetableConfig"
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                >
                    <TimetableConfig 
                        handleStateChange={handleStateChange} 
                        data={rowData} 
                        handleClose={handleClose} 
                    />
                </motion.div>
            )}
            {isActive === 'timetablePreview' && (
                <motion.div
                    key="timetablePreview"
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                >
                    <TimetablePreview 
                        handleStateChange={handleStateChange} 
                        data={rowData} 
                        handleClose={handleClose} 
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default AutomaticCreateTimetable;