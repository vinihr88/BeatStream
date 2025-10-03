import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const RAPID_API_KEY = "SUA_CHAVE_AQUI";
const RAPID_API_HOST = "musicapi13.p.rapidapi.com";

// Rota proxy para buscar músicas
app.get("/api/search", async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: "Faltando parâmetro q" });
    }

    try {
        const url = `https://${RAPID_API_HOST}/public/search/introspection?q=${encodeURIComponent(query)}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": RAPID_API_KEY,
                "X-RapidAPI-Host": RAPID_API_HOST
            }
        });

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao buscar na API" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));
