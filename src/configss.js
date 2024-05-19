import { config } from 'dotenv'
config();

export default{
    user: process.env.user ,
    password:process.env.password,
    connectString: process.env.connectString 
    
};
