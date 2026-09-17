function Button ({text, onClick, type="button"}) {
    return (
        <button 
        className="rounded border border-0 text-white p-3 px-4 bg-blue-950 mt-4" 
        onClick={onClick} 
        type={type}>
            {text}
        </button>
    );
}

export default Button;