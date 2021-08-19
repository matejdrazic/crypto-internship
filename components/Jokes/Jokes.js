const getJoke = async () => {
    const jokeData = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    })
    const jokeObj = await jokeData.json()
    const joke = jokeObj.joke
    return joke
}

export default getJoke