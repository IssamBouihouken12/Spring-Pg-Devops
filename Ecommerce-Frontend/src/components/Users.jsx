import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
        nom: '',
        password: '',
        region: '',
        sexe: '',
        role: 'CUSTOMER'
    });
    const navigate = useNavigate();
    const usersPerPage = 10;

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8081/api/customers', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Fetched users:', response.data);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            if (error.response?.status === 403) {
                navigate('/home');
            }
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:8081/api/customers/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                alert('User deleted successfully');
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Error deleting user: ' + (error.response?.data || error.message));
            }
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            nom: user.nom,
            password: user.password,
            region: user.region,
            sexe: user.sexe,
            role: user.role
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8081/api/customers/${editingUser.customerId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setEditingUser(null);
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Calculer les utilisateurs pour la page courante
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    // Gérer le changement de page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div style={{
            padding: '20px',
            maxWidth: '1200px',
            margin: '0 auto',
            marginTop: '80px'
        }}>
            <h2 style={{
                marginBottom: '2rem',
                color: '#333',
                fontSize: '2rem',
                textAlign: 'center'
            }}>User Management</h2>

            <div style={{
                overflowX: 'auto',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                backgroundColor: 'white'
            }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    minWidth: '600px'
                }}>
                    <thead style={{
                        backgroundColor: '#f8f9fa',
                        position: 'sticky',
                        top: 0
                    }}>
                        <tr>
                            <th style={tableHeaderStyle}>ID</th>
                            <th style={tableHeaderStyle}>Name</th>
                            <th style={tableHeaderStyle}>Region</th>
                            <th style={tableHeaderStyle}>Gender</th>
                            <th style={tableHeaderStyle}>Role</th>
                            <th style={tableHeaderStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user.customerId} style={tableRowStyle}>
                                <td style={tableCellStyle}>{user.customerId}</td>
                                <td style={tableCellStyle}>{user.nom}</td>
                                <td style={tableCellStyle}>{user.region}</td>
                                <td style={tableCellStyle}>{user.sexe}</td>
                                <td style={tableCellStyle}>{user.role}</td>
                                <td style={tableCellStyle}>
                                    <div style={{
                                        display: 'flex',
                                        gap: '0.5rem',
                                        flexWrap: 'wrap'
                                    }}>
                                        <button
                                            style={editButtonStyle}
                                            onClick={() => handleEdit(user)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            style={deleteButtonStyle}
                                            onClick={() => handleDelete(user.customerId)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '2rem',
                flexWrap: 'wrap',
                gap: '0.5rem'
            }}>
                <button
                    style={paginationButtonStyle}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        style={{
                            ...paginationButtonStyle,
                            backgroundColor: currentPage === index + 1 ? '#007bff' : '#fff',
                            color: currentPage === index + 1 ? '#fff' : '#007bff'
                        }}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    style={paginationButtonStyle}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

            {editingUser && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <div style={modalHeaderStyle}>
                            <h5 style={{ margin: 0 }}>Edit User</h5>
                            <button
                                style={closeButtonStyle}
                                onClick={() => setEditingUser(null)}
                            >
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleUpdate} style={formStyle}>
                            <div style={formGroupStyle}>
                                <label style={labelStyle}>Name</label>
                                <input
                                    type="text"
                                    style={inputStyle}
                                    name="nom"
                                    value={formData.nom}
                                    onChange={handleChange}
                                />
                            </div>
                            <div style={formGroupStyle}>
                                <label style={labelStyle}>Password</label>
                                <input
                                    type="password"
                                    style={inputStyle}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div style={formGroupStyle}>
                                <label style={labelStyle}>Region</label>
                                <input
                                    type="text"
                                    style={inputStyle}
                                    name="region"
                                    value={formData.region}
                                    onChange={handleChange}
                                />
                            </div>
                            <div style={formGroupStyle}>
                                <label style={labelStyle}>Gender</label>
                                <select
                                    style={inputStyle}
                                    name="sexe"
                                    value={formData.sexe}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </select>
                            </div>
                            <div style={formGroupStyle}>
                                <label style={labelStyle}>Role</label>
                                <select
                                    style={inputStyle}
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="CUSTOMER">Customer</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </div>
                            <button type="submit" style={submitButtonStyle}>
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// Styles
const tableHeaderStyle = {
    padding: '1rem',
    textAlign: 'left',
    borderBottom: '2px solid #dee2e6',
    color: '#495057',
    fontWeight: 'bold'
};

const tableRowStyle = {
    borderBottom: '1px solid #dee2e6',
    ':hover': {
        backgroundColor: '#f8f9fa'
    }
};

const tableCellStyle = {
    padding: '1rem',
    color: '#212529'
};

const editButtonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'background-color 0.3s ease'
};

const deleteButtonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'background-color 0.3s ease'
};

const paginationButtonStyle = {
    padding: '0.5rem 1rem',
    border: '1px solid #007bff',
    backgroundColor: '#fff',
    color: '#007bff',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':disabled': {
        opacity: 0.5,
        cursor: 'not-allowed'
    }
};

const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
};

const modalContentStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '2rem',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflowY: 'auto'
};

const modalHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
};

const closeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#666'
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
};

const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
};

const labelStyle = {
    color: '#495057',
    fontWeight: '500'
};

const inputStyle = {
    padding: '0.5rem',
    border: '1px solid #ced4da',
    borderRadius: '5px',
    fontSize: '1rem'
};

const submitButtonStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem',
    transition: 'background-color 0.3s ease'
};

export default Users; 