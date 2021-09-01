import firestore from './Firebase.js'

const getNames = async () => {
    const tokenNames = await firestore.collection('users').doc(ethereum.selectedAddress).get()
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

