import React, { useEffect, useState } from "react";

function Usuario() {
  const [usuarios, setUsuarios] = useState([]);

  // Función para cargar los usuarios desde el backend
  const cargarUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/usuarios", {
        credentials: "include", // si usas sesión/cookies
      });
      const data = await res.json();
      if (data.success) {
        setUsuarios(data.data); // asumimos que la respuesta viene en data
      } else {
        console.error("Error al obtener usuarios:", data.message);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  // Cargar los usuarios al montar el componente
  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <div>
      <h2>Usuarios Registrados</h2>
      {usuarios.length === 0 ? (
        <p>No hay usuarios</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Usuario;
