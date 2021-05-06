import { useState } from "react";
import { RGBColor, SketchPicker } from "react-color";
import axios from "axios";
import styled from "styled-components";

export default function Home() {
  const [color, setColor] = useState<RGBColor>({ r: 255, g: 255, b: 255 });
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    try {
      setLoading(true);

      await axios.post("/api/update-color", {
        red: color.r,
        green: color.g,
        blue: color.b,
      });
    } catch (error) {
      alert("Ocorreu um erro! Verifique o console para mais informações");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <h1>Escolha uma Cor</h1>

      <Picker
        onChange={(c) => setColor(c.rgb)}
        color={color}
        disableAlpha={true}
      />

      <button onClick={handleConfirm} disabled={loading}>
        {loading ? "Aguarde..." : "Confirmar"}
      </button>
    </Container>
  );
}

const Container = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  background-color: #121212;

  h1 {
    font-size: 3em;
    font-weight: bold;
    font-family: sans-serif;
    color: #ababab;
    margin-bottom: 3rem;
  }

  button {
    margin-top: 2rem;
    background-color: #c395fd;
    color: #07010e;
    padding: 0.5em 2em;
    border: none;
    border-radius: 1em;
    text-transform: uppercase;
    font-size: 1.5em;
    font-weight: bold;
    cursor: pointer;

    &:active {
      opacity: 0.8;
    }
  }
`;

const Picker = styled(SketchPicker)`
  background-color: #212121 !important;
  padding: 20px !important;
`;
