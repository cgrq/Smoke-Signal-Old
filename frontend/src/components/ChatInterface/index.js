import "./ChatInterface.css"
import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentTeamThunk, getUserTeamsThunk } from "../../store/teams";
import OpenModalButton from "../OpenModalButton";
import TeamFormModal from "../TeamFormModal";
import ProfileButton from "../Navigation/ProfileButton";
import SelectTeamField from "../SelectTeamField/Index";
import DeleteTeamModal from "../DeleteTeamModal";
import TeamManagement from "./TeamManagement";
import SearchNav from "./SearchNav";
import MessageFeed from "./MessageFeed";
import MessageInputs from "./MessageInputs";
import ChannelFeed from "./ChannelFeed";
import DirectMessageFeed from "./DirectMessageFeed";

function ChatInterface({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const [currentTeamId, setCurrentTeamId] = useState(4);
    const [errors, setErrors] = useState({});
    const userTeams = useSelector((state) => state.teams.userTeams);

    useEffect(() => {
        if (sessionUser && sessionUser.id) {
            dispatch(getUserTeamsThunk(sessionUser.id))
            dispatch(getCurrentTeamThunk(currentTeamId));
        }

    }, [sessionUser]);

    const handleTeamSelect = async (e) => {
        setCurrentTeamId(e.target.value);
        const data = await dispatch(getCurrentTeamThunk(e.target.value));

        if (data) {
            setErrors(data);
        }
    };

    return (
        <div className="chat-interface-main-wrapper">
            {/* Left Column */}
            <div className="chat-interface-main-column chat-interface-main-left-column">
                {/* Logo */}
                <div></div>
                {/* Team management*/}
                <TeamManagement />
                {/* Channels */}
                <ChannelFeed />
                {/* Direct Messages */}
                <DirectMessageFeed />
            </div>
            {/* Right Column */}
            <div className="chat-interface-main-column chat-interface-main-right-column">
                {/* Nav/Search */}
                <SearchNav isLoaded={isLoaded} sessionUser={sessionUser}/>
                {/* Message feed */}
                <MessageFeed />
                {/* Message Inputs */}
                <MessageInputs />
            </div>
        </div>
    )
}

export default ChatInterface;
