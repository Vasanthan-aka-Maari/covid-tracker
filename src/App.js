import React, { useEffect, useState } from "react";
import axios from "axios";
import uuid from "uuid/dist/v1";
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import "./App.css";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import Table from "./Table";
import { sortData } from "./utils";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [flag, setFlag] = useState("");

  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/all")
      .then((res) => setCountryInfo(res.data));
  });

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await axios.get(url).then((res) => {
      setCountryInfo(res.data);
      setFlag(res.data.countryInfo.flag);
    });
  };

  useEffect(() => {
    const getCountryData = async () => {
      await axios
        .get("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.data)
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountryData();
  }, []);

  return (
    <div className="app">
      {/* Left div */}
      <div className="app-left">
        {/* header */}
        <div className="app-header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app-dropdown">
            <Select
              variant="outlined"
              className="select"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">World wide</MenuItem>
              {countries.map((country) => (
                <MenuItem key={uuid()} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {flag && (
          <div className="flag-container">
            <img src={flag} className="flag" />
          </div>
        )}

        {/* Info boxes */}
        <div className="app-stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
            cls="cases"
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
            cls="recovered"
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
            cls="deaths"
          />
        </div>
        <div className="graph-container">
          <h1>Worldwide new cases</h1>
          {/* Graph */}
          <LineGraph />
        </div>
      </div>

      {/* Right div */}
      <Card className="app-right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
