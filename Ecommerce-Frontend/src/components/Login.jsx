import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance"; // Import de l'instance personnalisée
import { useAppContext } from "../Context/Context";

const Login = () => {
    const [credentials, setCredentials] = useState({
        nom: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState(""); // Pour afficher les erreurs
    const navigate = useNavigate();
    const { login } = useAppContext();

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

                // Récupérer les informations de l'utilisateur pour obtenir son rôle
                const userResponse = await axiosInstance.get(`http://localhost:8080/api/customers/username/${credentials.nom}`);
                const userRole = userResponse.data.role;
                
                // Mettre à jour le contexte avec le rôle et le token
                login(userRole, token);

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
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <div
                style={{
                    background: "#fff",
                    padding: "40px",
                    borderRadius: "12px",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                    maxWidth: "400px",
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Connexion</h2>

                {errorMessage && (
                    <p style={{ color: "red", textAlign: "center", marginBottom: "15px" }}>
                        {errorMessage}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="nom"
                        placeholder="Nom d'utilisateur"
                        value={credentials.nom}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "15px",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            fontSize: "14px",
                        }}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "20px",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            fontSize: "14px",
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "12px",
                            backgroundColor: "#4A90E2",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "16px",
                            cursor: "pointer",
                            transition: "background 0.3s ease",
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#3c7dc3")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#4A90E2")}
                    >
                        Se connecter
                    </button>
                </form>

                <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
                    Vous n'avez pas de compte ?{" "}
                    <Link to="/register" style={{ color: "#4A90E2", textDecoration: "none" }}>
                        S'inscrire ici
                    </Link>
                </p>
            </div>
        </div>

    );
};

export default Login;
