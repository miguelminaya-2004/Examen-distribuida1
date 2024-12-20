import mssql from 'mssql'

const connectionSettings = {
  server: 'localhost',
  database: 'SistemaUsuarios',
  user: 'sa',
  password: '1234',
  options: {
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbort: true,
    instancename: 'SQLEXPRESS01'
  },
  port: 1433
}

const getConnection = async () => {
  try {
    return await mssql.connect(connectionSettings)
  } catch (error) {
    console.log(error)
    return new Error(error)
  }
}

export { getConnection }