import auxiliarService from '../Models/Auxiliar.js';

export const saveAuxurl = async (req, res) => {

    let _id = 1
    let auxurl = '/images/GPSC.png'
    try {
        await auxiliarService.create({
            _id: _id,
            auxurl: auxurl
        })
    }
    catch (error) {
        console.log(error)
    }
}

export const getAuxurl = async (req, res) => {
    try {
        const response = await auxiliarService.find({ _id: 1 });
        res.json({
            message:'Success',
            response: response
        })
    }
    catch (error) {
        console.log(error)
    }
    
}