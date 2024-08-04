import Image from "next/image";
import { Button } from '@mui/base/Button'
import Link from "next/link";
/* eslint-disable react/no-unescaped-entities */


export default function Home() {
  return (
      <main className="flex flex-row justify-between mx-10 mt-10 items-center h-5/6">
        <section className="text-left">
          <h2 className="font-medium text-6xl">Welcome To Pantrify!</h2>
          <p className="font-raleway text-xl ml-2">Let's get started by adding some items to your pantry.</p>
          <span className="block mt-2">
            <Link href="/signup"><Button className="py-1.5 px-3 text-md bg-sky-900 mr-3 rounded w-40">Sign Up</Button></Link>
            <Link href="/login"><Button className="py-1.5 px-3 text-md bg-sky-900 rounded w-40">Log In</Button></Link>
          </span>

        </section>
        <section className="">
          <Image src="/home-infograph.png" alt="Pantry" width={500} height={500} />
        </section>
      </main>
  );
}
