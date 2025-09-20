const { generateToken, verifyToken } = require("../services/jwt");
const { connectRedis, getRedisClient } = require("../services/redis/index");

async function authMiddleware(req, res, next) {
    const apiKey = req.headers.token;
    // console.log("Headers:")
    // console.log(req.headers) 
    // {
    // host: 'localhost:5000',
    // connection: 'keep-alive',
    // 'content-length': '104',
    // 'sec-ch-ua-platform': '"Windows"',
    // 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0',
    // accept: 'application/json, text/plain, */*',
    // 'sec-ch-ua': '"Opera GX";v="121", "Chromium";v="137", "Not/A)Brand";v="24"',
    // 'content-type': 'application/json',
    // token: 'minhasenhasecreta',
    // 'sec-ch-ua-mobile': '?0',
    // origin: 'http://localhost:3000',
    // 'sec-fetch-site': 'same-site',
    // 'sec-fetch-mode': 'cors',
    // 'sec-fetch-dest': 'empty',
    // referer: 'http://localhost:3000/',
    // 'accept-encoding': 'gzip, deflate, br, zstd',
    // 'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,pl;q=0.6,id;q=0.5'
    // }
    // console.log("Headers Token")
    // console.log(req.headers.token); // minhasenhasecreta

    // Temos que gerar com essa merda aqui no campo de entrada(que vaos ter que criar)
    // Enviar esse token pro auth/validade(seila) e validar lá.
    // const token = jwt.sign(
    // { id: user._id, email: user.email }, // payload
    // process.env.JWT_SECRET,              // segredo
    // { expiresIn: '1h' }                  // opções
    // );
    // Dúvidas: https://chatgpt.com/c/68ca1dc8-77a8-8322-a9bc-20ac0e24bcf9

    // res.json({ token });
    // TODO: Colocar no auth/validate e colocar no componente CampoDeEntrada da APi
    console.log("Esse é o token: ", apiKey); // Esse é o token:  minhasenhasecreta
    if (!apiKey) return res.status(401).json({ error: "Token ausente"});

    const token = generateToken(apiKey);

    const isValid = apiKey === process.env.JWT_SECRET;

    // connecta no redis
    connectRedis();

    let redisClient = getRedisClient();

    // armazena token com a api
    await redisClient.set(token, apiKey);
    try {
        // TODO: 
        // obtêm o token 
        redisClient.get(token).then((value) => {
            const isValid2 = value === process.env.JWT_SECRET;
            console.log(`👉 token: ${token}; value: ${value}; validador: ${isValid2}`)
            if(!isValid2) {
                return res.status(401).json({ error: "Token inválido!" })
            }
        })

        // console.log(`Vamos passar pelo verifying ${process.env.JWT_SECRET} e ${apiKey}`);
        // const verifying = jwt.verify(apiKey, process.env.JWT_SECRET);
        // console.log("verifying: ", verifying)
        // req.user = jwt.verify(apiKey, process.env.JWT_SECRET);
        
        // return res.status(200);
        next();
    } catch (err) {
        console.log("Erro: ", err)
        return res.status(403).json({ error: "Token inválido" });
    }
}

module.exports = { authMiddleware };