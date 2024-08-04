import {db, auth} from '../../../../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import {createUserWithEmailAndPassword } from 'firebase/auth';

export default async function signup(email, password, firstName, lastName, city, country, dob) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user
    await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: email,
        firstName: firstName,
        lastName: lastName,
        city: city,
        country: country,
        dob: dob
    })
    console.log(user)
  }catch (e) {
    console.error(e)
  }
}
