import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Style.css";
import AppuntiList from "./AppuntiList";
import GruppiList from "./GruppiList";
import ProfiloWidget from "./ProfiloWidget";

function HomePage() {
  const [clickBoxes, setClickBoxes] = useState([]);
  const [username, setUsername] = useState("Utente123");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const containerRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null); // Aggiungi lo stato per l'anteprima dell'immagine

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Prendi il file caricato
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Crea un URL temporaneo per il file
      setImagePreview(imageUrl); // Salva l'URL dell'immagine nel state
      console.log("Foto caricata:", file);
    }
  };
  const [expandedMaterie, setExpandedMaterie] = useState([
    "Matematica",
    "Fisica",
  ]);
  const [materie, setMaterie] = useState([
    {
      nome: "Matematica",
      appunti: [
        {
          titolo: "Algebra",
          commento: "Appunto su Algebra",
          autore: "Mario Rossi",
          dataCreazione: "01/01/2025",
        },
        {
          titolo: "Geometria",
          commento: "Appunto su Geometria",
          autore: "Luigi Bianchi",
          dataCreazione: "02/01/2025",
        },
      ],
    },
    {
      nome: "Fisica",
      appunti: [
        {
          titolo: "Meccanica",
          commento: "Appunto su Meccanica",
          autore: "Giulia Verdi",
          dataCreazione: "03/01/2025",
        },
        {
          titolo: "Ottica",
          commento: "Appunto su Ottica",
          autore: "Anna Neri",
          dataCreazione: "04/01/2025",
        },
      ],
    },
  ]);

  const handleAppuntoClick = (appunto) => {
    // Logica per gestire il click su un appunto
  };
  const handleGruppiClick = (gruppo) => {
    // Logica per gestire il click su un gruppo
  };

  useEffect(() => {
    const storedBoxes = JSON.parse(localStorage.getItem("clickBoxes")) || [];
    setClickBoxes(storedBoxes);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const container = containerRef.current;
      let startX = 0;

      const handleTouchStart = (e) => {
        startX = e.touches[0].clientX;
      };

      const handleTouchMove = (e) => {
        const diffX = startX - e.touches[0].clientX;
        container.scrollLeft += diffX;
        startX = e.touches[0].clientX;
      };

      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchmove", handleTouchMove);

      return () => {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
      };
    }
  }, [isMobile]);

  return (
    <div className="homepage">
      <div className="columns" ref={containerRef}>
        <div className="column" id="sinistra">
          <div className="neutral-zone">
            <ProfiloWidget
              imagePreview={imagePreview}
              handleFileChange={handleFileChange}
              username={username}
            />
          </div>
          <AppuntiList
            expandedMaterie={expandedMaterie}
            materie={materie}
            handleAppuntoClick={handleAppuntoClick}
            recent={true} // Passa la proprietà recent
          />
        </div>
        {/* Colonna DESTRA */}
        <div className="column" id="destra">
          <GruppiList
            expandedMaterie={expandedMaterie}
            materie={materie}
            handleGruppiClick={handleGruppiClick}
          />
        </div>
      </div>
    </div>
  );
}

function ClickBoxContainer({ clickBoxes }) {
  return (
    <div className="click-box-container">
      {clickBoxes.map((box, index) => (
        <div className="box clickable" key={index}>
          {box.title}
        </div>
      ))}
    </div>
  );
}

export default HomePage;
