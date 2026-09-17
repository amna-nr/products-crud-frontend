function Input({placeholder, value, onChange}) {
    return (
        <input className="focus:outline-none focus:ring-0 border-b border-gray-500 p-2 m-1"
            placeholder={placeholder}
            value={value}
            onChange={onChange}>
        </input>
    )
}

export default Input;