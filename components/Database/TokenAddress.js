import firestore from './Firebase.js'

const getAddress = async (Name) => {
    const tokenDoc = await firestore.collection('users').doc(ethereum.selectedAddress).get()
    const tokenAddress = tokenDoc.get(Name)
    return tokenAddress
}

export default getAddress