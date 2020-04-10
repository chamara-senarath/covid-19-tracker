import React, { Component } from "react";
import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import styles from "./App.module.css";
import { fetchData } from "./api";
import logo from "./assets/logo.png";
export class App extends Component {
  state = {
    data: {},
    country: null,
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({
      data: fetchedData,
    });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({
      data: fetchedData,
      country: country,
    });
  };
  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
        <div className={styles.footer}>
          <p>© 2020 Digitally Crafted by Chamara Senarath</p>
        </div>
      </div>
    );
  }
}

export default App;
