const returnError = require('./returnError')
const statParse = require('./statParse')

const entryParse = async (input) => {
    console.log(input)
    
    const output = {}
    
    output.name = input.name
    output.age = input.age
    output.species = input["species-item"]
    output.origin = input["origin-item"]
    output.vdescription = input.vdescription
    output.backstory = input.backstory
    output.motivations = input.motivations
    output.equipment = input["equipment-item"] || []
    output.abilities = input["abilities-item"] || []
    const statsOutput = statParse(input)
    if (!statsOutput.success) return returnError(1, `Error parsing entity: missing stat field.`)
    output.stats = statsOutput.output
    
    if (!Array.isArray(output.abilities)) output.abilities = [output.abilities]
    if (!Array.isArray(output.equipment)) output.equipment = [output.equipment]

    const required = ['name', 'age', "species", "origin", "vdescription", "backstory", "motivations", "equipment", "abilities", "stats"]
    if (required.some(k => !output[k])) return returnError(0, `Error parsing entity: required key missing`)

    return { success: true, output: output }
}

module.exports = entryParse