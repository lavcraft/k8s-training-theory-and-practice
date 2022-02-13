// @flow
import * as React from 'react';
import {FC, useState} from "react";
import styles from './training-block-layout.module.css';
import {TrainingBlock} from "@model/training-blocks";
import {TrainingBlockOptionsHelper} from "./training-block-options-helper";

interface Props {
    trainingBlock: TrainingBlock;
}

export const TrainingBlockLayout: FC<Props> = ({children, trainingBlock}) => {
    const [showProperties, setShowProperties] = useState(false);
    const tolggleProperties = () => setShowProperties(!showProperties);

    return (
        <div className={styles.block}>
            <main>{children}</main>
            <footer className='flex flex-col p-5 w-full max-w-full prose prose-sm prose-slate prose-a:cursor-pointer'>
                <div>
                    <h2>
                        <a onClick={tolggleProperties}>
                            {showProperties ? 'Hide training customizations' : 'Show training customizations'}
                        </a>
                    </h2>
                </div>
                {showProperties && <div>
                    <p>Copy parameter name to url for change default value</p>
                    <TrainingBlockOptionsHelper trainingBlock={trainingBlock}/>
                </div>}
            </footer>
        </div>
    );
};