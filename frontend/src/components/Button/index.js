

function Button({ name, disabled, isFormElement = false, onClick = false }) {
    return (
        <button
            type={isFormElement ? "submit" : "button"}
            onClick={isFormElement ? null : onClick}
            disabled={disabled}
        >
            {name}
        </button>
    )
}

export default Button;
