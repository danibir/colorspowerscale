
// * IMPORTANT
// * genEntries retrieves from the html page. Make an element containing the object array with the corresponding id in your ejs.
// *
// * Example: 
// * <input type="hidden" id="heroes" value="<%- JSON.stringify(heroes) %>-data">
// *

console.log('Loaded searchbar script')

// Gets entry from html page
function getEntries(id) {
    console.log(`getting entries (${id})`)
    const query = `#${id}-data`
    console.log(query)
    const objArr = document.querySelector(query)
    console.log(objArr)
    return JSON.parse(objArr.value)
}

// Loads data(array) for the searchbar
async function loadArray(name, array, validEntries)
{
    console.log(`loading array (${name}, ${array}, ${validEntries})`)
    array = array.split(',')
    if (array[0] === '')
        array = []

    const id = `#${name}`
    console.log(id)
    const sect = document.querySelector(id)
    console.log(sect)
    for (data of array)
    {
        if (validEntries)
        {
            const entries = getEntries(validEntries)
            const display = entries[data]
            await addToArray(name, data, display)
        }
        else
            await addToArray(name, data)
    }
}

// Adds new data to the array from the input node, w possible requirements
async function addViaInput(name, requirement, validEntries = NaN)
{
    console.log(`adding via Input (${name}, ${requirement}, ${validEntries})`)
    const id = `#${name}-input`


    const inputBox = document.querySelector(id)
    const input = inputBox.value
    let pass = true

    const sect = document.querySelector(id)
    
    // Fail if input is empty
    if (input.length === 0) {
        console.log('Empty?')
        pass = false
    }

    //Fail if input has already been added to array
    for (c of sect.parentElement.parentElement.children)
    {
        if (c.name === `${name}-item` && c.value === input) {
            console.log('Input already exists')
            pass = false
        }
    }

    console.log(`requirement: ${requirement}`)
    switch (requirement) {
        // If the input needs to be registered
        case "list-known":
        {
            if (!getEntries(validEntries)[input]) pass = false
            break
        }
        // If the input needs to be registered AND the only input (replaces old input)
        case "single-known":
        {
            if (!getEntries(validEntries)[input]) pass = false
            else
            {
                for (c of sect.parentElement.parentElement.children)
                {
                    if (c.name === `${name}-item`)
                    {
                        removeFromArray(name, c.value)
                        console.log(`Replacing ${c.value} (${name})`)
                    }
                }
            }
            break
        }
        case "single-any":
        {
            for (c of sect.parentElement.parentElement.children)
            {
                if (c.name === `${name}-item`)
                {
                    removeFromArray(name, c.value)
                    console.log(`Replacing ${c.value} (${name})`)
                }
            }
            
            break
        }
    }

    //If all checks passed:
    if (pass === true)
    {
        if (validEntries)
        {
            const entries = getEntries(validEntries)
            const display = entries[input]
            await addToArray(name, input, display)
        }
        else
            await addToArray(name, input)
        inputBox.value = ""
    }
}
// Adds new data to array, possibly w different display
async function addToArray(name, data, displayData = data)
{
    console.log(`adding to array (${name}, ${data}, ${displayData})`)
    const id = `#${name}`

    const sect = document.querySelector(id)
    
    // Visual

    let display = document.createElement('li')
    display.id = `${name}-display-${encodeURIComponent(data)}`
    display.className = 'searchbarItem'
    display.onclick = function() {removeFromArray(name, data)}
    display.textContent = displayData
    sect.appendChild(display)

    // Actual functual array
    let item = document.createElement('input')
    item.id = `${name}-item`
    item.value = data
    item.setAttribute('type', 'hidden')
    item.setAttribute('name', `${name}-item`)
    sect.parentElement.appendChild(item)

    console.log(`Added ${data} (${name})`)
}

function removeFromArray (name, data)
{
    
    console.log(`removing from array (${name}, ${data})`)
    //removing item from array
    const idItem = `#${name}-item`
    
    const arrayItem = document.querySelectorAll(idItem)

    for (var i = 0; i < arrayItem.length; i++)
    {
        if (arrayItem[i].value === data)
            arrayItem[i].remove()
    }
    
    //removing display
    data = encodeURIComponent(data)
    console.log(data)
    const idDisplay = `${name}-display-${data}`
    console.log(idDisplay)
    const display = document.getElementById(idDisplay)
    display.remove()

    console.log(`Removed ${data} (${name})`)
}