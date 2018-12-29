import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name: {type: String, required: true, unique: true}
}, {collection:'Role'});

roleSchema.statics.findOneOrCreate = async function findOneOrCreate(condition) {
    const self = this;

    return await new Promise((resolve, reject) => {
        self.findOne(condition, async (err, result) => {
            if (err) reject(err);
            else if(result) resolve(result);
            else return resolve(await self.create(condition));
        })
    });
};

export default mongoose.model('Role', roleSchema);
