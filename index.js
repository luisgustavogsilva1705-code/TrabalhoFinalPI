import express, { response } from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

const host = "0.0.0.0";
const port = 5000;

const server = express();
var usuarioLogin = false;
var lista_Equipe =[];
var lista_Jogadores=[];

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
                </div>
                <div class="mb-3">
                    <label for="Senha" class="form-label">Password</label>
                    <input type="password" name="loginSenha" class="form-control" id="Senha">
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

function validarAcesso(requisicao, resposta, next)
{
    if(requisicao.session?. usuarioLogin?. logado )
    {
        next();
    }
    else
    {
        resposta.redirect("/");
    }
}

server.get("/menu",validarAcesso,(requisicao, resposta)=>{

    let ultimoAcesso = requisicao.cookies?.ultimoAcesso;
    const data= new Date();
    resposta.cookie("ultimoAcesso",data.toLocaleString());


    resposta.setHeader("Content-Type", "text/html");
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
                        <p class="navbar-brand" style="color: green;">E-Sportes</p>
                        <div class="collapse navbar-collapse" id="navbarText">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="/cadastroEquipes">Cadastro de Equipes</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/cadastroJogadores">Cadastro de Jogadores</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/listaEquipes">Lista de Equipes</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/listaJogadores">Lista de Jogadores</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div>
                    <p style="color: green;">Ultimo Acesso na página ${ultimoAcesso || "Primeiro Acesso"}</p>
                </div>
            </body>
        </html>
        `
    );
});

server.get("/cadastroEquipes", validarAcesso,(requisicao, resposta)=>{
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
                
                    <form action="/cadastroEquipes" method="POST" style="width:300px; width:300px; padding:20px; border:2px solid #444; border-radius:10px;">

                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Nome da Equipe:</label>
                        <input type="text" name="nomeEquipe" style="width:100%; padding:10px; margin-bottom:15px; border-radius:5px; border:1px solid #ccc;">

                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Nome do Capitão:</label>
                        <input type="text" name="nomeCapitao" style="width:100%; padding:10px; margin-bottom:15px; border-radius:5px; border:1px solid #ccc;">

                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Contato (WhatsApp):</label>
                        <input type="text" name="contato" style="width:100%; padding:10px; margin-bottom:20px; border-radius:5px; border:1px solid #ccc;">

                        <button type="submit" style="width:100%; padding:12px; background:#007bff; color:white; border:none; border-radius:5px; font-size:16px; cursor:pointer;">
                            Enviar
                        </button>
                        <br>
                        <br>
                        <a href="/menu" style="display:block; text-align:center; width:100%; padding:12px; background:#6c757d; color:white; border-radius:5px; font-size:16px; text-decoration:none; cursor:pointer;">
                            Voltar
                        </a>
                        

                    </form>
                </div>
            </body>
        </html>
        `
    );
});

server.post('/cadastroEquipes', validarAcesso,(requisicao, resposta)=>{

    const nomeEquipe= requisicao.body.nomeEquipe;
    const nomeCapitao= requisicao.body.nomeCapitao;
    const contato= requisicao.body.contato;

    if(nomeEquipe && nomeCapitao && contato)
    {
        lista_Equipe.push({nomeEquipe,nomeCapitao, contato, jogadores:[]});
        resposta.redirect("/listaEquipes");
    }
    else
    {
        let cont=`
            <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Cadastro de Equipe</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                </head>
            <body>
                <h3 style="text-align: center; text-decoration:underline; color: red;" >Cadastro de Equipes E-Sportes</h3>
                <div style="display:flex; justify-content:center; align-items:center; height:100vh;">
                
                    <form action="/cadastroEquipes" method="POST" style="width:300px; width:300px; padding:20px; border:2px solid #444; border-radius:10px;">

                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Nome da Equipe:</label>
                        <input type="text" value="${nomeEquipe}" name="nomeEquipe" style="width:100%; padding:10px; margin-bottom:15px; border-radius:5px; border:1px solid #ccc;">`
        if(!nomeEquipe)
        {
            cont+=`
                <div>
                    <p style="color: red" >Deve-se preencher esse campo</p>
                </div>
            `
        }
        cont+=`
                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Nome do Capitão:</label>
                        <input type="text" value="${nomeCapitao}" name="nomeCapitao" style="width:100%; padding:10px; margin-bottom:15px; border-radius:5px; border:1px solid #ccc;">`
        if(!nomeCapitao)
        {
            cont+=`
            <div>
                <p style="color:red" >Deve-se preencher esse campo</p>
            </div>
            `
        }
        cont+=`
                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Contato (WhatsApp):</label>
                        <input type="text" value="${contato}" name="contato" style="width:100%; padding:10px; margin-bottom:20px; border-radius:5px; border:1px solid #ccc;">`
        if(!contato)
        {
            cont+=`
            <div>
                <p style="color:red" >Deve-se preencher esse campo</p>
            </div>
            `
        }
        cont+=`
                        <button type="submit" style="width:100%; padding:12px; background:#007bff; color:white; border:none; border-radius:5px; font-size:16px; cursor:pointer;">
                            Enviar
                        </button>   
                        <br>
                        <br>
                        <a href="/menu" style="display:block; text-align:center; width:100%; padding:12px; background:#6c757d; color:white; border-radius:5px; font-size:16px; text-decoration:none; cursor:pointer;">
                            Voltar
                        </a>

                    </form>
                </div>
            </body>
        </html>
        `
        resposta.send(cont);
    }

});

server.get("/listaEquipes", validarAcesso,(requisicao, resposta)=>{
    let conteudo=`
        <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Equipes E-Sports</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                </head>
            <body>
                <table class="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th>Nome da Equipe</td>
                            <th>Nome do Capitão da Equipe</td>
                            <th>Contato da Equipe</td>
                        </tr>
                    </thead>
        
                    <tbody>`;
                for(let i = 0; i<lista_Equipe.length; i++)
                {
                    conteudo+=`
                        <tr>
                            <td>${lista_Equipe[i].nomeEquipe}</td>
                            <td>${lista_Equipe[i].nomeCapitao}</td>
                            <td>${lista_Equipe[i].contato}</td>
                        </tr>
                    `;
                }
                conteudo+=`
                </tbody>
                </table>

                <a href="/menu" style="display:block; text-align:center; width:100%; padding:12px; background:#6c757d; color:white; border-radius:5px; font-size:16px; text-decoration:none; cursor:pointer;">
                Voltar
                </a>
                <br>
                <br>
                <a href="/cadastroEquipes" style="display:block; text-align:center; width:100%; padding:12px; background:#6c757d; color:white; border-radius:5px; font-size:16px; text-decoration:none; cursor:pointer;">
                Cadastrar mais Equipes
                </a>

            </body>
            </html>
                `;
                    
    resposta.send(conteudo);
});

server.get("/cadastroJogadores", validarAcesso,(requisicao,resposta)=>{
    
    let boxEquipes = "";
    for(let i = 0; i < lista_Equipe.length; i++) 
    {

        boxEquipes += `
            <label style="display:block; margin-bottom:5px;">
                <input type="checkbox" name="equipe" value="${lista_Equipe[i].nomeEquipe}">
                ${lista_Equipe[i].nomeEquipe}
            </label>
        `;
    }

    resposta.send(`
        <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Equipes E-Sports</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                </head>
            <body>

                <h3 style="text-align: center; text-decoration:underline; color: red;" >Cadastro de Jogadores E-Sportes</h3>

                <div style="display:flex; justify-content:center; align-items:center; height:100vh;">
                    
                <form action="/cadastroJogadores" method="POST" 
                    style="width:600px; padding:20px; border:2px solid #444; border-radius:10px;">

                    <div style="display:flex; gap:20px;">

                        <div style="width:50%;">
                            <label style="display:block; margin-bottom:5px; font-weight:bold;">Nome do Jogador:</label>
                            <input type="text" name="nomeJogador" style="width:100%; padding:10px; margin-bottom:15px; border-radius:5px; border:1px solid #ccc;">

                            <label style="display:block; margin-bottom:5px; font-weight:bold;">Nickname:</label>
                            <input type="text" name="nickname" style="width:100%; padding:10px; margin-bottom:15px; border-radius:5px; border:1px solid #ccc;">

                            <label style="display:block; margin-bottom:5px; font-weight:bold;">Rota do jogador:</label>
                            <input type="text" name="rota" style="width:100%; padding:10px; margin-bottom:20px; border-radius:5px; border:1px solid #ccc;">
                        </div>

                        <div style="width:50%;">
                            <label style="display:block; margin-bottom:5px; font-weight:bold;">Elo do jogador:</label>
                            <input type="text" name="elo" style="width:100%; padding:10px; margin-bottom:20px; border-radius:5px; border:1px solid #ccc;">

                            <label style="display:block; margin-bottom:5px; font-weight:bold;">Gênero:</label>
                            <input type="text" name="genero" style="width:100%; padding:10px; margin-bottom:20px; border-radius:5px; border:1px solid #ccc;">

                            <label style="display:block; margin-bottom:5px; font-weight:bold;">Equipe:</label>
                            ${boxEquipes}
                        </div>

                    </div>

                    <button type="submit" style="width:100%; margin-top:10px; padding:12px; background:#007bff; color:white; border:none; border-radius:5px; font-size:16px; cursor:pointer;">
                        Enviar
                    </button>
                    <br>
                    <br>
                    <a href="/menu" style="display:block; text-align:center; width:100%; padding:12px; background:#6c757d; color:white; border-radius:5px; font-size:16px; text-decoration:none; cursor:pointer;">
                        Voltar
                    </a>

                </form>
                </div>
            </body>
            </html>
        `
    );

});

server.post("/cadastroJogadores", validarAcesso,(requisicao,resposta)=>{

    const nomeJogador=requisicao.body.nomeJogador;
    const nickname = requisicao.body.nickname;
    const rota = requisicao.body.rota;
    const elo = requisicao.body.elo;
    const genero = requisicao.body.genero;
    const equipe = requisicao.body.equipe;


    const jogadoresEquipe = lista_Jogadores.filter(jogadores => jogadores.equipe === equipe);
    let equipecheia="";
    if (jogadoresEquipe.length >= 5) 
    {
        equipecheia = `A equipe ${equipe} está cheia`;
    }


    if(nomeJogador && nickname && rota && elo && genero && equipe && jogadoresEquipe.length < 5)
    {
        lista_Jogadores.push({nomeJogador,nickname,rota,elo,genero,equipe});
        resposta.redirect("/listaJogadores");
    }
    else
    {  
        let conteudo=`
        <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Equipes E-Sports</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                </head>
            <body>

                <h3 style="text-align: center; text-decoration:underline; color: red;" >Cadastro de Jogadores E-Sportes</h3>

                <div style="display:flex; justify-content:center; align-items:center; height:100vh;">
                    
                <form action="/cadastroJogadores" method="POST" 
                    style="width:600px; padding:20px; border:2px solid #444; border-radius:10px;">

                    <div style="display:flex; gap:20px;">

                        <div style="width:50%;">
                            <label style="display:block; margin-bottom:5px; font-weight:bold;">Nome do Jogador:</label>
                            <input type="text" name="nomeJogador" value="${nomeJogador}" style="width:100%; padding:10px; margin-bottom:15px; border-radius:5px; border:1px solid #ccc;">`;
    if(!nomeJogador)
    {
        conteudo+=`
        <div>
            <p style="color: red;">Deve-se preencher esse campo</p>
        </div>
        `
    }
    conteudo+=`

                            <label style="display:block; margin-bottom:5px; font-weight:bold;">Nickname:</label>
                            <input type="text" name="nickname" value="${nickname}" style="width:100%; padding:10px; margin-bottom:15px; border-radius:5px; border:1px solid #ccc;">`;
    if(!nickname)
    {
        conteudo+=`
        <div>
            <p style="color: red;">Deve-se preencher esse campo</p>
        </div>
        `
    }
    conteudo+=`
                            <label style="display:block; margin-bottom:5px; font-weight:bold;">Rota do jogador:</label>
                            <input type="text" name="rota" value="${rota}" style="width:100%; padding:10px; margin-bottom:20px; border-radius:5px; border:1px solid #ccc;">`
    if(!rota)
    {
        conteudo+=`
        <div>
            <p style="color: red;">Deve-se preencher esse campo</p>
        </div>
        `
    }
    conteudo+=`</div>

                        <div style="width:50%;">
                            <label style="display:block; margin-bottom:5px; font-weight:bold;">Elo do jogador:</label>
                            <input type="text" name="elo" value="${elo}" style="width:100%; padding:10px; margin-bottom:20px; border-radius:5px; border:1px solid #ccc;">`
    if(!elo)
    {
        conteudo+=`
        <div>
            <p style="color: red;">Deve-se preencher esse campo</p>
        </div>
        `
    }
    conteudo+=`

                            <label style="display:block; margin-bottom:5px; font-weight:bold;">Gênero:</label>
                            <input type="text" name="genero" value="${genero}" style="width:100%; padding:10px; margin-bottom:20px; border-radius:5px; border:1px solid #ccc;">`
    if(!genero)
    {
        conteudo+=`
        <div>
            <p style="color: red;">Deve-se preencher esse campo</p>
        </div>
        `
    }
    conteudo+=`
                            <label style="display:block; margin-bottom:5px; font-weight:bold;">Equipe:</label>`;
                            let boxEquipes = "";
                            for(let i = 0; i < lista_Equipe.length; i++) 
                            {

                                boxEquipes += `
                                    <label style="display:block; margin-bottom:5px;">
                                        <input type="checkbox" name="equipe" value="${lista_Equipe[i].nomeEquipe}">
                                        ${lista_Equipe[i].nomeEquipe}
                                    </label>
                                `;
                            }
                            conteudo+=boxEquipes;
    if(!equipe)
    {
        conteudo+=`
        <div>
            <p style="color: red;">Deve-se preencher esse campo</p>
        </div>
        `
    }
    if(equipecheia)
    {
        conteudo+=`
        <div>
            <p style="color: red;">${equipecheia}</p>
        </div>
        `
    }
    conteudo+=`</div>

                    </div>

                    <button type="submit" style="width:100%; margin-top:10px; padding:12px; background:#007bff; color:white; border:none; border-radius:5px; font-size:16px; cursor:pointer;">
                        Enviar
                    </button>
                    <br>
                    <br>
                    <a href="/menu" style="display:block; text-align:center; width:100%; padding:12px; background:#6c757d; color:white; border-radius:5px; font-size:16px; text-decoration:none; cursor:pointer;">
                        Voltar
                    </a>

                </form>
                </div>
            </body>
            </html>
        `

        resposta.send(conteudo);
    }

});

server.get("/listaJogadores", validarAcesso, (requisicao, resposta)=>{

    let conteudo=`
        <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Equipes E-Sports</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                </head>
            <body>
                <table class="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th>Equipe</th>
                            <th>Nome do Jogador</th>
                            <th>Nickname</th>
                            <th>Rota do Jogador</th>
                            <th>Elo do Jogador</th>
                            <th>Gênero</td>
                        </tr>
                    </thead>
        
                    <tbody>`;
                for(let i = 0; i<lista_Equipe.length; i++)
                {
                    const jogadoresEquipe = lista_Jogadores.filter(jogadores => jogadores.equipe === lista_Equipe[i].nomeEquipe);

                    for(let j=0; j< jogadoresEquipe.length; j++)
                    {
                        conteudo+=`
                            <tr>
                                <td>${lista_Equipe[i].nomeEquipe}</td>
                                <td>${jogadoresEquipe[j].nomeJogador}</td>
                                <td>${jogadoresEquipe[j].nickname}</td>
                                <td>${jogadoresEquipe[j].rota}</td>
                                <td>${jogadoresEquipe[j].elo}</td>
                                <td>${jogadoresEquipe[j].genero}</td>
                            </tr>
                        `;
                    }
                }
                conteudo+=`
                </tbody>
                </table>

                <a href="/menu" style="display:block; text-align:center; width:100%; padding:12px; background:#6c757d; color:white; border-radius:5px; font-size:16px; text-decoration:none; cursor:pointer;">
                Voltar
                </a>
                <br>
                <br>
                <a href="/cadastroJogadores" style="display:block; text-align:center; width:100%; padding:12px; background:#6c757d; color:white; border-radius:5px; font-size:16px; text-decoration:none; cursor:pointer;">
                Cadastrar mais Jogadores
                </a>

            </body>
            </html>
                `;
    
    resposta.send(conteudo);

});



server.listen(port, host, () =>{
    console.log(`http://localhost:5000/`)
});