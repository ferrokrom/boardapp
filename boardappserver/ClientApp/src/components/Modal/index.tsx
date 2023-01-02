import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import React, { ReactElement } from "react";

type ModalProps = {
  children: ReactElement;
  open: boolean;
  width?: string;
  onClose: () => void;
};
function Modal({ children, open, onClose, width }: ModalProps) {
  if (!open) return null;
  const container = document.getElementById("portal");
  if (!container) return null; // or throw new Error('Container element not found');
  function addPropsToReactElement(element: ReactElement, props: any) {
    if (React.isValidElement(element)) {
      return React.cloneElement(element, props);
    }
    return element;
  }

  function addPropsToChildren(children: ReactElement, props: any) {
    if (!Array.isArray(children)) {
      return addPropsToReactElement(children, props);
    }
    return children.map((childElement) =>
      addPropsToReactElement(childElement, props)
    );
  }
  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-30 ${width} 	`}
      style={{
        overflow: "auto",
        backgroundColor: "rgb(0,0,0,0.6)",
      }}
    >
      <div
        className="fixed left-1/3 top-32 p-4 z-40  text-4xl  bg-slate-100 rounded-lg "
        style={{ width: "900px" }}
      >
        <div className="flex flex-start absolute right-5 top-3 right-3 z-999999 bg-plate-500">
          <FaTimes className="text-lg" onClick={onClose} />
        </div>

        {addPropsToChildren(children, { onClose })}
      </div>
    </div>,
    container
  );
}

export default Modal;
