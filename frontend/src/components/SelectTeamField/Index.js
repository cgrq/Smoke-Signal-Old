import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./SelectTeamField.css";


function SelectTeamField({ label, value, onChange, choices, placeholder }) {
    return (
        <>
            <div>
                <label>
                    {label}
                </label>
                <select
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                >
                    <option disabled>{placeholder}</option>
                    {choices.map(choice => (
                        <option value={choice.id} key={choice.id}>
                            {choice.name}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default SelectTeamField;
