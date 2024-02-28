import styles from "./Input.module.scss";

function Input({ placeholder, type, onChange, name, value }) {
  return (
    <input
      className={styles}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      name={name}
      value={value}
    />
  );
}

export default Input;
