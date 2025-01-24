import React from 'react';

const Modal = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md w-80">
                <h3 className="text-lg font-semibold">Success!</h3>
                <p>{message}</p>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
