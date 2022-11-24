import React, { ReactNode, DragEvent } from 'react'

export type id = string | number

export interface User {
    id: id;
    login: string;
    html_url: string;
    avatar_url: string;
    draggable?: boolean;
    onDragStart?: (e: DragEvent<HTMLDivElement>) => void;
    onDragEnd?: () => void;
    isFavorite?: boolean;
    canDelete?: boolean;
    deleteElement?: () => void;
}

export interface UserList {
    id: id;
    users: User[];
    loading?: boolean;
    header: string | ReactNode;
    onDrop?: (e: DragEvent<HTMLDivElement>) => void;
    onDragOver?: (e: DragEvent<HTMLDivElement>) => void;
    active?: boolean;
    renderUsers?: (users: User[], id: id) => ReactNode;
    onDragLeave?: () => void;
}


export interface Icon {
    icon: React.ReactNode;
    className?: string;
}