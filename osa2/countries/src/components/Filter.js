const Filter = (country, filter) => {


    console.log(country, filter)
    console.log(typeof country)
    console.log(typeof filter)
    
    const result = country.toUpperCase().includes(filter.toUpperCase())
    if (result) {
        console.log("filter contains")
        return (true)
    }
    console.log("filter false")
    return false
}
export default Filter 