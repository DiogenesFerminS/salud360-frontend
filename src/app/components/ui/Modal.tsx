"use client"
import ReactModal from "react-modal";

if (typeof window !== 'undefined') {
   ReactModal.setAppElement(document.body);
}

interface ModalProps extends Partial<ReactModal> {
  isOpen: boolean;
  children: React.ReactNode;
}

export const Modal = ({isOpen, children} : ModalProps)=>{

    const customStyles: ReactModal.Styles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000
        },
            content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '500px',
            width: '90%',
            padding: '20px',
            borderRadius: '8px',
            border: 'none',
            background: '#f9fafb'
            },
        };
    
    return (
        <ReactModal
            isOpen={isOpen}
            style={customStyles}
        >
            {children}

        </ReactModal>
    )

}