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
import {copyToClipboard} from "../../helpers/browser-clipboard";

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
        components={{
            h2: (args) => {
                console.log(`args = ${args}`, args)

                const onClick = () => {
                    if (typeof args.children[0] === 'string') {
                        const url = new URL(window.location);
                        url.hash = args.children[1].props.href;
                        const title = args.children[0];
                        const split = title.split(':');
                        copyToClipboard(`Лайк если справился с заданием [${split.length > 1 ? split[1].trim() : title}](${url})`);
                    }
                }

                return <h2 {...args}>
                    <span>{args.children[0]}</span>
                    {args.children[1]}
                    <span className={styles.copyToClip} onClick={onClick}></span>
                </h2>
            },
            h3: ({node, ...props}) => <h3 {...props} onClick={() => {
               console.log(`node = ${node}`, node)
                console.log(`props = ${props}`, props)
                console.log('element ', props.children[1].props.href)

                if (typeof props.children[0] === 'string') {
                    const url = new URL(window.location);
                    url.hash = props.children[1].props.href;
                    const title = props.children[0];
                    const splitted = title.split(':')
                    copyToClipboard(`[${splitted.length > 1 ? splitted[1] : title}](${url})`);
                }
            }}/>
        }}
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