const Button = ({ children, onClick, type = "button", className = "" }) => { 
    return (
        <button type={type} className={className} onClick={onClick}>
            { children }
        </button>
    );
}

export default Button;