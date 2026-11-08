function Button ({text, onClick, type="button", className=""}) {
    return (
        <button 
        className={`rounded-4xl border border-0 text-white p-2 px-4 bg-blue-950 hover:bg-blue-900 transition-colors duration-200 m-1${className}`}
        onClick={onClick} 
        type={type}>
            {text}
        </button>
    );
}

export default Button;