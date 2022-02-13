// @flow
import * as React from 'react';
import {FC} from "react";
import styles from './button.module.css';

type Props = {
    text: string;
};
export const Button: FC<Props> = ({text}) => {
    return (
        <div className={styles.container}>
            {text}
        </div>
    );
};