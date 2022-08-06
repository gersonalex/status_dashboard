import Nav from "./components/Nav";
import CardWrapper from "./components/CardWrapper";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "FactoryFouR";
  }, []);

  return (
    <div>
      <Nav />
      <CardWrapper />
    </div>
  );
}

export default App;
