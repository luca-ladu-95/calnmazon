// server.js (Express 4.0)
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var app = express();
var path = require("path");
var mysql = require("mysql2");
const User = require("./model/User").User;
const Prodotto = require("./model/Prodotto").Prodotto;
const Categoria = require("./model/Categoria").Categoria;
const Indirizzo = require("./model/Indirizzo").Indirizzo;
const MetodoPagamento = require("./model/MetodoPagamento").MetodoPagamento;
const Order = require("./model/Order").Order;
const OrderProduct = require("./model/OrderProduct").OrderProduct;
const ForeignKeyConstraintError = require("./node_modules/sequelize/lib/errors/database/foreign-key-constraint-error");
const UniqueConstraintError = require("./node_modules/sequelize/lib/errors/validation/unique-constraint-error")
app.use(express.static(__dirname + "/public")); // set the static files location /public/img will be /img for users
app.use(morgan("dev")); // log every request to the console
app.use(bodyParser()); // pull information from html in POST
app.use(methodOverride()); // simulate DELETE and PUT

var router = express.Router();

router.use(function (req, res, next) {
  console.log("header");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", false);
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

router.get("/user", async function (req, res) {
  try{
    const users = await User.findAll();
    res.send(users);
  }catch(e){
    res.status(404).send('Non è stato possibile recuperare gli utenti');
  }
});

router.get("/category", async function (req, res) {
  try {
    const categories = await Categoria.findAll();
    res.send(categories);
  }catch(e){
    res.status(404).send('Non è stato possibile recuperare le categorie');
  }
});

router.get("/product", async function (req, res) {
  try {
    const products = await Prodotto.findAll();
    res.send(products);
  }catch(e){
    res.status(404).send('Non è stato possibile recuperare i prodotti');
  }
});

router.put("/modificaProdotto", async function (req, res) {
  const prod = req.body;
  const errors = [];
  if (!prod.nome) {
    errors.push("Il nome è obbligatorio");
  }
  if (!prod.prezzo) {
    errors.push("Il prezzo è obbligatorio");
  } else if (+prod.prezzo < 0) {
    errors.push("Il prezzo non può essere negativo");
  }
  if (isNaN(+prod.id_categoria)) {
    prod.id_categoria = (
      await Categoria.create({ nome: prod.id_categoria })
    ).toJSON().id;
  }

  if (errors.length > 0) {
    res.status(404).send(errors);
    return;
  } else {
    try {
      let prodUp = await Prodotto.update(prod, { where: { id: prod.id } });
      if (prodUp > 0) {
        let newProd = await Prodotto.findByPk(prod.id);
        res.send(newProd);
      }
      res.send(prod);
    } catch (e) {
      errors.push("Prodotto già presente");
      res.status(404).send(errors);
    }
  }
});

router.post("/aggiungiProdotto", async function (req, res) {
  const prod = req.body;
  const errors = [];
  if (!prod.nome) {
    errors.push("Il nome è obbligatorio");
  }
  if (!prod.prezzo) {
    errors.push("Il prezzo è obbligatorio");
  } else if (+prod.prezzo < 0) {
    errors.push("Il prezzo non può essere negativo");
  }
  if (isNaN(+prod.id_categoria)) {
    prod.id_categoria = (
      await Categoria.create({ nome: prod.id_categoria })
    ).toJSON().id;
  }

  if (errors.length > 0) {
    res.status(404).send(errors);
    return;
  } else {
    try {
      let newProd = (await Prodotto.create(prod)).toJSON();
      res.send(newProd);
    } catch (e) {
      errors.push("Prodotto già presente");
      res.status(404).send(errors);
    }
  }
});

router.post("/login", async function (req, res) {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const loggedUser = (await User.findOne({ where: { email: user.email, password: user.password } }));
    const indirizzo = (await Indirizzo.findOne({ where: { id_user: loggedUser.id } }));
    const metodoPagamento = (await MetodoPagamento.findOne({ where: { id_utente: loggedUser.id } }));
    res.send(
      {
        id: loggedUser.id,
        email: loggedUser.email,
        nome: loggedUser.nome,
        cognome: loggedUser.cognome,
        ruolo: loggedUser.id_ruolo,
        indirizzo,
        metodoPagamento
      }
    );
  }catch(e){
    res.status(404).send({ msg: "Nessun utente con queste credenziali" });
  }
});

router.put("/modificaUtente", async function (req, res) {
  const user = {
    cognome: req.body.cognome,
    nome: req.body.nome,
    password: req.body.password
  };
  const errors = [];
  const indirizzo = req.body.indirizzo;
  if (indirizzo.cap.length != 5) {
    errors.push("Il CAP deve essere di 5 cifre");
  }
  const metodoPagamento = req.body.metodoPagamento;
  if (metodoPagamento.numero.length != 16) {
    errors.push("Il numero della CDC deve essere di 16 cifre");
  }
  if (metodoPagamento.codice.length != 3) {
    errors.push("Il codice della CDC deve essere di 3 cifre");
  }
  if (metodoPagamento.mese_scadenza.length != 2) {
    errors.push("Il mese di scadenza della CDC deve essere in 2 cifre");
  } else if (
    +metodoPagamento.mese_scadenza < 1 ||
    +metodoPagamento.mese_scadenza > 12
  ) {
    errors.push("Il mese di scadenza della CDC non è valido");
  }
  if (metodoPagamento.anno_scadenza.length != 4) {
    errors.push("L'anno di scadenza della CDC deve essere in 4 cifre");
  } else if (+metodoPagamento.anno_scadenza < new Date().getFullYear()) {
    errors.push("L'anno di scadenza della CDC non è valido");
  } else if (
    +metodoPagamento.anno_scadenza == new Date().getFullYear() &&
    +metodoPagamento.mese_scadenza < new Date().getMonth()
  ) {
    errors.push("La CDC non è valida");
  }
  if (errors.length != 0) {
    res.status(404).send(errors);
    return;
  }
  const userUpd = await User.update(user, { where: { id: req.body.id } });
  const indPres = await Indirizzo.findOne({ where: { id: indirizzo.id } });
  if (indPres) {
    await Indirizzo.update(indirizzo, { where: { id: indPres.id } });
  } else {
    await Indirizzo.create(indirizzo);
  }
  const metPres = await MetodoPagamento.findOne({
    where: { id: metodoPagamento.id },
  });
  if (metPres) {
    await MetodoPagamento.update(metodoPagamento, {
      where: { id: metPres.id },
    });
  } else {
    await MetodoPagamento.create(metodoPagamento);
  }
  res.status(200).send(["Modifica avvenuta con successo"]);
});

router.post("/addOrder", function (req, res) {
  const idUser = req.body.idUser;
  const data = new Date();
  const day = data.getDay();
  const month = data.getMonth();
  const year = data.getFullYear();
  const order = {
    dataOrdine:
      (day < 10 ? "0" + day : day) +
      "/" +
      (month < 10 ? "0" + month : month) +
      "/" +
      (year < 10 ? "0" + year : year),
    numOrd: creaNumOrd(),
    id_user: idUser,
  };
  Order.create(order).then((newOrder) => {
    const orderProd = [];
    for (let prod of req.body.products) {
      const newProd = {
        id_prodotto: prod.id,
        qta: prod.qta,
        id_ordine: newOrder.id,
      };
      orderProd.push(newProd);
    }
    OrderProduct.bulkCreate(orderProd)
      .then((orders) => res.send({ numeroOrdine: newOrder.numOrd }))
      .catch((error) => {
        res.send({ msg: "Non è stato possibile inserire gli ordini" }, 404);
      });
  });
});

router.get("/orders/:id", function (req, res) {
  var userId = req.params.id;
  Order.findAll({ where: { id_user: userId } })
    .then(async (ordersForUser) => {
      const allOrdersInfo = [];
      for (let order of ordersForUser) {
        const orderProducts = await OrderProduct.findAll({
          where: { id_ordine: order.id },
        });
        const orderInfo = {
          id: order.id,
          dataOrdine: order.dataOrdine,
          numOrd: order.numOrd,
          id_user: order.id_user,
          products: [],
        };
        for (let product of orderProducts) {
          const prod = await Prodotto.findOne({
            where: { id: product.id_prodotto },
          });
          orderInfo.products.push({
            qta: product.qta,
            ...prod.toJSON(),
          });
        }
        allOrdersInfo.push(orderInfo);
      }
      res.send(allOrdersInfo);
    })
    .catch((error) => {
      res.send({ msg: "Qualcosa è andato storto. Riprova" }, 404);
    });
});

router.delete("/deleteOrder/:id", async function (req, res) {
  const orderId = req.params.id;
  Order.destroy({ where: { id: orderId } })
    .then((result) =>
      res.status(200).send({
        msg:
          "Ordine eliminato con successo. Il rimborso verrà emesso in 5-7 giorni lavorativi sul metodo di pagamento selezionato all'invio dell'ordine",
      })
    )
    .catch((error) =>
      res.status(404).send({
        error: "Qualcosa è andato storto nell'eliminazione dell'ordine",
      })
    );
});

router.delete("/deleteProduct/:id", function (req, res) {
  const productId = req.params.id;
  Prodotto.destroy({ where: { id: productId } })
    .then((result) => {
      res.status(200).send({ msg: "Prodotto eliminato con successo" });
    })
    .catch((error) => {
      if (error instanceof ForeignKeyConstraintError) {
        res
          .status(404)
          .send({
            msg:
              "Il Prodotto è associato a uno o più ordini, non puoi eliminarlo",
          });
      }
      res
        .status(404)
        .send({
          msg: "Qualcosa è andato storto nell'eliminazione dell'ordine",
        });
    });
});

router.post("/signup", async function (req, res) {
  const user = {
    nome: req.body.nome,
    cognome: req.body.cognome,
    email: req.body.email,
    password: req.body.password,
  };
  const indirizzo = {
    via: req.body.indirizzo.via,
    citta: req.body.indirizzo.citta,
    cap: req.body.indirizzo.cap,
    id_user: undefined,
  };
  const metodoPagamento = {
    numero: req.body.metodoPagamento.numero,
    codice: req.body.metodoPagamento.codice,
    mese_scadenza: req.body.metodoPagamento.mese_scadenza,
    anno_scadenza: req.body.metodoPagamento.anno_scadenza,
    id_utente: undefined,
  };
  try {
    const newUser = await User.create({...user, id_ruolo: req.body.ruolo});
    indirizzo.id_user = newUser.id;
    metodoPagamento.id_utente = newUser.id;
    const newIndirizzo = await Indirizzo.create(indirizzo);
    const newMetodoPagamento = await MetodoPagamento.create(metodoPagamento);
    res.send({
      ...user,
      ruolo: newUser.toJSON().id_ruolo,
      indirizzo: { ...newIndirizzo.toJSON() },
      metodoPagamento: { ...newMetodoPagamento.toJSON() },
    });
  } catch (e) {
    if(e instanceof UniqueConstraintError){
      res.status(404).send({ msg: `Un utente con la email ${user.email} è già presente`});
      return;
    }
    console.log(e);
    res.status(404).send({ msg: "Non è stato possibile inserire l'utente" });
    return;
  }
});

function creaNumOrd() {
  let numOrd = "";
  for (let i = 0; i < 12; i++) {
    const numGenerato = Math.floor(Math.random() * 10);
    numOrd += numGenerato;
  }
  return numOrd;
}
//creo il server
app.get("/", function (req, res) {});

app.use("/api", router);

app.listen(8000);
