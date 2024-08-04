
import { db, auth } from '../../../../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default async function signup(email, password, firstName, lastName, city, country, dob) {
  try {
    // Create a new user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Add the user's data to Firestore
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      email: email,
      firstName: firstName,
      lastName: lastName,
      city: city,
      country: country,
      dob: dob
    });

    console.log('User created and data saved:', user.uid);
  } catch (error) {
    console.error('Error signing up or saving user data:', error);
  }
}
