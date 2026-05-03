import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Principal() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [dados, setDados] = useState(null);

  useEffect(() => {
    async function buscarDados() {
      if (currentUser) {
        const docRef = doc(db, "usuarios", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setDados(docSnap.data());
      }
    }
    buscarDados();
  }, [currentUser]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.titulo}>Página Principal</h2>
        {dados ? (
          <div style={styles.info}>
            <p style={styles.campo}><span style={styles.label}>Nome:</span> {dados.nome}</p>
            <p style={styles.campo}><span style={styles.label}>Sobrenome:</span> {dados.sobrenome}</p>
            <p style={styles.campo}><span style={styles.label}>Data de Nascimento:</span> {dados.dataNascimento}</p>
            <p style={styles.campo}><span style={styles.label}>E-mail:</span> {dados.email}</p>
          </div>
        ) : (
          <p style={{ color:"#94a3b8" }}>Carregando dados...</p>
        )}
        <button style={styles.botao} onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
}

const styles = {
  container: { display:"flex", justifyContent:"center", alignItems:"center", minHeight:"100vh", background:"#0f172a" },
  card: { background:"#1e293b", padding:"2.5rem", borderRadius:"1rem", width:"100%", maxWidth:"480px", display:"flex", flexDirection:"column", gap:"1.5rem", boxShadow:"0 25px 50px rgba(0,0,0,0.5)" },
  titulo: { color:"#f8fafc", textAlign:"center", fontSize:"1.8rem", marginBottom:"0.5rem" },
  info: { display:"flex", flexDirection:"column", gap:"0.75rem", background:"#0f172a", padding:"1.5rem", borderRadius:"0.75rem" },
  campo: { color:"#f8fafc", fontSize:"1rem", margin:0 },
  label: { color:"#3b82f6", fontWeight:"bold", marginRight:"0.5rem" },
  botao: { padding:"0.9rem", background:"#ef4444", color:"#fff", border:"none", borderRadius:"0.5rem", fontSize:"1rem", cursor:"pointer", fontWeight:"bold" }
};