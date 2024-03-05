import styles from "./Input.module.scss";

function Input({ placeholder, type, onChange, name, value, disabled }) {
  return (
    <input
      className={styles.Input}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      name={name}
      value={value}
      disabled={disabled}
    />
  );
}

export default Input;
