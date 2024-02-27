import styles from "./Form.module.scss";
import Personal from "./personal/Personal";
import Address from "./address/Address";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

library.add(faXmark);

function Form({ label, onClose }) {
  return (
    <div className={styles.Form}>
      <div className={styles.Container}>
      <FontAwesomeIcon className={styles.fa} onClick={onClose} icon="xmark" />
      <h2>{label}</h2>
        {label === 'Personal Data' && <Personal/>}
        {label === 'Address' && <Address/>}
      </div>
    </div>
  );
}

export default Form;
