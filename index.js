import express, { response } from "express"
import mysql2 from "mysql2"

const app = express()

app.use(express.json())

const database = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "aluno_projetos",
    password: "aluno@projeto",
    database: "todo_03ma"
})

app.get("/all-task", (request, response) => {
    const selectCommand = "SELECT * FROM ToDo_JoaoReis"

    database.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
            return
        }

        response.json(data)
    })
})

app.get("/active-tasks", (request, response) => {
    const selectCommand = "SELECT * FROM ToDo_JoaoReis WHERE status = 0"

    database.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
            return
        }

        response.json(data)
    })
})

app.get("/recovery-tasks", (request, response) => {
    const selectCommand ="SELECT * FROM ToDo_JoaoReis"
    
})

app.post("/create-task", (request, response) => {
    const { description, status } = request.body

    const insertCommand = "INSERT INTO ToDo_MarcioMarcal(description, status) VALUES (?, ?)"

    database.query(insertCommand, [description, status], (error) => {
        if(error) {
            console.log(error)
        } else {
            response.status(201).json({
                message: "Tarefa criada com sucesso!"
            })
        }
    })
})

app.delete("/delete-task/:id", (request, response) => {
    const { id }  = request.params

    const deleteCommand = "DELETE FROM ToDo_JoaoReis WHERE id=?"

    database.query(deleteCommand, [id], (error) => {
        if(error) {
            console.log(error)
        } else {
            response.json({
                message: "Tarefa apagada com sucesso!"
            })
        }
    })
})

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080")
})