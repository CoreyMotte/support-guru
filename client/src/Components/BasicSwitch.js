import React from 'react';
import Switch from '@mui/material/Switch';
import { enableDarkMode, disableDarkMode } from '../Redux/Actions/displayActions';
import { useDispatch, useSelector } from 'react-redux';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function BasicSwitch() {
    const darkMode = useSelector((state) => state.displayReducer.darkMode);
    const dispatch = useDispatch();

    const handleChange = () => {
        darkMode ? dispatch(disableDarkMode()) : dispatch(enableDarkMode());
    }

    return (
        <div>
            <Switch checked={darkMode} onChange={handleChange} {...label} />
        </div>
    );
}