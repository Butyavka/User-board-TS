import React, { ReactNode } from 'react'

export type id = string | number

export interface User {
    id: id;
    login: string;
    html_url: string;
    avatar_url: string;
    draggable?: boolean;
    onDragStart?: (e: any) => void;
    onDragEnd?: (e: any) => void;
    isFavorite?: boolean;
    canDelete?: boolean;
    deleteElement?: () => void;
}

export interface UserList {
    id?: id;
    users: User[] | any;
    loading?: boolean;
    header: string | ReactNode;
    onDrop?: (e: any) => void;
    onDragOver?: (e: any) => void;
    active?: boolean;
    renderUsers?: any;
}


export interface Icon {
    icon: React.ReactNode;
    className?: string;
}