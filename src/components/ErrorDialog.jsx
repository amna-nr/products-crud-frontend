import Button from "./Button";

function ErrorDialog ({error, onClose, className=""}) {
    return ( 
        <dialog open
        className={`flex flex-col items-end rounded border border-0 shadow-2xl p-4 gap-2 mx-auto z-10 ${className}`}>
            <Button text="X" onClick={onClose} />
            <p className="text-red-600 px-16 p-6 mb-10">{error}</p>
        </dialog>
    )
}

export default ErrorDialog;