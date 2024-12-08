const controller = {}
const connection = require('../dbConnection/connection')
const ReservaModel = require('../models/reserva.model')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");

//INDEX 

controller.index = async (req, res) => {
    try {
        await connection()
        const title = "Home";
        console.log("Connection ok")  
        var resultadoAll = "";     
        findAllReservas();        
        res.render('index', {title})
    } catch(err){
        console.log(err)
    }
}

//AGREGAR RESERVA

controller.addGet = async (req, res) => {
    try {
        await connection()
        const title = "add";
        console.log("Connection ok")       
        res.render('add', {title})
    } catch(err){
        console.log(err)
    }
}


controller.addPost = async (req, res) => {
    try {
        await connection()
        const title = "add";        
        var reserva = ReservaModel.insertMany(
        {
            clientName: req.body.clientName,
            date: req.body.date,
            hour: req.body.hour,
            table: req.body.table,
            status: req.body.status,
            notes: req.body.notes,
            reservedBy: req.body.reservedBy,    
        })         
       res.status(200).send("Reserva creada")
    } catch(err){
        console.log(err)
    }
}

//MONSTRAR TODAS LAS RESERVAS

controller.showAll = async (req, res) => {
    try {
        await connection()
        const title = "ShowAll";       
        var reservas = await findAllReservas();
        console.log(reservas)
        res.status(202).send(reservas)      
    } catch(err){
        console.log(err)
    }
}

//ACTUALIZAR RESERVA

controller.updateGet = async (req, res) => {
    try {
        await connection()
        const title = "Update";
        console.log("Connection ok")       
        res.render('update', {title})
    } catch(err){
        console.log(err)
    }
}

controller.updatePut = async (req, res) => {
    try {
        await connection()      
        const filter = { _id: req.params.id};
        const update = { 
            _id:req.params.id,
            clientName: req.body.clientName,
            date: req.body.date,
            hour: req.body.hour,
            table: req.body.table,
            status: req.body.status,
            notes: req.body.notes,
            reservedBy: req.body.reservedBy
         };

        let doc = await ReservaModel.findOneAndUpdate(filter, update, {
        new: true
  });        
        res.status(202).send("Reserva actualizada")   
    } catch(err){
        console.log(err)
    }
}

//BORRAR RESERVA

controller.delete = async (req, res) => {
    try {
        await connection()
        var resId = req.body.id 
        req.params.id = resId;
        deleteReseva(resId)
        res.status(202).send("Reserva borrada")   
    } catch(err){
        console.log(err)
    }
}

controller.deleteGet = async (req, res) => {
    try {
        await connection()
        const title = "Borrar reserva";
        console.log("Connection ok")       
        res.render('delete', {title})
    } catch(err){
        console.log(err)
    }
}

//FUNCIONES AUXLIARES

const reservasList = [
    {
        clientName: "Pedro Dias",
        date: "11/01/2024",
        hour: "13:00",
        table: "10",
        status: "Confirmada",
        notes: "Mesa para aniversario",
        reservedBy: "Cliente",        
    },
    {
        clientName: "Ana Gonzalez",
        date: "11/01/2024",
        hour: "15:00",
        table: "9",
        status: "Confirmada",
        notes: "Mesa para 5 personas",
        reservedBy: "Cliente",        
    }
]
const createReserva = (list) => {
    ReservaModel.insertMany(list)
    console.log("Reserva creada : ", list)
};

const findAllReservas = async (id) => {
    resultadoAll = await ReservaModel.find()  
    return resultadoAll
};

const findReserva = async (id) => {
    const reserva = await ReservaModel.findById(id)
    console.log("La reserva es : ", reserva)
};

const reservsid1 = "6715508b82798c39a7aba5f5";
const reservsid2 = "6715508b82798c39a7aba5f6";


const findStatusConfirmada = async () => {
    const result = await ReservaModel.find(
        {
            status: "Confirmada",
        }
    )
    console.log('Coincidencia encontrada', result);
}



const updateReserva = async () => {
   const resultadoUpdate = await ReservaModel.findByIdAndUpdate(req.body.id)
          console.log("resultado editado", resultadoUpdate)
}

const deleteReseva = async (_id) => {
    const resultadoDelete = await ReservaModel.deleteOne(
        
           _id
        
    ) 
    console.log( "registro eliminado",resultadoDelete )
}

module.exports = controller
