const mongoose = require('mongoose');

const dbContection = async () => {
    try {
         mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });

        console.log('dbContection con exito');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de la base de datos ');

    }

}

module.exports = {
    dbContection
}