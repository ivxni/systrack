import styles from "./Form.module.scss";
import Personal from "./personal/Personal";
import Address from "./address/Address";
import EditUser from "./edituser/EditUser";
import CreateOrder from "./createorder/CreateOrder";
import CreateComputer from "./createcomputer/CreateComputer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

library.add(faXmark);

function Form({ label, onClose, userData }) {
  return (
    <div className={styles.Form}>
      <div className={styles.Container}>
        <FontAwesomeIcon className={styles.fa} onClick={onClose} icon="xmark" />
        <h2>{label}</h2>
        {label === "Personal Data" && <Personal />}
        {label === "Address" && <Address />}
        {label === "Create Order" && <CreateOrder />}
        {label === "Create Computer" && <CreateComputer />}
        {label === "Edit User" && (
          <EditUser userData={userData} onClose={onClose} />
        )}
      </div>
    </div>
  );
}

export default Form;
