// src/components/islets/compact-user-header/index.tsx
import Avatar from "@/components/ui/avatar";
import { User } from "@/lib/entities/user";
import React from "react";

interface CompactUserHeaderProps {
    user: User;
}

export function CompactUserHeader({ user }: CompactUserHeaderProps) {
    return (
        <div className="flex items-center gap-3 py-2">
            <Avatar
                size="sm"
                src={user?.avatar}
                alt="avatar"
                status={user?.status}
            />
            <div>
                <p className="text-lg font-bold">{user?.name}</p>
            </div>
        </div>
    );
}