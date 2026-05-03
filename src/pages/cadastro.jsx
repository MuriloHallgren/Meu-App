import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "", senha: "", nome: "", sobrenome: "", dataNascimento: ""
  });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, form.email, form.senha
      );
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "usuarios", uid), {
        uid,
        nome: form.nome,
        sobrenome: form.sobrenome,
        dataNascimento: form.dataNascimento,
        email: form.email,
      });

      setSucesso("Cadastro realizado com sucesso!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setErro("Erro ao cadastrar: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleCadastro} style={styles.card}>
        <h2 style={styles.titulo}>Cadastro</h2>

        <input style={styles.input} type="text"    name="nome"           placeholder="Nome"            value={form.nome}           onChange={handleChange} required />
        <input style={styles.input} type="text"    name="sobrenome"      placeholder="Sobrenome"       value={form.sobrenome}      onChange={handleChange} required />
        <input style={styles.input} type="email"   name="email"          placeholder="E-mail"          value={form.email}          onChange={handleChange} required />
        <input style={styles.input} type="password" name="senha"         placeholder="Senha"           value={form.senha}          onChange={handleChange} required />
        <input style={styles.input} type="date"    name="dataNascimento" placeholder="Data Nascimento" value={form.dataNascimento} onChange={handleChange} required />

        {erro    && <p style={styles.erro}>{erro}</p>}
        {sucesso && <p style={styles.sucesso}>{sucesso}</p>}

        <button style={styles.botao} type="submit">Cadastrar</button>
        <p style={styles.link} onClick={() => navigate("/login")}>
          Já tem conta? <span style={styles.linkSpan}>Faça login</span>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: { display:"flex", justifyContent:"center", alignItems:"center", minHeight:"100vh", background:"#0f172a" },
  card: { background:"#1e293b", padding:"2.5rem", borderRadius:"1rem", width:"100%", maxWidth:"420px", display:"flex", flexDirection:"column", gap:"1rem", boxShadow:"0 25px 50px rgba(0,0,0,0.5)" },
  titulo: { color:"#f8fafc", textAlign:"center", marginBottom:"0.5rem", fontSize:"1.8rem" },
  input: { padding:"0.85rem 1rem", borderRadius:"0.5rem", border:"1px solid #334155", background:"#0f172a", color:"#f8fafc", fontSize:"1rem", outline:"none" },
  botao: { padding:"0.9rem", background:"#3b82f6", color:"#fff", border:"none", borderRadius:"0.5rem", fontSize:"1rem", cursor:"pointer", fontWeight:"bold", marginTop:"0.5rem" },
  erro: { color:"#f87171", textAlign:"center", fontSize:"0.875rem" },
  sucesso: { color:"#4ade80", textAlign:"center", fontSize:"0.875rem" },
  link: { color:"#94a3b8", textAlign:"center", fontSize:"0.875rem", cursor:"pointer" },
  linkSpan: { color:"#3b82f6", fontWeight:"bold" }
};