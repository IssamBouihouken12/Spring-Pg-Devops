import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance"; // Import de l'instance personnalisée

const Login = () => {
    const [credentials, setCredentials] = useState({
        nom: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState(""); // Pour afficher les erreurs
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Utilisation de l'axiosInstance pour la requête
            const response = await axiosInstance.post("http://localhost:8080/api/customers/login", credentials, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data.token) {
                const token = response.data.token;
                localStorage.setItem("token", token); // Enregistrement du token dans le localStorage

                // Ajouter le token dans les headers de toutes les futures requêtes
                axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;

                alert("Connexion réussie !");
                navigate("/home"); // Redirection vers la page d'accueil
            } else {
                setErrorMessage("Le serveur n'a pas retourné de token.");
            }
        } catch (error) {
            // Gestion des erreurs
            if (error.response && error.response.status === 401) {
                setErrorMessage("Nom d'utilisateur ou mot de passe incorrect.");
            } else {
                setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
            }
        }
    };

    return (
        <div style={{ padding: "30px", maxWidth: "400px", margin: "auto" }}>
            <h2>Connexion</h2>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Affichage des erreurs */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nom"
                    placeholder="Nom"
                    value={credentials.nom}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", marginBottom: "10px" }}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", marginBottom: "10px" }}
                />
                <button type="submit" style={{ width: "100%" }}>
                    Se connecter
                </button>
                <p>
                    Vous n'avez pas de compte ? <Link to="/register">S'inscrire ici</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
