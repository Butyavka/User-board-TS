import React from 'react'

export interface IUser {
    id: number;
    login: string;
    html_url: string;
    avatar_url: string;
    draggable?: boolean;
    onDragStart?: () => void;
    onDragEnd?: (e: DragEvent, user: IUser) => void;
    onDragLeave?: (e: any) => void;
    onDragOver?: (e: any) => void;
    onDrop?: (e: DragEvent, user: IUser, board: IUserList) => void;
}

export interface IUserList {
    users: IUser[];
    loading?: boolean;
    header: string | React.ReactNode;
}


export interface IICON {
    icon: React.ReactNode;
    className?: string;
}