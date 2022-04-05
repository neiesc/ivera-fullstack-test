import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = ({ characters }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Awesome Marvel Comics</title>
        <meta name="description" content="Awesome Marvel Comics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Awesome Marvel Comics
        </h1>

        <div className={styles.grid}>
          {characters.data.results.map((post) => (
            <a href={`/characters/${post.id}`} className={styles.card}>
              <h2>{post.name}</h2>
              <Image
                src={`${post.thumbnail.path}.${post.thumbnail.extension}`}
                alt={post.name}
                width={100}
                height={100}
              />
            </a>
          ))}
        </div>
      </main >

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.AWESOME_BACKEND_MARVEL_COMICS_BASE_URL}/v1/characters`)
  const characters = await res.json()

  return {
    props: {
      characters,
    },
  }
}

export default Home
