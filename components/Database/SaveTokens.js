import firestore from './Firebase.js'

const saveToken = async (Name, Address) => {
    let object = {}
    object[Name] = Address
    await firestore.collection('users').doc(ethereum.selectedAddress).set(object, { merge: true })
}

export default saveToken