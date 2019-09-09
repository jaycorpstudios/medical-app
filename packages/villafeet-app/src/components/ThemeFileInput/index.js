import React from 'react';
import classnames from 'classnames';

import './ThemeFileInput.scss';
import ThemeButtonDefault from '../ThemeButtonDefault';

export default class ThemeFileInput extends React.Component {

    openFileSelector = () => (event) => {
        event.preventDefault();
        this.refs.fileUploader.click();
    }

    removeFile = () => (event) => {
        event.preventDefault();
        this.refs.fileUploader.value = '';
        const { name } = this.props;
        this.props.resetValue({ name, section: this.props['data-section']});
    }

    getFileName(){
        const { value } = this.props;
        const { fileUploader = {} } = this.refs;
        const [ file = {} ] = fileUploader.files || [];
        return file.name || value;
    }

    renderValue(){
        const { uploadInProgress } = this.props;
        const imageName = this.getFileName();
        return (
            <div className="FileUploader">
                <i className='material-icons'>image</i>
                <div>
                    <span className="FileUploader__name theme-input-text">{imageName}</span>
                    <div className={classnames('FileUploader__progress-bar', { 'complete': !uploadInProgress })}></div>
                </div>
                {!uploadInProgress && <ThemeButtonDefault icon='delete_outline' onClick={this.removeFile()}/>}
            </div>
        )
    }
    

    render() {

        const { icon, className, negative, value, label, hasError, errorMessage, uploadInProgress, resetValue, ...other } = this.props;
        const isInvalid = hasError ? 'error' : '';
        const inputClass = 'ThemeFileInput__input theme-input-text';
        const labelClass = 'ThemeFileInput__label theme-input-text';
        const { fileUploader = {} } = this.refs;
        const { files = [] } = fileUploader;
        const fileIsSelected = files.length > 0;
        const showUploadButton = !fileIsSelected && !value;

        return(
            <div className={classnames('ThemeFileInput', className )}>
                {showUploadButton && (
                    <ThemeButtonDefault
                        icon='add_photo_alternate'
                        title={'Agregar imagen'}
                        onClick={this.openFileSelector()}
                    />
                )}
                {!showUploadButton && this.renderValue()}
                <input
                    type='file'
                    className={inputClass}
                    ref='fileUploader'
                    {...other}
                />
                <label className={labelClass} htmlFor={other.name}>{label}</label>
                <span className="ErrorMessage">{errorMessage}</span>
            </div>
        )
    }
}