"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUserRound } from "lucide-react";
import { Container } from "@/components/container";
import { BASE_URL, SECRET_KEY_HEADER } from "@/lib/constants";

const SkeletonLoading = () => {
  return (
    <div className="pb-10 pt-24 sm:py-20">
      <div className="animate-pulse">
        <div className="h-24 w-24 bg-gray-200 rounded-full"></div>
        <div className="mt-4 space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default function AlumniDetail({ params }: { params: { id: string } }) {
  const id = params.id;

  const [alumni, setAlumni] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/alumnis/${id}`,
          {
            headers: {
              'DSIT-UNIDA': SECRET_KEY_HEADER // Set the DSIT-UNIDA header
            }
          }
        );
        setAlumni(response.data);
        setLoading(false);
      } catch (error) {
        setError("Oops data not found");
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Cleanup logic, if needed
    };
  }, [id]);

  if (loading) {
    return (
      <Container>
        <SkeletonLoading />
      </Container>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Container>
        <div className="border-b bg-background pb-10 pt-24 sm:py-20">
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-4 items-center">
              <div>
                <Avatar className="h-14 w-14 lg:ml-4 border-2 lg:mr-4 lg:h-24 lg:w-24">
                  {alumni.image ? (
                    <>
                      <AvatarImage
                        src={alumni.image}
                        alt={alumni.nm_pd}
                        className="h-14 w-14 rounded-full object-cover lg:h-24 lg:w-24"
                      />
                      <AvatarFallback>
                        <CircleUserRound />
                      </AvatarFallback>
                    </>
                  ) : (
                    <AvatarFallback>
                      <CircleUserRound />
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
              <div>
                <h4 className="font-bold text-xl">{alumni.nm_pd}</h4>
                <h6 className="text-sm">{alumni.nipd}</h6>
                <p className="text-gray-600 dark:text-white">
                  {alumni.study_program.faculty != null && (
                    <span>
                      {" "}
                      {alumni.study_program.faculty.nama_fakultas} -{" "}
                    </span>
                  )}
                  {alumni.nama_prodi}
                </p>
                <p className="text-gray-600 dark:text-white text-sm">
                  Graduated at{" "}
                  {new Date(alumni.tgl_wisuda).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="rounded p-4 mb-4">
            <h5 className="font-bold text-xl mb-4">{alumni.name}</h5>
            <div className="mb-4">
              <h5 className="font-bold text-xl mb-2">Thesis</h5>
              <p className="text-gray-600 dark:text-white">{alumni.judul}</p>
            </div>
            <div>
              <h5 className="font-bold text-xl mb-2">Mentors</h5>
              <ol className="list-disc list-inside">
                {alumni.pembimbing1 && <li>{alumni.pembimbing1}</li>}
                {alumni.pembimbing2 && <li>{alumni.pembimbing2}</li>}
                {alumni.pembimbing3 && <li>{alumni.pembimbing3}</li>}
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
