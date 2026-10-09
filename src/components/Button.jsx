function Button ({text, onClick, type="button", className=""}) {
    return (
        <button 
        className={`rounded border border-0 text-white p-3 px-4 bg-blue-950 m-1 ${className}`}
        onClick={onClick} 
        type={type}>
            {text}
        </button>
    );
}

export default Button;