const dotenv = require('dotenv')
dotenv.config({path: '../../.env'})
console.log(process.env)
console.log('env', process.env.SUBDIRECTORY);
console.log('env', process.env.COMPUTERNAME);

export const Config = {
  SUBDIRECTORY: '/mrg',
  ...process.env
}

