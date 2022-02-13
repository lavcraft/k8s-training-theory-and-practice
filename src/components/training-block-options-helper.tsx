import * as React from 'react';
import {FC} from "react";
import styles from './training-block-options-helper.module.css';
import {TrainingBlock} from "@model/training-blocks";
import {TrainingBlockOption} from "./training-block-option";

type Props = {
    trainingBlock: TrainingBlock;
};

export const TrainingBlockOptionsHelper: FC<Props> = ({trainingBlock}) => {
    const {defaults} = trainingBlock;

    return (
        <div className={styles.holder}>
            {Object.entries(defaults)
                .filter(([_, value]) => value.description)
                .map(([key, value]) => (
                    <TrainingBlockOption option={value} optionKey={key}/>
                ))}
        </div>
    );
};