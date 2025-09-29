
import type { JSX } from 'react/jsx-dev-runtime';
import './Modal.css';

interface ModalProps {
    content: JSX.Element
    toggleModal: () => void;
}

export const Modal:React.FC<ModalProps> = ({toggleModal, content}) => {
    return (
        <div className="modal-bg">
            <div className="modal">
                {content}
                <button onClick={toggleModal}>Close</button>
            </div>
        </div>
    )
}
