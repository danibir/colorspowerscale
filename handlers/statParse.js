const model = require('../model')
const returnError = require('./returnError')

const statParse = (input) => {
    outputstats = {}
    const required = ["type", "tier", "subtier", "variant"]
    for (const stat of model.stats) {
        outputstats[stat.name] = {}
        outputstats[stat.name].type = stat.typeName
        outputstats[stat.name].tier = Number(input[stat.name])
        const subtierName = `${stat.name}-subtier-${outputstats[stat.name].tier}`
        outputstats[stat.name].subtier = Number(input[subtierName])
        const variName = `${subtierName}-var-${outputstats[stat.name].subtier}`
        outputstats[stat.name].variant = Number(input[variName])
        console.log(outputstats[stat.name])
        required.forEach(k => console.log(outputstats[stat.name][k]))
        if (required.some(k => !outputstats[stat.name][k])) return returnError(0, `Error parsing stats: required key missing`)
    }
    return { success: true, output: outputstats }
}

module.exports = statParse