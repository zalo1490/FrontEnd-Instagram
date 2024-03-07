import { FormattedMessage } from "react-intl";
import "./Confirm.css";

const Confirm = ({ setShowConfirm, handleOk }) => {
  return (
    <div id="bg">
      <div id="fg">
        <div class="card-content">
          <p class="card-heading"><FormattedMessage id="post.deletePost" /></p>
          <p class="card-description"><FormattedMessage id="deleteDescription" /></p>
        </div>
        <div class="card-button-wrapper">
          <button
            class="card-button primary"
            onClick={() => {
              handleOk();
              setShowConfirm(false);
            }}
          >
            <FormattedMessage id="delete" />
          </button>
          <button
            class="card-button secondary"
            onClick={() => {
              setShowConfirm(false);
            }}
          >
             <FormattedMessage id="cancel" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;

/*
ORIGINAL 
const Confirm = ({text, setShowConfirm, handleOk}) => {
    return <div id="bg">
        <div class="card"></div>
        <div id="fg">
            {text}
            <button name="si" onClick={()=>{
                // peticiqon a la API
                handleOk()
                setShowConfirm(false)
            }}>Si</button>
            <button name="no" onClick={()=>{
                setShowConfirm(false)
            }}>No</button>
            </div>
    </div>
}

export default Confirm

*/
