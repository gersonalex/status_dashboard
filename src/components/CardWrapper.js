import { CardWrapperStyle, Wrapper } from "../styles/CardStyle";
import { API_OPTIONS } from "../settings";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

export default function CardWrapper() {
  const urls = API_OPTIONS;
  const [services, setService] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  let endpoints = [];

  urls.forEach((url) => {
    endpoints = [
      ...endpoints,
      {
        service: url,
        url: "https://api.factoryfour.com/" + url + "/health/status",
      },
    ];
  });

  const fetchAPI = () => {
    setLoading(true);
    console.log("loading...");
    axios
      .all(
        endpoints.map((endpoint) =>
          axios
            .get(endpoint.url)
            .then((data) =>
              setService((service) => [
                ...service,
                { data: data.data, name: endpoint.service },
              ])
            )
            .catch(() => setError(endpoint))
        )
      )
      .then(() => {
        setLoading(false);
        console.log("services fetched");
      });
  };

  useEffect(() => {
    fetchAPI();
    setInterval(() => {
      setService([]);
      fetchAPI();
    }, 15000);
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <CardWrapperStyle>
        {!loading && <Card services={services} error={error} />}
      </CardWrapperStyle>
    </Wrapper>
  );
}
