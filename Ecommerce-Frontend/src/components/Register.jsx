import React, { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        nom: "",
        password: "",
        region: "",
        sexe: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/customers/register", formData);
            alert("Inscription réussie !");
        } catch (error) {
            console.error("Erreur lors de l'inscription", error);
            alert("Erreur lors de l'inscription");
        }
    };

    return (
        <div style={{
            padding: "30px",
            maxWidth: "400px",
            margin: "100px auto",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            fontFamily: "Arial, sans-serif"
        }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nom"
                    placeholder="Nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                        border: "1px solid #ccc",
                        borderRadius: "4px"
                    }}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                        border: "1px solid #ccc",
                        borderRadius: "4px"
                    }}
                />
                <input
                    type="text"
                    name="region"
                    placeholder="Région"
                    value={formData.region}
                    onChange={handleChange}
                    required
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                        border: "1px solid #ccc",
                        borderRadius: "4px"
                    }}
                />
                <select
                    name="sexe"
                    value={formData.sexe}
                    onChange={handleChange}
                    required
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                        border: "1px solid #ccc",
                        borderRadius: "4px"
                    }}
                >
                    <option value="">Sélectionner le sexe</option>
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                </select>
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    S'inscrire
                </button>
                <p style={{ marginTop: "15px", textAlign: "center" }}>
                    Vous avez déjà un compte ?
                    <Link to="/login" style={{ color: "#007bff", marginLeft: "5px", textDecoration: "none" }}>
                        Se connecter
                    </Link>
                </p>
            </form>
        </div>
    
    );
};

export default Register;
