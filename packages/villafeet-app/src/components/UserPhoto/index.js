import React from 'react';
import './UserPhoto.scss';
const UserPhoto = (props) => {
    const { className='', src, name='?', gender='male', ...other } = props;
    const classes = `UserPhoto ${className}`
    if(src){
        return <img className={classes} src={src} alt={name} {...other}/>
    }else {
        const [ firstName = '', sourName = '' ] = name.trim().split(' ');
        const [ firstNameinitial = '' ] = firstName.split('');
        const [ sourNameinitial = '' ] = sourName.split('');
        const initials = `${firstNameinitial}${sourNameinitial}`.toUpperCase();
        return <figure className={`${classes} ${gender}`} {...other}><figcaption>{initials}</figcaption></figure>
    }

}

export default UserPhoto;

