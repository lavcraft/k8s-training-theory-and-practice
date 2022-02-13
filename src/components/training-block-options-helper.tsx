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
                .map<React.ReactNode>(([key, value]) => (
                        <TrainingBlockOption option={value} optionKey={key} key={key}/>
                ))
                .reduce((prev, cur) => [
                    prev,
                    <div className='w-full col-span-full bg-slate-100 h-0.5' />,
                    cur]
                )
            }
        </div>
    );
};