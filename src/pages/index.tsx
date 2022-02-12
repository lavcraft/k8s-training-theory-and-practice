import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from './index.module.css';
import {getAllBlockKeys} from "../helpers/training-blocks";

interface HomeProps {
    trainingBlockKeys: string[];
}

const Home: NextPage<HomeProps> = ({trainingBlockKeys}) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="K8S training"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                {trainingBlockKeys.map(value => (
                    <h3 key={value}><Link href={`/blocks/${value}`}><a>{value}</a></Link></h3>
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
    return {
        props: {
            trainingBlockKeys: keys,
        }
    }
}