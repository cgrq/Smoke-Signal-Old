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
    const currentTeam = useSelector((state) => state.teams.currentTeam)
    const currentChannel = useSelector((state) => state.channels.currentChannel)
    const userChannels = useSelector((state) => state.channels.userChannels)
    const [newMessage, setNewMessage] = useState("");


    useEffect(() => {
        if (sessionUser && sessionUser.id) {
            dispatch(getUserTeamsThunk(sessionUser.id))
            // dispatch(getCurrentTeamThunk(currentTeam.id));
            dispatch(getUserChannelsThunk())
        }

    }, [sessionUser]);

    useEffect(() => {
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
                    currentTeam && userChannels
                        ? (
                            <>
                                {/* Channels */}
                                <ChannelFeed userChannels={userChannels} currentTeamId={currentTeam.id} />
                                {/* Direct Messages */}
                                <DirectMessageFeed userChannels={userChannels} currentTeamId={currentTeam.id} />
                            </>
                        )
                        : null
                }
            </div>
            {/* Right Column */}
            <div className="chat-interface-main-column chat-interface-main-right-column">
                {/* Nav/Search */}
                <SearchNav isLoaded={isLoaded} sessionUser={sessionUser} />
                {/* Message feed */}
                {/* Message Inputs */}
                {
                    currentChannel
                    ? (
                        <>
                            <MessageFeed />
                            <MessageInputs channelId={currentChannel.id} newMessage={newMessage} setNewMessage={setNewMessage} />
                        </>
                    )
                        :<h1>Please Select Channel</h1>
                    
                }
            </div>
        </div>
    )
}

export default ChatInterface;
