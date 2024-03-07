import "./Confirm.css"

const Confirm = ({text, setShowConfirm, handleOk}) => {
    return <div id="bg">
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