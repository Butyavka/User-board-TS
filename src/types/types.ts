import React from "react";

export interface IUser {
    id: number;
    login: string;
    html_url: string;
    avatar_url: string;
    draggable?: boolean;
    onDragStart?: DragEvent;
    onDragEnd?: DragEvent;
    onDragLeave?: DragEvent;
    onDragOver?: DragEvent;
    onDrop?: DragEvent;
}

export interface IUserList {
    users: IUser[];
    loading: boolean;
    header: string | React.ReactNode;
}


export interface IICON {
    icon: React.ReactNode;
    className?: string;
}