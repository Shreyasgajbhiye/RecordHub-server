import Mentor from "../model/mentorModel.js"

export const create = async(req, res) =>{
    try{
        const mentorData = new Mentor(req.body );
        if(!mentorData){
            return res.status(404).json({msg: "Mentor data not found"});
        }

        const saveData = await mentorData.save();

        res.status(200).json(saveData);
    }
    catch(error){
        res.status(500).json({error: error});
    }
}


export const getAll = async(req, res) =>{
    try{
        const mentorData = await Mentor.find();
        if(!mentorData){
            return res.status(404).json({msg: "Mentor data not found"});
        }
        res.status(200).json(mentorData);
    }
    catch(error){
        res.status(500).json({error: error});
    }
}

export const getOne = async(req, res) => {
    try{
        const id = req.params.id;
        const mentorExists = await Mentor.findById(id);
        if(!mentorExists){
            return res.status(404).json({msg: "Mentor data not found"});
        }
        res.status(200).json(mentorExists);
    }
    catch(error){
        res.status(500).json({error: error});
    }
}

export const updateMentor = async(req, res)=>{
    try{
        const id= req.params.id;
        const mentorExists = await Mentor.findById(id);
        if(!mentorExists){
            return res.status(404).json({msg: "Mentor not exists"});
        }

        const updatedData = await Mentor.findByIdAndUpdate(id, req.body, {new : true});
        res.status(200).json(updatedData);
    }
    catch(error){
        res.status(500).json({error: error});
    }
}


export const deleteMentor = async(req, res) => {
    try{
        const id= req.params.id;
        const mentorExists = await Mentor.findById(id);
        if(!mentorExists){
            return res.status(404).json({msg: "Mentor not exists"});
        }
        await Mentor.findByIdAndDelete(id);
        res.status(200).json({msg: "Mentor deleted successfully.."});
    }
    catch(error){
        res.status(500).json({error: error});
    }
}
