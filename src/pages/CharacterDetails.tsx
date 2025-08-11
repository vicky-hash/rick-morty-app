import { useQuery } from "@tanstack/react-query";
import { fetchCharacterById } from "../api/rickAndMorty";
import { useParams } from "@tanstack/react-router";

export default function CharacterDetails() {
  const { id } = useParams({ from: "/character/$id" });
  const { data, isLoading } = useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacterById(Number(id)),
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  return (
    <div>
      <h2>{data.name}</h2>
      <img src={data.image} alt={data.name} />
      <p>Status: {data.status}</p>
      <p>Species: {data.species}</p>
    </div>
  );
}
