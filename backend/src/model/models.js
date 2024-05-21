const { DataTypes, Model, Sequelize } = require('sequelize');

const MySQL = {
    name: 'indicadores_salud',
    username: 'root',
    password: '',
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
}
const sequelize = new Sequelize(
    MySQL.name, 
    MySQL.username, 
    MySQL.password, {
      host: MySQL.host,
      dialect: MySQL.dialect,
});

class Genero extends Model {};

Genero.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Genero',
  tableName: 'generos',
  timestamps: false
});

class ContactoEmergencia extends Model {};

ContactoEmergencia.init({
  num_doc: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  nombre_completo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  generos_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  parentesco: {
    type: DataTypes.STRING(45),
    defaultValue: 'NO APLICA'
  },
  relacion: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'ContactoEmergencia',
  tableName: 'contacto_emergencia',
  timestamps: false
});

class UnidadMedida extends Model {};

UnidadMedida.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  unidad_longitud: {
    type: DataTypes.STRING(10),
    defaultValue: 'm'
  },
  unidad_peso: {
    type: DataTypes.STRING(10),
    defaultValue: 'kg'
  },
  unidad_presion_arterial: {
    type: DataTypes.STRING(45),
    defaultValue: 'mmHg'
  },
  unidad_glucosa_sangre: {
    type: DataTypes.STRING(45),
    defaultValue: 'mg/dL'
  },
  unidad_frecuencia_cardiaca: {
    type: DataTypes.STRING(45),
    defaultValue: 'bpm'
  },
  unidad_temperatura: {
    type: DataTypes.STRING(45),
    defaultValue: '° C'
  }
}, {
  sequelize,
  modelName: 'UnidadMedida',
  tableName: 'unidades_medida',
  timestamps: false
});

class Usuario extends Model {};

Usuario.init({
  num_doc: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  fecha_de_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false
  },
  generos_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  altura: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  peso: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  contacto_emergencia_num_doc: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  unidades_medida_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'usuarios',
  timestamps: false
});

class TipoIndicador extends Model {};

TipoIndicador.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'TipoIndicador',
  tableName: 'tipo_indicador',
  timestamps: false
});

class Indicador extends Model {};

Indicador.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  tipo_indicador_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  valor_indicador: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  fecha_hora_registro: {
    type: DataTypes.DATE,
    allowNull: false
  },
  usuarios_num_doc: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  notas_adicionales: {
    type: DataTypes.STRING(500)
  }
}, {
  sequelize,
  modelName: 'Indicador',
  tableName: 'indicadores',
  timestamps: false
});

class MetaSalud extends Model {};

MetaSalud.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.STRING(500)
  },
  objetivo: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  indicadores_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  fecha_cumplimiento: {
    type: DataTypes.DATE
  },
  unidades_medida_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'MetaSalud',
  tableName: 'metas_salud',
  timestamps: false
});

// Definiendo relaciones
Genero.hasMany(Usuario, { foreignKey: 'generos_id' });
Usuario.belongsTo(Genero, { foreignKey: 'generos_id' });

Usuario.hasOne(ContactoEmergencia, { foreignKey: 'num_doc' });
ContactoEmergencia.belongsTo(Usuario, { foreignKey: 'num_doc' });

Genero.hasMany(ContactoEmergencia, { foreignKey: 'generos_id' });
ContactoEmergencia.belongsTo(Genero, { foreignKey: 'generos_id' });

UnidadMedida.hasOne(Usuario, { foreignKey: 'unidades_medida_id' });
Usuario.belongsTo(UnidadMedida, { foreignKey: 'unidades_medida_id' });

TipoIndicador.hasMany(Indicador, { foreignKey: 'tipo_indicador_id' });
Indicador.belongsTo(TipoIndicador, { foreignKey: 'tipo_indicador_id' });

Indicador.hasMany(MetaSalud, { foreignKey: 'indicadores_id' });
MetaSalud.belongsTo(Indicador, { foreignKey: 'indicadores_id' });

UnidadMedida.hasMany(MetaSalud, { foreignKey: 'unidades_medida_id' });
MetaSalud.belongsTo(UnidadMedida, { foreignKey: 'unidades_medida_id' });

module.exports = { Genero, ContactoEmergencia, UnidadMedida, Usuario, TipoIndicador, Indicador, MetaSalud };

//Función para probar la conexión. Se puede comentar cuando ya se haya probado.
async function test_con() { 
    try {
        await sequelize.authenticate();
        console.log(`
                ¡La conexión a la base de datos '${sequelize.config.database}'
                en '${sequelize.config.host}' ha sido existosa!`);  
    } catch (error) { 
        console.error(`
                ¡Uy! Ha habido un error al conectarse a la base de datos '${sequelize.config.database}'.
                Error: ${error}`);
    }
}

test_con();