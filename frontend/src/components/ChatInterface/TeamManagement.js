import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentTeamThunk, getUserTeamsThunk } from "../../store/teams";

import SelectTeamField from "../SelectTeamField/Index"
import OpenModalButton from "../OpenModalButton"
import TeamFormModal from "../TeamFormModal"
import DeleteTeamModal from "../DeleteTeamModal"
import { Link } from "react-router-dom"

function TeamManagement() {
    const [currentTeamId, setCurrentTeamId] = useState(4);
    const dispatch = useDispatch();
    const userTeams = useSelector((state) => state.teams.userTeams);
    const [errors, setErrors] = useState({});

    const handleTeamSelect = async (e) => {
        setCurrentTeamId(e.target.value);
        const data = await dispatch(getCurrentTeamThunk(e.target.value));

        if (data) {
            setErrors(data);
        }
    };

    return (
        <div className="chat-interface-team-management-wrapper">
            <SelectTeamField
                label="Select team"
                value={currentTeamId}
                onChange={handleTeamSelect}
                choices={userTeams}
                placeholder="Choose team"
            />
            <OpenModalButton
                buttonText="Update current team"
                modalComponent={
                    <TeamFormModal type="update" title="Update team" />
                }
            />
            <OpenModalButton
                buttonText="Delete current team"
                modalComponent={
                    <DeleteTeamModal />
                }
            />
            <OpenModalButton
                buttonText="Create a Team"
                modalComponent={
                    <TeamFormModal type="create" title="Create a new team!" />
                }
            />
            <li>
                <Link to={`/channels/new`}>Create New Channel</Link>
            </li>
        </div>
    )
}

export default TeamManagement
