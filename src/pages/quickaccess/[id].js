import { dbConnect } from "../../../utils/mongoose";
import QuickAccess from "../../models/QuickAccess"
dbConnect();

export default async (req, res) => {
    const {
        method,
        body,
        query: {id},
    } = req;

    switch (method) {
        case "DELETE":
            try {
                const deletedQuickAccess = await QuickAccess.findByIdAndDelete(id);
                if(!deletedQuickAccess) return res.status(404).json({msg: "QuickAccess not found"});
                return res.status(204).json();
            } catch (error) {
                return res.status(400).json({msg: error.message});
            }
        default:
            return res.status(400).json({msg: "this method is not supported"});
    }
};