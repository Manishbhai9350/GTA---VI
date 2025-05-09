import { useState } from "react";
import "./App.css";
import Graphics from "./components/Graphics";
import VI from "./components/VI";

function App() {
  const [IconMorphed, setIconMorphed] = useState(false)
  return (
    <main>
      <section className="landing">
        <VI setIconMorphed={setIconMorphed} />
        {
          IconMorphed && (
            <Graphics animate main />
          )
        }
      </section>
    </main>
  );
}

export default App;
