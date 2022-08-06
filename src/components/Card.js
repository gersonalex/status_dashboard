import { CardStyle } from "../styles/CardStyle";
import { API_OPTIONS } from "../settings";

export default function Card({ services }) {
  const servicesNames = API_OPTIONS;

  //   console.log(services);

  services.forEach((service) => {
    const date = new Date(service.data.time);
    service.data.time =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  });

  return (
    <>
      {servicesNames.map((apiName) => {
        const service = services.find((service) => service.name === apiName);
        // console.log(service);

        return (
          <>
            <CardStyle>
              <p className="name">{apiName.toUpperCase()}</p>
              {service === undefined ? (
                <>
                  <p className="error">Error</p>
                  <p>OUTAGE</p>
                  <p>403</p>
                  <p>Forbidden</p>
                </>
              ) : (
                <>
                  <p className="success">Success</p>
                  <p className="hostname">{service.data.hostname}</p>
                  <p>{service.data.time}</p>
                </>
              )}
            </CardStyle>
          </>
        );
      })}
    </>
  );
}
