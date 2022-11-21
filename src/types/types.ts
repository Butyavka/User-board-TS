import React from 'react'

export type id = string | number

export interface User {
    id: id;
    login: string;
    html_url: string;
    avatar_url: string;
    draggable?: boolean;
    onDragStart?: () => void;
    onDragEnd?: (e: DragEvent, user: User) => void;
    onDragLeave?: (e: any) => void;
    onDragOver?: (e: any) => void;
    onDrop?: (e: any) => void;
    isFavorite?: boolean;
    canDelete?: boolean;
    delete?: () => void;
}

export interface UserList {
    id: id;
    users: User[];
    loading?: boolean;
    header: string | React.ReactNode;
}


export interface Icon {
    icon: React.ReactNode;
    className?: string;
}