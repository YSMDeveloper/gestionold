import React, { useState, useEffect } from "react";
import { Search, Label } from "semantic-ui-react";

const SearchBar = ({ onResultSelect, selectedResult }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearchChange = (event, { value }) => {
    setSearchValue(value);
  };

  const handleResultSelectLocal = (event, { result }) => {
    onResultSelect(result);
  };

  useEffect(() => {
    const getResults = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:3000/api/searchbars/${searchValue}`, {
            method: 'GET',
        })
        const customers = await res.json();
        setResults(customers);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchValue) {
      getResults();
    } else {
      setResults([]);
    }
  }, [searchValue]);

  const renderResults = () => {
    if (isLoading) {
      return <Label content="Loading..." icon="spinner" />;
    } else if (results.length > 0) {
      return results.map((result) => (
        <div key={result._id}>
          <p>{result.rut}</p>
          <p>{result.name} {result.lastname}</p>
        </div>
      ));
    } else {
      return <Label content="No results found." />;
    }
  };

  const renderResultItem = ({ rut, name, lastname }) => {
    return (
      <div key={rut}>
        <p>{rut}</p>
        <p>{name} {lastname}</p>
      </div>
    );
  };

  return (
    <Search
      input={{ fluid: true }}
      placeholder="Rut cliente"
      value={selectedResult || searchValue}
      onSearchChange={handleSearchChange}
      onResultSelect={handleResultSelectLocal}
      loading={isLoading}
      results={results.map(({ _id, rut, name, lastname }) => ({
        id: _id,
        title: rut,
        description: renderResultItem({ rut, name, lastname })
      }))}
    />
  );
};

export default SearchBar;
