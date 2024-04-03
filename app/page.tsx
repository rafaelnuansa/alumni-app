"use client"
import React, { useState, useEffect } from "react";
import MetaTags from "@/components/meta-tags";
import { Container } from "@/components/container";
import Head from "next/head";
import SearchFilter from "@/components/search-filter";
import AlumniCard from "@/components/alumni-card";
import Pagination from "@/components/pagination";
import axios from "axios";

import Image from "next/image";
import unidaLogo from "@/assets/unida.png";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Search } from "lucide-react";


export default function Home() {

  return (
    <div>
      <Head>
        <title>Direktori Alumni Universitas Djuanda</title>
      </Head>
      <MetaTags
        title="Direktori Alumni"
        description="Official Direktori Alumni Universitas Djuanda Bogor"
        url={"/alumni"}
      />
      <header className="relative isolate z-0 overflow-hidden bg-gradient-to-bl from-blue-100 via-transparent dark:from-blue-950 dark:via-transparent pb-0 py-20 ">
        <Container>
          <div className="mx-auto flex-shrink-0 lg:mx-0 ">
            <div>
              <span className="rounded-full bg-sky-500/10 px-3 py-1 text-sm font-semibold leading-6 text-sky-400 ring-1 ring-inset ring-sky-500/20">
                Direktori Alumni
              </span>
              <Image src={unidaLogo} alt="UNIDA Logo" className="my-4 w-[200px]" />
              <h1 className="mt-10 text-4xl mb-1 font-bold tracking-tight text-foreground sm:text-5xl">
                Direktori Alumni <br />Universitas Djuanda
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
               Pangkalan data Direktori Alumni Universitas Djuanda
              </p>
              <Link href={'/alumni'} className={buttonVariants({ variant: "default" })}> <Search className="me-2 h-4 w-4"/ > Mulai Pencarian </Link>
            </div>
          </div>
         
        </Container>
      </header>

    </div>
  );
}
