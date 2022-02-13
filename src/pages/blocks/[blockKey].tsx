import * as React from 'react';
import {FC, useEffect, useMemo, useState} from "react";
import styles from './[blockKey].module.css';
import {GetStaticPaths, GetStaticProps} from "next";
import * as fs from "fs";
import path from "path";
import matter from "gray-matter";
// @ts-ignore
import emoji from 'emoji-dictionary'
import {TrainingBlock} from "@model/training-blocks";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import {useRouter} from "next/router";
import {getAllBlockKeys, getBlockContentMDParsed} from "../../helpers/training-blocks";
import {TrainingBlockLayout} from "../../components/training-block-layout";

const BlockNamePage: FC<TrainingBlock> = (props) => {
    const {defaults, content} = props;
    const router = useRouter();
    const [contentProcessed, setContentProcessed] = useState(content)

    useEffect(() => {
        if (router.isReady) {
            let contentProcessing = content;
            const customisableKeys = Object.keys(defaults).filter(value => defaults[value].description);
            for (let customisableKey of customisableKeys) {
                contentProcessing = contentProcessing
                    .replaceAll(`{{${customisableKey}}}`, router.query[customisableKey] as string ?? defaults[customisableKey]?.value);
            }

            setContentProcessed(contentProcessing);
        }
    }, [router.query])

    const renderedMarkdown = useMemo(() => <ReactMarkdown
        children={contentProcessed}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, {behaviour: 'append'}]]}
    />, [contentProcessed]);

    return (
        <TrainingBlockLayout trainingBlock={props}>
            <div className={styles.block}>
                {renderedMarkdown}
            </div>
        </TrainingBlockLayout>
    );
};

export default BlockNamePage;

export const getStaticPaths: GetStaticPaths = async (context) => {
    const paths = getAllBlockKeys()
        .map(value => ({
            params: {blockKey: value.replace('\.md', '')}
        }));

    return {paths, fallback: false}
}

export const getStaticProps: GetStaticProps<TrainingBlock, { blockKey: string }> = ({params}) => {
    if (!params?.blockKey) throw new Error("No block name, can't render page");

    try {
        const blockKey = params.blockKey;
        const {data: frontmatter, content} = getBlockContentMDParsed(blockKey);

        return {
            props: {
                name: frontmatter.name ?? null,
                defaults: frontmatter,
                content: content.replace(/:\w+:/gi, name => emoji.getUnicode(name)),
            }
        }
    } catch (e) {
        console.error(`[/blocks/${params.blockKey}] Error:`, e);
        throw e;
    }
}