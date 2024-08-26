import express from "express";
import { getItemFromTable } from "../../services/dynamoService.js"
import dotenv from 'dotenv';

dotenv.config();

const routerGetHelpinho = express.Router();

routerGetHelpinho.get("/helpinho/:id", async (req, res) => {
    const helpinhoId = req.params.id

    try {
        const helpinhoResult = await getItemFromTable(process.env.HELPINHO_TABLE, "helpinhoId", helpinhoId);

        if (!helpinhoResult.Items || helpinhoResult.Items.length === 0) {
            return res.status(404).json({
                error: true,
                message: "Não foi encontrado nenhum helpinho criado em nosso sistema"
            });
        }

        let helpinho = [];
        if (helpinhoResult.Items) {
            helpinhoResult.Items.map((item) => {
                helpinho.push({
                    userId: item.userId.S,
                    userName: item.userName.S,
                    userEmail: item.userEmail.S,
                    title: item.title.S,
                    description: item.description.S,
                    category: item.category.S,
                    image: item.image.S,
                    value: item.value.S,
                    donatedValue: item.donatedValue.N,
                    donors: item.donors.L.map((donor) => ({
                        donorId: String(donor.M.donorId.S),
                        donorAvatar: donor.M.donorAvatar.S,
                        donorName: donor.M.donorName.S,
                        amount: Number(donor.M.amount.N)
                      }))
                });
            });
        }

        return res.status(200).json({
            error: false,
            message: "Helpinho encontrado com sucesso",
            result: helpinho
            
        })

    } catch(err) {
        return res.status(500).json({
            error: true,
            message: `Ocorreu um erro interno no servidor: ${err.message}`
        });
    }
});

export default routerGetHelpinho;