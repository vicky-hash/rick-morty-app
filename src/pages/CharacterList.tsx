import { useQuery } from "@tanstack/react-query";
import { fetchCharacters } from "../api/rickAndMorty";
import CharacterTable from "../components/CharacterTable";
import PaginationControls from "../components/PaginationControls";
import { useNavigate, useSearch } from "@tanstack/react-router";
import type { CharacterResponse } from "../types";

export default function CharacterList() {
  const search = useSearch({ from: "/" });
  const navigate = useNavigate({ from: "/" });

  const currentPage = search.page ? Number(search.page) : 1;

  const { data, isLoading, refetch } = useQuery<CharacterResponse>({
    queryKey: ["characters", currentPage],
    queryFn: () => fetchCharacters(currentPage),
    placeholderData: (prev) => prev,
  });

  const handlePageChange = (page: number) => {
    navigate({ search: { page } });
  };

  if (isLoading && !data) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  return (
    <div>
      <h1>Rick & Morty Characters</h1>
      <button onClick={() => refetch()}>Refresh</button>
      <CharacterTable data={data.results} />
      <PaginationControls
        currentPage={currentPage}
        totalPages={data.info.pages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
