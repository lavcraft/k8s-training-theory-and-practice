export interface TrainingBlock {
    name: string;
    content: string;

    defaults: { [key: string]: string };
}