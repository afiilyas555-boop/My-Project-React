import { useState } from "react";

function GestionEtudiant({ etudiantsInitiaux, filieres }) {
  const [etudiants, setEtudiants] = useState(etudiantsInitiaux);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [note, setNote] = useState("");
  const [filiere, setFiliere] = useState("");

  function ajouterEtudiant(e) {
    e.preventDefault();
