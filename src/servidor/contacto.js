const mysql = require("mysql");
class Contacto{
    constructor(oConfig){
        this.oConfig = oConfig;
    }
    // Recibe los datos del formulario y los inserta a la base de datos
    agregarContacto(nombre, correo, asunto, mensaje){
        var connection = mysql.createConnection(this.oConfig);
        connection.connect(function(error){
            try{
                if(error){
                    console.log("Error al establecer la conexión a la BD -- " + error);
                }
                else{
                    console.log("Conexión exitosa");
                    connection.query(`INSERT INTO personas_contactandome (NOMBRE, CORREO, ASUNTO, MENSAJE) VALUES('${nombre}', '${correo}', '${asunto}', '${mensaje}')`, function(error, res, campo){
                        if(error){
                            console.log("Error al insertar nuevo contacto en BD -- "+ error);
                        }
                        else{
                            console.log("Nuevo contacto registrado");
                        }
                    });
                }
            }
            catch(err){
                console.log("Contacto.agregarContacto.connect --Error-- " + err);
            }
        })
    }
}

module.exports = Contacto;