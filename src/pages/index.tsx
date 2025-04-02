import Head from 'next/head';
import ToDoApp from '../components/ToDoApp';

export default function Home() {
  return (
    <>
      <Head>
        <title>TO-DO LIST FOR CRIMSON</title>
        <meta name="description" content="A simple todo list application as part of Crimson's Interview" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/daisyui@2.18.0/dist/full.css" rel="stylesheet" type="text/css" />
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css" rel="stylesheet" type="text/css" />
      </Head>
      <ToDoApp />
    </>
  );
}
