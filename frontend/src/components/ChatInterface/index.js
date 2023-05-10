import "./ChatInterface.css"
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentTeamThunk, getUserTeamsThunk } from "../../store/teams";
import TeamManagement from "./TeamManagement";
import SearchNav from "./SearchNav";
import MessageFeed from "./MessageFeed";
import MessageInputs from "./MessageInputs";
import ChannelFeed from "./ChannelFeed";
import DirectMessageFeed from "./DirectMessageFeed";
import { getUserChannelsThunk } from "../../store/channels";

function ChatInterface({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const currentTeamId = useSelector((state) => state.teams.currentTeam.id)
    const userChannels = useSelector((state) => state.channels.userChannels)

    useEffect(() => {
        if (sessionUser && sessionUser.id) {
            dispatch(getUserTeamsThunk(sessionUser.id))
            // dispatch(getCurrentTeamThunk(currentTeam.id));
            dispatch(getUserChannelsThunk())
        }

    }, [sessionUser]);

    useEffect(()=>{
        dispatch(getCurrentTeamThunk(4))
    }, [])

    return (
        <div className="chat-interface-main-wrapper">
            {/* Left Column */}
            <div className="chat-interface-main-column chat-interface-main-left-column">
                {/* Logo */}
                <div></div>
                {/* Team management*/}
                <TeamManagement />
                {
                    currentTeamId && userChannels
                    ?(
                        <>
                                {/* Channels */}
                                <ChannelFeed userChannels={userChannels} currentTeamId={currentTeamId} />
                                {/* Direct Messages */}
                                <DirectMessageFeed userChannels={userChannels} currentTeamId={currentTeamId}/>
                            </>
                        )
                        : null
                }
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
