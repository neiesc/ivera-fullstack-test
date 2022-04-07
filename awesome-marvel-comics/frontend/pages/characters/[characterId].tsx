import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "/styles/Home.module.css";

const Character = ({ character }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Awesome Marvel Comics - {character.name}</title>
        <meta name="description" content="Awesome Marvel Comics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href="/">
          <a>Home</a>
        </Link>
        <h1 className={styles.title}>{character.name}</h1>
        <Image
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          width={100}
          height={100}
        />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`${process.env.AWESOME_BACKEND_MARVEL_COMICS_BASE_URL}/v1/characters`);
  const characters = await res.json();

  const paths = characters.data.results.map((character) => ({
    params: { characterId: character.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.AWESOME_BACKEND_MARVEL_COMICS_BASE_URL}/v1/characters/${params.characterId}`);
  const character = await res.json();

  return { props: { character: character.data.results[0] } };
}

export default Character;
