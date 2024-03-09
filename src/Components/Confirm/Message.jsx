import { FormattedMessage } from "react-intl";
import "./Message.css";

const Message = ({setShowMessage, handleOk}) => {
    return <div id="bg">
        <div id="fg">
        <div className="card-content">
          <p className="card-heading"><FormattedMessage id="message.ok" /></p>
        </div>
            <button 
            className="button-ok" 
            onClick={()=> {
                handleOk()
                setShowMessage(false)
            }}>Ok</button>
            </div>
    </div>
}

export default Message;