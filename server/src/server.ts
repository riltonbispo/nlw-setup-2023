import Fastify from "fastify";
import cors from "@fastify/cors"
import { appRoutes } from "./routes";

const app = Fastify()

// para o front end ter acesso ao back
app.register(cors)
app.register(appRoutes)


app.listen({
  port: 5000,
  host: "0.0.0.0"
}).then(()=>{
  console.log('rodando')
})