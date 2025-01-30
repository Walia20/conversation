"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Conversation } from "@11labs/client";
import { cn } from "@/lib/utils";

async function requestMicrophonePermission() {
    try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        return true;
    } catch {
        console.error("Microphone permission denied");
        return false;
    }
}

async function getSignedUrl(agentId: string): Promise<string> {
    try {
        const response = await fetch(`/api/signed-url?agentId=${agentId}`);
        if (!response.ok) {
            throw new Error(`Failed to get signed URL for agentId: ${agentId}`);
        }
        const data = await response.json();
        return data.signedUrl;
    } catch (error) {
        console.error("Error fetching signed URL:", error);
        alert("Error: Unable to fetch signed URL. Please try again.");
        throw error;
    }
}

export function ConvAI() {
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState<string>("M42OrvG5uBBtjFIbK6Km");
    const [showDropdown, setShowDropdown] = useState(false);


    
    const agents = [
        { id: "M42OrvG5uBBtjFIbK6Km", flag: "india.svg", country: "India", avatar: "indian.webp" },
        { id: "DRTTgmlI3BGUfq9hVjSJ", flag: "usa.svg", country: "USA", avatar: "usa's.webp" },
    ];

    async function startConversation() {
        const hasPermission = await requestMicrophonePermission();
        if (!hasPermission) {
            alert("Microphone permission is required to start the conversation.");
            return;
        }

        try {
            const signedUrl = await getSignedUrl(selectedAgent);
            const newConversation = await Conversation.startSession({
                signedUrl,
                onConnect: () => {
                    setIsConnected(true);
                    setIsSpeaking(true);
                },
                onDisconnect: () => {
                    setIsConnected(false);
                    setIsSpeaking(false);
                },
                onError: (error) => {
                    console.error("Conversation Error:", error);
                    alert("An error occurred during the conversation. Please try again.");
                },
                onModeChange: ({ mode }) => {
                    setIsSpeaking(mode === "speaking");
                },
            });

            setConversation(newConversation);
        } catch (error) {
            console.error("Error starting conversation:", error);
        }
    }

    async function endConversation() {
        if (conversation) {
            await conversation.endSession();
            setConversation(null);
            setIsConnected(false);
            setIsSpeaking(false);
        }
    }

    return (
        <div className="flex w-full items-center justify-center">
            <Card className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl transition-transform hover:scale-105">
                <CardContent>
                    <div className="flex justify-end">
                        <div className="relative inline-block text-left">
                            <button
                                className="inline-flex justify-between items-center px-4 py-2 text-lg font-medium text-gray-700 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onClick={() => setShowDropdown((prev) => !prev)}
                            >
                                <img
                                    src={agents.find((agent) => agent.id === selectedAgent)?.flag}
                                    alt="flag"
                                    className="w-5 h-3 mr-2"
                                />
                                {agents.find((agent) => agent.id === selectedAgent)?.country}
                                <span className="ml-2">▼</span>
                            </button>
                            {showDropdown && (
                                <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                                    {agents.map((agent) => (
                                        <li
                                            key={agent.id}
                                            onClick={() => {
                                                setSelectedAgent(agent.id);
                                                setShowDropdown(false);
                                            }}
                                            className="flex items-center px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                                        >
                                            <img
                                                src={agent.flag}
                                                alt={`${agent.country} flag`}
                                                className="w-5 h-3 mr-2"
                                            />
                                            {agent.country}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <CardHeader>
                        <CardTitle className="text-center text-3xl font-bold tracking-wide text-gray-800 mt-4">
                            {isConnected
                                ? isSpeaking
                                    ? "Agent is speaking"
                                    : "Agent is listening"
                                : "Disconnected"}
                        </CardTitle>
                    </CardHeader>

                    <div className="mt-6 flex flex-col items-center gap-y-6">
                        <div
                            style={{
                                animation: conversation ? "pulse 4s infinite" : "",
                                opacity: isConnected ? 1 : 0.7,
                            }}
                            className={cn(
                                "relative my-4 flex h-48 w-48 items-center justify-center overflow-hidden rounded-full shadow-lg",
                                "transition-all duration-500 transform",
                                isSpeaking ? "animate-orb" : conversation && "animate-orb-slow",
                                isConnected ? "orb-active" : "orb-inactive"
                            )}
                        >
                            {/* Always show the selected agent's avatar */}
                            <img
                                src={agents.find((agent) => agent.id === selectedAgent)?.avatar}
                                className="h-full w-full rounded-full object-cover"
                                alt="Agent Avatar"
                            />
                        </div>

                        <Button
                            variant="outline"
                            className="rounded-full px-8 py-4 text-lg font-semibold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white shadow-lg transition-transform hover:scale-110 focus:ring-4 focus:ring-green-300 disabled:opacity-60"
                            size="lg"
                            disabled={conversation !== null && isConnected}
                            onClick={startConversation}
                        >
                            Start Conversation
                        </Button>

                        <Button
                            variant="outline"
                            className="rounded-full px-8 py-4 text-lg font-semibold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white shadow-lg transition-transform hover:scale-110 focus:ring-4 focus:ring-red-300 disabled:opacity-60"
                            size="lg"
                            disabled={conversation === null && !isConnected}
                            onClick={endConversation}
                        >
                            End Conversation
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
