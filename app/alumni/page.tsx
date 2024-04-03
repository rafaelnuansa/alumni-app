"use client";
import React, { useState, useEffect, Suspense } from "react";
import MetaTags from "@/components/meta-tags";
import { Container } from "@/components/container";
import Head from "next/head";
import SearchFilter from "@/components/search-filter";
import AlumniCard from "@/components/alumni-card";
import Pagination from "@/components/pagination";
import axios from "axios";
import { useSearchParams, usePathname, useRouter } from "next/navigation"; // Import useSearchParams
import Image from "next/image";
import unidaLogo from "@/assets/unida.png";
import { BASE_URL, SECRET_KEY_HEADER } from "@/lib/constants";
function SearchBarFallback() {
  return <>placeholder</>
}
// Skeleton Loading Component
const SkeletonLoading = () => {
  return (
    <div className="animate-pulse">
      <div className="h-24 bg-gray-200 rounded"></div>
      <div className="h-4 my-2 bg-gray-200 rounded"></div>
      <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
      <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
    </div>
  );
};

export default function Alumni() {
  const [alumniData, setAlumniData] = useState({
    data: [],
    links: [],
  });
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams(); // Use useSearchParams hook
  const [currentPage, setCurrentPage] = useState(() => {
    const page = parseInt(searchParams.get("page") || "1", 10); // Parse page from searchParams
    return page;
  });
  const searchQuery = searchParams.get("q");
  const facultyQuery = searchParams.get("faculty");
  const { replace } = useRouter(); // Add useRouter hook

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, facultyQuery]); // Add facultyQuery to dependencies

  useEffect(() => {
    // Update URL parameter 'page' when currentPage changes
    const params = new URLSearchParams(searchParams);
    params.set("page", String(currentPage));
    replace(`?${params.toString()}`);
  }, [currentPage, replace, searchParams]);

  const fetchData = async (page: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/alumnis?page=${page}`, {
        headers: {
          "DSIT-UNIDA": SECRET_KEY_HEADER, // Set the DSIT-UNIDA header
        },
      });
      setAlumniData(response.data);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = async (query: string, faculty: string) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/alumnis?q=${query}&faculty=${faculty}${
          currentPage === 1 ? "" : `&page=${currentPage}`
        }`, // Only add 'page' parameter if currentPage is not 1
        {
          headers: {
            "DSIT-UNIDA": SECRET_KEY_HEADER, // Set the DSIT-UNIDA header
          },
        }
      );
      setAlumniData(response.data);
      setCurrentPage(1); // Set current page to 1
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Head>
        <title>Data Alumni - Universitas Djuanda</title>
      </Head>
      <MetaTags
        title="Direktori Alumni"
        description="Official Direktori Alumni Universitas Djuanda Bogor"
        url={"/alumni"}
      />
      <header className="relative isolate z-0 overflow-hidden border-b bg-gradient-to-bl from-blue-100 via-transparent dark:from-blue-950 dark:via-transparent py-20 ">
        <Container>
          <div className="mx-auto flex-shrink-0 lg:mx-0 ">
            <div>
              <h1 className=" text-2xl mb-1 font-bold tracking-tight text-foreground sm:text-4xl">
                Alumni
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Silakan melakukan pencarian data alumni memasukkan nama/nim/nipd
                atau berdasarkan filter
              </p>
            </div>
          </div>
          <Suspense fallback={<SearchBarFallback />}>
            <SearchFilter onSearch={handleSearch} />
          </Suspense>
        </Container>
      </header>

      <div>
        <Container>
          <div className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loading ? (
                // Render skeleton loading when loading state is true
                <>
                  <SkeletonLoading />
                  <SkeletonLoading />
                </>
              ) : alumniData.data.length > 0 ? (
                alumniData.data.map((alumni, index) => (
                  <AlumniCard key={index} alumni={alumni} />
                ))
              ) : (
                <div className="py-2">No alumni data found.</div>
              )}
            </div>
          </div>

          <div className="mt-2">
            <Pagination
              links={alumniData.links}
              onPageChange={handlePageChange}
            />
          </div>
        </Container>
      </div>
    </div>
  );
}
