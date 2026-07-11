
const numberToLetters = require('./handlers/numberToLetters')

function createTier (array, rank, name, ...subtiers) {
    const subtierArray = []
    let count = 0
    for (const subtier of subtiers) {
        const obj = {
            rank: count + 1,
            letter: numberToLetters(count),
            name: subtier
        }
        subtierArray[count] = obj
        count++
    }
    const obj = {
        rank,
        name
    }
    if (subtierArray.length > 0) {
        obj.subtiers = subtierArray
    }
    array[rank - 1] = obj
}

const scale_Power = []
createTier(scale_Power, 1, "Higher Infinity", "Outerverse", "Hyperverse", "Complex Multiverse")
createTier(scale_Power, 2, "Multiversal", "Multiverse+", "Multiverse", "Low Multiverse")
createTier(scale_Power, 3, "Cosmic", "Universe", "Multi-Galaxy", "Galaxy")
createTier(scale_Power, 4, "Stellar", "Large Star", "Star", "Small Star")
createTier(scale_Power, 5, "Substellar", "Large Planet", "Planet", "Moon")
createTier(scale_Power, 6, "Tectonic", "Continent", "Country", "Island")
createTier(scale_Power, 7, "Nuclear", "Mountain", "City", "Town")
createTier(scale_Power, 8, "Urban", "Multi-City Block", "City Block", "Building")
createTier(scale_Power, 9, "Superhuman", "Small Building", "Wall", "Street")
createTier(scale_Power, 10, "Human", "Athlete", "Human", "Below Average Human", "No Strength")

const scale_Speed = []
createTier(scale_Speed, 1, "Faster Than Light", "Massively FTL+ (SoL x1000+)", "Massively FTL (SoL x100+)", "FTL+ (SoL x10+)", "FTL (SoL x1+)")
createTier(scale_Speed, 2, "Lightspeed", "Lightspeed (SoL 100%)", "Relativistic+ (SoL 50%+)", "Relativistic (SoL 10%+)", "Sub-Relativistic+ (SoL 5%+)", "Sub-Relativistic (SoL 1%+)")
createTier(scale_Speed, 3, "High Hypersonic", "Massively Hypersonic+ (M x1000+)", "Massively Hypersonic (M x100+)", "High Hypersonic+ (M x50+)")
createTier(scale_Speed, 4, "Hypersonic", "High Hypersonic (M x25+)", "Hypersonic+ (M x10+)", "Hypersonic (M x5+)")
createTier(scale_Speed, 5, "Machspeed", "Supersonic+ (M 2.5x)+", "Supersonic (M 1x+)", "Transonic (M ~100%)")
createTier(scale_Speed, 6, "Superspeed", "Subsonic+ (M 50%+)", "Subsonic (M 10%+)", "Superhuman", "Peak Human")
createTier(scale_Speed, 7, "Human", "Althetic Human", "Average Human", "Below Average Human", "Immobile")

const scale_Intelligence = []
createTier(scale_Intelligence, 1, "Omniscient", "Full Omnisience", "Nigh-Omniscient")
createTier(scale_Intelligence, 2, "Genius", "Supergenius", "Extraordinary Genius", "Genius", "Gifted")
createTier(scale_Intelligence, 3, "Human", "Above Average", "Average", "Below Average")
createTier(scale_Intelligence, 4, "Animal", "High Animalistic", "Animalistic", "Instinctive")
createTier(scale_Intelligence, 5, "None", "Reflex Reactivity", "Chemical Reactivity", "No Reactivity")

const scale = {
    power: scale_Power,
    speed: scale_Speed,
    intelligence: scale_Intelligence
}

//console.log('Full:')
//console.log(scale)
//console.log('Power:')
//console.log(scale.power)
//console.log('Power (1):')
//console.log(scale.power[0])
// console.log('Speed:')
// console.log(scale.speed)
// console.log('Intelligence:')
// console.log(scale.intelligence)

const variations = []
function createVariation(rank, name) {
    const obj = {
        rank,
        name
    }
    variations[rank - 1] = obj
}
createVariation(1, "High")
createVariation(2, "Medium")
createVariation(3, "Low")


const stats = []
function setStat (name, type) {
    const obj = {
        name,
        type: scale[type],
        typeName: type
    }
    stats.push(obj)
}
setStat("Attack_Potency", "power")
setStat("Lifting_Strength", "power")
setStat("Durability", "power")
setStat("Combat_Speed", "speed")
setStat("Travel_Speed", "speed")
setStat("IQ", "intelligence")
setStat("Battle_IQ", "intelligence")

const entryGet = require('./handlers/entryGet')

const createId = async () => {
    const entries = await entryGet()
    const usedIds = new Set(entries.map(e => e.id))
    const idLength = 6
    while (true) {
        const id = Math.floor(Math.random() * (10 ** idLength - 10 ** (idLength - 1))) + 10 ** (idLength - 1)
        if (!usedIds.has(id)) return id
    }
}

module.exports = {
    scale,
    stats,
    variations,
    createId
}