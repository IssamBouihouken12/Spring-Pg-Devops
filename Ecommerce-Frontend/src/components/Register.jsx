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
        <div style={{ padding: "30px", maxWidth: "400px", margin: "auto" }}>
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nom"
                    placeholder="Nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", marginBottom: "10px" }}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", marginBottom: "10px" }}
                />
                <input
                    type="text"
                    name="region"
                    placeholder="Région"
                    value={formData.region}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", marginBottom: "10px" }}
                />
                <select
                    name="sexe"
                    value={formData.sexe}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", marginBottom: "10px" }}
                >
                    <option value="">Sélectionner le sexe</option>
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                </select>
                <button type="submit" style={{ width: "100%" }}>
                    Register
                </button>
                <Link to="/login">You have already an account ? Login</Link>
            </form>
        </div>
    );
};

export default Register;
