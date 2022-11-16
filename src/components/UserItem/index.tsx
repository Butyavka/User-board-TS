import './style.scss'
import React, {FC, useState} from 'react';
import {IUser} from "../../types/types";
import block from 'bem-cn-lite';

const b = block('user_card');

const UserItem: FC<IUser> = ({ avatar_url, login, id, html_url }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className={ b() }>
            <div className={ b('header', { open }) }>
                <div className={ b('name') }>
                    {login}
                </div>
                <div className={ b('id') }>ID: {id}</div>
            </div>
            <div className={ b('card') }>
                <div className={ b('top') }>
                    <div className={ b('avatar') }>
                        <img className={ b('img') } src={ avatar_url } alt={ login }/>
                    </div>
                </div>
                <div className={ b('bottom') }>
                    <div className={ b('link-box') } >
                        Link to user:
                        <a className={ b('link') }  href={ html_url } title={ html_url }>
                            {html_url}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserItem