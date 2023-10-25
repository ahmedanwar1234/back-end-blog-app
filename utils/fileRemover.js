
import fs from 'fs';
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fileRemover=(filname)=>{
    fs.unlink(path.join(__dirname,`../uploads/${filname}`),function(err){
if(err && err.code =='EMOENT'){
    //file dosent exist
    console.log(`file ${filname} dosent exist wont remove it`)
}else if(err){
    console.log(`error occured while trying to remove file ${filname}`)
}
else{
    console.log(`remove ${filname}`)
}
    })
}

export default fileRemover