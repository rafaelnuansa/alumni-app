import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { BASE_URL, SECRET_KEY_HEADER } from "@/lib/constants";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebounce } from "use-debounce";

interface Faculty {
  id_fak: number;
  nama_fakultas: string;
  initial: string;
}

interface SearchFilterProps {
  onSearch: (query: string, faculty: string) => void;
}

export default function SearchFilter({ onSearch }: SearchFilterProps) {
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [query, setQuery] = useState(""); // Initial state for query
  const [debouncedQuery] = useDebounce(query, 750); // Debounce the query value

  const facultyQuery = searchParams.get('faculty');

  useEffect(() => {
    if (facultyQuery) {
      setSelectedFaculty(facultyQuery);
    }
  }, [facultyQuery]);

  useEffect(() => {
    fetchFaculties();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedQuery) {
      params.set('q', debouncedQuery); // Use debouncedQuery for the query parameter
    } else {
      params.delete('q');
    }
    if (selectedFaculty) {
      params.set('faculty', selectedFaculty);
    } else {
      params.delete('faculty');
    }
    replace(`${pathname}?${params.toString()}`);
  }, [debouncedQuery, selectedFaculty, pathname, replace, searchParams]);

  useEffect(() => {
    const queryParam = searchParams.get('q');
    if (queryParam) {
      setQuery(queryParam);
    }
  }, [searchParams]);

  const fetchFaculties = async () => {
    try {
      const response = await fetch(`${BASE_URL}/faculties`, {
        headers: {
          'DSIT-UNIDA': SECRET_KEY_HEADER // Set the DSIT-UNIDA header
        }
      });
      if (response.ok) {
        const data = await response.json();
        setFaculties(data);
      } else {
        console.error("Failed to fetch faculties:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching faculties:", error);
    }
  };

  const handleSearch = () => {
    onSearch(debouncedQuery, selectedFaculty); // Use debouncedQuery for search
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4 space-y-4 md:space-y-0">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 ">
        <select
          className="w-full md:w-[250px] border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedFaculty}
          onChange={(e) => setSelectedFaculty(e.target.value)}
        >
          <option value="">Pilih fakultas</option>
          {faculties.map((faculty) => (
            <option key={faculty.id_fak} value={faculty.initial}>
              {faculty.nama_fakultas}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col md:flex-row md:items-center w-full space-y-4 md:space-y-0 md:space-x-4">
        <Input
          type="text"
          placeholder="Cari alumni berdasarkan nama/nim/nipd"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update query state
        />

        <Button onClick={handleSearch}>
          <Search className="me-2 h-4 w-4" /> Search
        </Button>
      </div>
    </div>
  );
}
