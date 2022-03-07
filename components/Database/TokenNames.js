import firestore from './Firebase.js'

const getNames = async (address) => {
    const tokenNames = await firestore.collection('users').doc(address).get()
    const json = tokenNames.data()
    const array = []
    if (json) {
        Object.keys(json).forEach((name) => {
            array.push(name)
        })
    }
    return array
}

export default getNames

