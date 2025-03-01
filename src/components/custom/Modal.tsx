import { X } from 'lucide-react';
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <div className="bg-white p-6 rounded shadow-md w-96 relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 m-2"
                    onClick={onClose}
                >
                    <X fill='currentColor' className="w-6 h-6 " />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
