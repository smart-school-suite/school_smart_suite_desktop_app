import { motion } from "framer-motion";

function Switch({ checked, onChange, disabled, ...props }) {
  return (
    <div className="form-check form-switch p-0 m-0 d-inline-flex align-items-center position-relative">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="position-absolute w-100 h-100 opacity-0 m-0 border"
        style={{ cursor: disabled ? "not-allowed" : "pointer", zIndex: 2 }}
        {...props}
      />
      <motion.div
        className={`d-inline-flex align-items-center rounded-pill p-0.5 ${
          checked ? "bg-primary-500" : "bg-iron-300"
        }`}
        style={{ width: "2.75rem", height: "1.5rem" }}
      >
        <motion.div
          className="bg-white rounded-circle shadow-sm"
          style={{ width: "1.25rem", height: "1.25rem" }}
          animate={{ x: checked ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.div>
    </div>
  );
}

export default Switch;