import { FormControl, Card, MenuItem, Select, InputLabel, CardContent } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import sortData from "./util";
import LineGraph from "./LineGraph";



const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));



function App() {
	const classes = useStyles();
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState("Worldwide");
	const [countryInfo, setCountryInfo] = useState({});
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		fetch("https://corona.lmao.ninja/v3/covid-19/all")
			.then((response) => response.json())
			.then((data) => {

				setCountryInfo(data);

			});

	}, []);

	useEffect(() => {
		const getCountriesData = async () => {
			await fetch("https://corona.lmao.ninja/v3/covid-19/countries")
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((country) => (
						{
							name: country.country,   // united states, united kindom
							value: country.countryInfo.iso2  // USA, UK
						}
					));
					const sortedData = sortData(data);
					setTableData(sortedData);
					setCountries(countries);
				});
		};
		getCountriesData();

	}, []);

	const onCountryChange = async (event) => {
		const countryCode = event.target.value;

		setCountry(countryCode);
		const url = countryCode === "Worldwide" ? "https://corona.lmao.ninja/v3/covid-19/all" : `https://corona.lmao.ninja/v3/covid-19/countries/${countryCode}`;
		await fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setCountry(countryCode);
				setCountryInfo(data);

			});
	};
	console.log("Country Info ", countryInfo)

	return (
		<div className="app">

			<div className="app_left">
				<div className="app_header">
					<h1>Covid-19 tracker</h1>
					<FormControl className={classes.formControl} variant="outlined">
						<InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={country}
							label="Country"
							onChange={onCountryChange}
						>
							{/* all countries as dropdown options */}
							<MenuItem value="Worldwide">Worldwide</MenuItem>
							{countries.map((country) => (
								<MenuItem value={country.value}>{country.name}</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>

				<div className="app_stats">
					<InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
					<InfoBox title="Recoverd" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
					<InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
				</div>

				<div>
					
					
				</div>
				<div>
					<Map />
				</div>

			</div>


			<Card className="app_right">

				<CardContent>
					<h3>Live Cases by country</h3>

					<Table countries={tableData} />
					<h3>Worldwide new cases</h3>
					<LineGraph />
				</CardContent>



				{/*Graph*/}

			</Card>


		</div>


	);
}

export default App;
