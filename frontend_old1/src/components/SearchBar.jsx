import "../components/searchbar.css";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="search-input"
      placeholder="Buscar notas por título..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
