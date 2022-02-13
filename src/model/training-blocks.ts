import {TrainingMaterialsMarkdownMetadataWithDescription} from "@model/training-materials-markdown";

export interface TrainingBlock {
    name: string;
    content: string;

    defaults: { [key: string]: TrainingMaterialsMarkdownMetadataWithDescription };
}