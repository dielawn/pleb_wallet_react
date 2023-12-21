import React, {useState} from "react";
import "./Buttons.css"
import PaymentsModal from "./PaymentsModal"



export const Buttons = () => {
    const [modalState, setModalState] = useState({
        type: "",
        open: false,
    })

    return (
    <div>
      <div className="buttons">
        <button
          className="button"
          onClick={() =>
            setModalState({
              type: "send",
              open: true,
            })
          }
        >
          Send
        </button>
        <button
          className="button"
          onClick={() => {
            
            console.log(`recieve`)
            console.log(`modalState: ${modalState.type}`)
            setModalState({
              type: "receive",
              open: true,
            })
            console.log(`modalState: ${modalState.type}`)
            }            
          }
        >
          Receive
        </button>
      </div>
      <PaymentsModal modalState={modalState} setModalState={setModalState} />
    </div>
  );
};

export default Buttons;