import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Whats from './interface1'


export default function Home() {
  
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />

      <Whats />
    </>
  )
}
