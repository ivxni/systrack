import styles from "./Button.module.scss";

function Button({ variant, label, type, onClick }) {
  let buttonClass = "";

  if (variant === "primary") {
    buttonClass = styles.Primary;
  } else if (variant === "secondary") {
    buttonClass = styles.Secondary;
  }
  return <button className={buttonClass} type={type} onClick={onClick}>{label}</button>;
}

export default Button;
