export interface IUser {
    id: number,
    login: string,
    html_url: string,
    avatar_url: string
}

export interface IUserList {
    users: IUser[];
    loading: boolean;
    header: string;
}