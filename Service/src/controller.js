const fs = require('fs');


exports.getAddress = (req, res) => {
    console.log(process.env.ProgramData)
    const buffer = fs.readFileSync(`${process.env.ProgramData}\\SteelSeries\\SteelSeries Engine 3\\coreProps.json`,{ encoding: 'utf8' });
    const object = JSON.parse(buffer);
    console.log(object)
    res.send(object);
};
