const stats = document.querySelectorAll('.statBox')

function subTierChange(stat, radioTier, subTier) {
    console.log(subTier)
    const variationsAll = document.querySelectorAll(`.${stat.id}-subtier-${radioTier.value}-var`)
    console.log(variationsAll)
    variationsAll.forEach(vari => {
        vari.disabled = true
        vari.required = false
        vari.checked = false
        vari.parentNode.parentNode.parentNode.style.display = "none"
    })
    const variations = document.querySelectorAll(`.${stat.id}-subtier-${radioTier.value}-var-${subTier.value}`)
    console.log(variations)
    variations.forEach(vari => {
        vari.disabled = false
        vari.required = true
        vari.parentNode.parentNode.parentNode.style.display = "flex"
    })
    return variations
}
function tierChange(stat, radioTier) {
    const subTiersAll = document.querySelectorAll(`.${stat.id}-subtier`)
    subTiersAll.forEach(subTier => {
        subTier.disabled = true
        subTier.required = false
        subTier.checked = false
        subTier.parentNode.parentNode.parentNode.style.display = "none"
        const variationsAll = document.querySelectorAll(`.${subTier.id}-var`)
        variationsAll.forEach(vari => {
            vari.disabled = true
            vari.required = false
            vari.checked = false
            vari.parentNode.parentNode.parentNode.style.display = "none"
        })
    })

    const subTiers = document.querySelectorAll(`.${stat.id}-subtier-${radioTier.value}`)
    subTiers.forEach(subTier => {
        subTier.disabled = false
        subTier.required = true
        subTier.parentNode.parentNode.parentNode.style.display = "flex"
    })
    return subTiers
}

stats.forEach(stat => {
    const statChildren = Array.from(stat.children)
    statChildren.forEach(tier => {
        const radioTier = tier.querySelector('input')
        console.log('setting tier event listener')
        radioTier.addEventListener('change', (event) => {
            const subTiers = tierChange(stat, radioTier)
            subTiers.forEach(subTier => {
                console.log('setting subtier event listener')
                subTier.addEventListener('change', (event) => {
                    subTierChange(stat, radioTier, subTier)
                })
            })
        })
    })
})

function preEnable(data) {
    console.log('preenabling form')
    console.log(data)
    stats.forEach(stat => {
        const currStat = (data.stats[stat.id])
        if (currStat) {
            const tierValue = currStat.tier
            const subTierValue = currStat.subtier
            const variationValue = currStat.variant

            const statChildren = Array.from(stat.children)
            statChildren.forEach(tier => {
                const radioTier = tier.querySelector('input')
                if (radioTier.value == tierValue) {
                    radioTier.checked = true
                    const subTiers = tierChange(stat, radioTier)
                    subTiers.forEach(subTier => {
                        if (subTier.value == subTierValue) {
                            subTier.checked = true
                            const variations = subTierChange(stat, radioTier, subTier)
                            variations.forEach(variation => {
                                if (variation.value == variationValue) {
                                    variation.checked = true
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}