import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { ChevronRight, CircleUserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
interface StudyProgram {
  faculty: {
    nama_fakultas: string;
  };
  nama_prodi: string;
}
interface Alumni {
  id_alumni: number;
  nipd: string;
  nm_pd: string;
  tmpt_lahir: string;
  tgl_lahir: string;
  jk: string;
  nik: string;
  kode_prodi: string;
  nama_prodi: string;
  agama: string;
  alamat: string;
  kode_pos: string;
  no_hp: string;
  email: string;
  nm_ayah: string;
  nm_ibu_kandung: string;
  judul: string;
  pembimbing1: string;
  pembimbing2: string;
  pembimbing3: string;
  tgl_lulus: string;
  ipk: string;
  predikat: string;
  lama_studi: string;
  no_sk_yudisium: string | null;
  tgl_sk_yudisium: string | null;
  no_seri_ijazah: string;
  wisuda: number;
  tgl_wisuda: string;
  image: string;
  send_email: string;

  study_program: StudyProgram; 
}


interface AlumniCardProps {
  alumni: Alumni;
}

const AlumniCard: React.FC<AlumniCardProps> = ({ alumni }) => {
  return (

    <Link
    href={`/alumni/${alumni.id_alumni}`}>
<div className="flex items-center rounded-md border p-4">
      {/* Avatar */}
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
      <div className="ml-4">
    <h3 className="text-md font-semibold">{alumni.nm_pd}</h3>
    {alumni.study_program.faculty != null && (
            <h5 className="text-sm">{alumni.study_program.faculty.nama_fakultas}</h5>
    )}
    <h5 className="text-sm">{alumni.nama_prodi}</h5>
    <div className="mt-1 gap-1"></div>
</div>

    </div>
    </Link>
  );
};

export default AlumniCard;
