import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from './index.module.css';
import {getAllBlockKeys, getBlockContentMDParsed} from "../helpers/training-blocks";

interface HomeProps {
    trainingBlockKeys: string[];
    blocks: { key: string; name: string, order: number }[]
}

const Home: NextPage<HomeProps> = ({trainingBlockKeys, blocks}) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="K8S training"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                {blocks
                    .sort((a, b) => a.order - b.order)
                    .map(block => (
                        <h3 key={block.key}><Link href={`/blocks/${block.key}`}><a>{block.name}</a></Link></h3>
                    ))}
            </main>

            <footer className={styles.footer}>
            </footer>
        </div>
    )
}

export default Home

export const getStaticProps: GetStaticProps<HomeProps> = () => {
    const keys = getAllBlockKeys();
    const blocks = keys.map(value => {
        const data = getBlockContentMDParsed(value).data;
        return ({
            key: value,
            name: data.name ?? null,
            order: data.order ?? null,
        });
    });
    return {
        props: {
            trainingBlockKeys: keys,
            blocks
        }
    }
}