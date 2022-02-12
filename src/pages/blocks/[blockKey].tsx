// @flow
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

const BlockNamePage: FC<TrainingBlock> = ({content}) => {
    const router = useRouter();

    const [contentProcessed, setContentProcessed] = useState(content)

    useEffect(() => {
        if (router.isReady) {
            setContentProcessed(content
                .replace('{{dockerRepository}}', router.query.dockerRepository as string)
            );
        }
    }, [router.query.dockerRepository])

    const renderedMarkdown = useMemo(() => <ReactMarkdown
        children={contentProcessed}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, {behaviour: 'append'}]]}
    />, [contentProcessed]);

    return (
        <div className={styles.container}>
            {renderedMarkdown}
        </div>
    );
};

export default BlockNamePage;

export const getStaticPaths: GetStaticPaths = async (context) => {
    const blockFiles = fs.readdirSync(path.join(process.cwd(), 'src/markdown/blocks'));
    const paths = blockFiles.map(value => {
        return {
            params: {blockKey: value.replace('\.md', '')}
        }
    })

    return {paths, fallback: false}
}

export const getStaticProps: GetStaticProps<TrainingBlock, { blockKey: string }> = ({params}) => {
    if (!params?.blockKey) throw new Error("No block name, can't render page");

    try {
        const blockKey = params.blockKey;
        const contentMD = fs.readFileSync(path.join(process.cwd(), 'src/markdown/blocks', `${blockKey}.md`));
        const {data: frontmatter, content} = matter(contentMD);

        return {
            props: {
                name: frontmatter.name ?? null,
                ...frontmatter,
                content: content.replace(/:\w+:/gi, name => emoji.getUnicode(name)),
            }
        }
    } catch (e) {
        console.error(`[/blocks/${params.blockKey}] Error:`, e);
        throw e;
    }
}