import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

dotenv.config();

// Criando uma instância do Express
const app = express();
const port = 8080;

// Configurar cookie-parser
app.use(cookieParser());
// Middleware para permitir requisições CORS
app.use(cors({
    origin: process.env.DEV_URL,
    credentials: true,
}));
// Middleware para requisições JSON
app.use(express.json());

// Importando as controllers
import routerLogin from "./controllers/login.js";
import routerRegister from "./controllers/register.js";
import routerCreateHelpinho from "./controllers/helpinho/createHelpinho.js";
import routerListHelpinho from "./controllers/helpinho/listAllHelpinhos.js";
import routerGetHelpinho from "./controllers/helpinho/getHelpinho.js";
import { routerVerifyToken } from "./controllers/verifyToken.js";
import routerLogout from "./controllers/logout.js";
import routerDonateHelp from "./controllers/donateHelp.js";

// Configurando as rotas
app.use("/", routerLogin);
app.use("/", routerRegister);
app.use("/", routerCreateHelpinho);
app.use("/", routerListHelpinho);
app.use("/", routerGetHelpinho);
app.use("/", routerVerifyToken);
app.use("/", routerLogout);
app.use("/", routerDonateHelp);

// // Iniciando o servidor
// app.listen(port, () => {
//     console.log(`Servidor rodando na porta ${port}`);
// });

// Exportando o handler para Serverless
export const handler = serverless(app);