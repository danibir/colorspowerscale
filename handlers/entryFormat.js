const model = require('../model')

const entryFormat = (entry) => {
    let output = ""
    function line(text) {
        output += text
    }
    function enter() {
        output += "\n"
    }
    function tab() {
        output += "\t"
    }
    function lineArr(arr,) {
        if (!arr || arr.length == 0)
            line('None')
        for (var i = 0; i < arr.length; i++) {
            if (i != 0) line(', ')
            line(`${arr[i]}`)
        }
    }
    line(`| ${entry.name} |`)
    enter()
    enter()
    line(`---`)
    enter()
    line(`Name: `) 
    tab()
    tab()
    line(`${entry.name}`)
    enter()
    line(`Age: `) 
    tab()
    tab()
    line(`${entry.age}`)
    enter()
    line(`Species: `) 
    tab()
    line(`${entry.species}`)
    enter()
    enter()
    line(`From `) 
    line(`${entry.origin}`)
    enter()
    line(`---`)
    enter()
    enter()
    enter()
    line(`---`)
    enter()
    line(`Description:`)
    enter()
    line(`${entry.vdescription}`)
    enter()
    enter()
    line(`Backstory:`)
    enter()
    line(`${entry.backstory}`)
    enter()
    enter()
    line(`Motivations:`)
    enter()
    line(`${entry.motivations}`)
    enter()
    line(`---`)
    enter()
    enter()
    enter()
    line(`---`)
    enter()
    line(`Abilities:`)
    enter()
    lineArr(entry.abilities)
    enter()
    enter()
    line(`Equipment:`)
    enter()
    lineArr(entry.equipment)
    enter()
    enter()
    line(`Strengths:`)
    enter()
    lineArr(entry.strengths)
    enter()
    enter()
    line(`Weaknesses:`)
    enter()
    lineArr(entry.weakness)
    enter()
    line(`---`)
    enter()
    enter()
    enter()
    line(`---`)
    for (stat of model.stats) {
        console.log(stat.type[0].subtiers)
        enter()
        line(`${stat.name}:   `)
        if (entry.stats[stat.name]) {
            const currStat = entry.stats[stat.name]
            const currTier = currStat.tier
            const currSubtier = stat.type.find(t => t.rank == currTier).subtiers.find(st => st.rank == currStat.subtier).letter
            const currVariant = model.variations.find(v => v.rank == (currStat.variant)).name
            line(`${currVariant} ${currTier}${currSubtier}`)
        } else {
            line('undefined')
        }
    }
    enter()
    line(`---`)
    return output
}

module.exports = entryFormat