// src/components/layout/sidemenu/side-menu-track.tsx
"use client";
import React, { useState } from "react";
import { ListedServer } from "@/lib/entities/server";
import SideMenuItem from "./side-menu-item";
import { clsx } from "@/lib/utils";
import { BsDiscord } from "react-icons/bs";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Divider from "@/components/ui/divider";

type SideMenuTrackProps = {
    servers: ListedServer[];
};

export default function SideMenuTrack({ servers }: SideMenuTrackProps) {
    const [active, setActive] = useState<string>("default");

    const handleServerClick = (serverId: string) => {
        // Only allow navigation to the implemented server
        if (serverId !== "maga-forever") {
            // For other servers, just show as active but don't navigate
            setActive(serverId);
            return;
        }
        setActive(serverId);
    };

    return (
        <>
            <TooltipProvider>
                {/*
          Direct messages side menu button
        */}
                <SideMenuItem
                    href="/channels/me"
                    onClick={() => setActive("default")}
                    tooltipContent={<div className="font-semibold">Direct messages</div>}
                    notificationCount={432}
                    className={clsx(
                        "mx-auto mb-2 flex items-center justify-center bg-foreground",
                        active === "default" ? "bg-primary text-white" : "text-gray-300",
                    )}
                    isActive={active === "default"}
                >
                    <BsDiscord fontSize={26} />
                </SideMenuItem>

                <Divider className="w-8" />

                {/* Server - Functional */}
                <SideMenuItem
                    href="/servers/maga-forever/announcements"
                    onClick={() => handleServerClick("maga-forever")}
                    tooltipContent={<div className="font-semibold">MAGA Community</div>}
                    notificationCount={3}
                    className="mx-auto my-2"
                    isActive={active === "maga-forever"}
                    image={{
                        url: "/img123.png",
                        alt: "MAGA",
                    }}
                />

                <Divider className="w-8" />

                {/*
          List of other servers - Visual only, no navigation
        */}
                {servers?.map((server) => (
                    <button
                        key={server.id}
                        onClick={() => handleServerClick(server.id)}
                        className={clsx(
                            "group relative block h-12 w-12 bg-foreground bg-cover transition-all hover:shadow-xl mx-auto my-2",
                            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                            "focus-visible:ring-offset-background active:translate-y-[1px]",
                            active === server.id ? "rounded-[15px]" : "rounded-[100%] hover:rounded-[15px]",
                        )}
                        title={server.name}
                    >
                        {/* Side indicator */}
                        <div
                            className={clsx(
                                "absolute -left-4 w-[9px] rounded-lg bg-white",
                                "transition-all group-hover:scale-100",
                                active === server.id ? "bottom-1 top-1" : "top-1/2 -mt-3 h-6 scale-0",
                            )}
                        />

                        {/* Notification badge */}
                        {server.messages && (
                            <div className="absolute -bottom-1 -right-1 min-w-[25px] text-center rounded-full px-[4px] py-[0px] text-[11px] font-bold border-4 border-background bg-red-500 text-white">
                                {server.messages > 99 ? "99+" : server.messages}
                            </div>
                        )}

                        {/* Server image */}
                        <img
                            src={server.photo}
                            alt={server.name}
                            className={clsx(
                                "absolute inset-0 w-full h-full object-cover transition-all",
                                active === server.id ? "rounded-[15px]" : "rounded-[100%] hover:rounded-[15px]",
                            )}
                        />
                    </button>
                ))}
            </TooltipProvider>
        </>
    );
}