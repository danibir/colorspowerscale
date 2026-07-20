const returnError = require('./returnError')
const statParse = require('./statParse')

const entryParse = async (input) => {
    console.log(input)
    
    const output = {}
    
    output.name = input.name
    output.age = input.age
    output.species = input.species
    output.origin = input.origin
    output.vdescription = input.vdescription
    output.backstory = input.backstory
    output.motivations = input.motivations
    output.equipment = input["equipment-item"] || []
    output.abilities = input["abilities-item"] || []
    output.strengths = input["strengths-item"] || []
    output.weaknesses = input["weaknesses-item"] || []
    const statsOutput = statParse(input)
    if (!statsOutput.success) return returnError(1, `Error parsing entity: missing stat field.`)
    output.stats = statsOutput.output
    
    if (!Array.isArray(output.abilities)) output.abilities = [output.abilities]
    if (!Array.isArray(output.equipment)) output.equipment = [output.equipment]
    if (!Array.isArray(output.strengths)) output.strengths = [output.strengths]
    if (!Array.isArray(output.weaknesses)) output.weaknesses = [output.weaknesses]

    const required = ['name', 'age', "species", "origin", "vdescription", "backstory", "motivations", "equipment", "abilities", "stats"]
    if (required.some(k => !output[k])) return returnError(0, `Error parsing entity: required key missing`)

    return { success: true, output: output }
}

module.exports = entryParse