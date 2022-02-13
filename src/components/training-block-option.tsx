import * as React from 'react';
import {FC} from "react";
import styles from './training-block-option.module.css';
import {TrainingMaterialsMarkdownMetadataWithDescription} from "@model/training-materials-markdown";

type Props = {
    optionKey: string;
    option: TrainingMaterialsMarkdownMetadataWithDescription;
};
export const TrainingBlockOption: FC<Props> = ({optionKey, option: {value, description}}) => {
    return (
        <div className={styles.holder}>
            <span>{optionKey}</span>
            <span>{value}</span>
            <span>{description}</span>
        </div>
    );
};