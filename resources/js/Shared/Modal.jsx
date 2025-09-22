import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

export default function Modal(props) {
    const { id, reset, className, title, children } = props;

    useEffect(() => {
        document.getElementById(id).addEventListener('close', () => {
            if (reset) reset();
        });
    }, []);

    return (
        <dialog id={id} className="modal">
            <div className={`modal-box ${className ? className : ''}`}>
                <form method="dialog">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute
                            right-2 top-2"
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </form>

                <h3 className="font-bold text-lg text-center">{title}</h3>

                {children}
            </div>
        </dialog>
    );
}
