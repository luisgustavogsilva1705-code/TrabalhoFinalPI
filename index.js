import express, { response } from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

const host = "0.0.0.0";
const port = 5000;

const server = express();
var usuarioLogin = false;

server.use(session({
    secret: "Acess0S3cre70",
    resave: true,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000* 60* 30
    }

}));

server.use(express.urlencoded({extended: true}));
server.use(express.json());
server.use(cookieParser());

//1- Tela de Login
//2- Menu do sistema
//

server.get("/",(requsicao, resposta)=>{

    resposta.send(`

            <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Login</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                </head>
            <body>


            <form action="/" method="POST"  >
                <div class="mb-3">
                    <label for="Email" class="form-label">Email address</label>
                    <input type="email" name="loginEmail" class="form-control" id="Email" aria-describedby="emailHelp">
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="Senha" class="form-label">Password</label>
                    <input type="password" name="loginSenha" class="form-control" id="Senha">
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                </form>

            </body>
            </html>
        `);

});


server.post("/",(requisicao, resposta)=>{
    const {loginEmail, loginSenha} = requisicao.body;

    if(loginEmail === "admin@email.com" && loginSenha === "senha")
    {
        requisicao.session.usuarioLogin={

            online:true,
            usuarioLogin: "Administrador"
        };
        resposta.redirect("/menu");
    }
    else{
            resposta.write(
            `
            <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Login</title>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                    </head>
                <body>


                <form action="/" method="POST"  >
                    <div class="mb-3">
                        <label for="Email" class="form-label">Email address</label>
                        <input type="email" name="loginEmail" class="form-control" id="Email" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="Senha" class="form-label">Password</label>
                        <input type="password" name="loginSenha" class="form-control" id="Senha">
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1">
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>

                    <div>
                        <p>Usuário ou Senha Incorretos, Tente Novamente</p>
                    </div>

                    <button type="submit" class="btn btn-primary">Entrar</button>
                    </form>

                </body>
                </html>
            
            `
        );
    }
});

server.get("/menu",(requisicao, resposta)=>{
    resposta.send(`
        <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Menu de Sistema</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                </head>
            <body>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <p class="navbar-brand">E-Sportes</p>
                        <div class="collapse navbar-collapse" id="navbarText">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="/cadastroEquipes">Cadastro de Equipes</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Cadastro de Jogadores</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Lista de Equipes</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Lista de Jogadores</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </body>
        </html>
        `
    );
});

server.get("/cadastroEquipes",(requisicao, resposta)=>{
    resposta.send(`
        <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Login</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                </head>
            <body>
                <h3 style="text-align: center; text-decoration:underline; color: red;" >Cadastro de Equipes E-Sportes</h3>
                <div style="display:flex; justify-content:center; align-items:center; height:100vh;">
                
                    <form action="/listaEquipes" method="POST" style="width:300px; width:300px; padding:20px; border:2px solid #444; border-radius:10px;">

                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Nome da Equipe:</label>
                        <input type="text" name="nomeEquipe" style="width:100%; padding:10px; margin-bottom:15px; border-radius:5px; border:1px solid #ccc;">

                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Nome do Capitão:</label>
                        <input type="text" name="nomeCapitao" style="width:100%; padding:10px; margin-bottom:15px; border-radius:5px; border:1px solid #ccc;">

                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Contato (WhatsApp):</label>
                        <input type="text" name="contato" style="width:100%; padding:10px; margin-bottom:20px; border-radius:5px; border:1px solid #ccc;">

                        <button type="submit" style="width:100%; padding:12px; background:#007bff; color:white; border:none; border-radius:5px; font-size:16px; cursor:pointer;">
                            Enviar
                        </button>

                    </form>
                </div>
            </body>
        </html>
        `
    );
});



server.listen(port, host, () =>{
    console.log(`http://localhost:5000/`)
});