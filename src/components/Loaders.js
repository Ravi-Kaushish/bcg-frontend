import React from 'react';
import Loader from 'react-loader-spinner';
import { LOADER_TYPE, LOADER_COLOR } from '../utils/constants';

export const PageLoader = () => {
    return (
        <Loader
            type={LOADER_TYPE}
            color={LOADER_COLOR}
            height={50}
            width={50}
            visible={true}
            style={{ position: "fixed", bottom: "50%", left: "50%", zIndex: "10" }}
        />
    )
};

export const ModalLoader = () => {
    return (
        <Loader
            type={LOADER_TYPE}
            color={LOADER_COLOR}
            height={'10%'}
            width={'10%'}
            visible={true}
            style={{ position: "absolute", bottom: "50%", left: "47%", zIndex: "8" }}
        />
    )
};