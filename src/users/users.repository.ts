import { Inject, Injectable } from '@nestjs/common';// Assuming you have a FirebaseProvider service
import { app, auth } from 'firebase-admin';
import { firebaseApp, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'src/firebase/firebase.sdk.setup';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSignInDto } from './dto/user-signin.dto';


@Injectable()
export class UsersRepository {
  #auth: auth.Auth;
  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.#auth = firebaseApp.auth();
  }
  
  async getAllUsers(): Promise<any> {
    const users = await this.#auth.listUsers();
    return users.users;
  }

  async signUp(userRequest:CreateUserDto): Promise<any> {
    try {
      const {email, password, firstName, lastName, role} = userRequest;
      const userRecord = await createUserWithEmailAndPassword(getAuth(),email,password);
      await this.#auth.updateUser(userRecord.user.uid, {displayName: `${firstName} ${lastName}`});
      await this.#auth.setCustomUserClaims(userRecord.user.uid, {role})
      return userRecord.user.toJSON();
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  async signIn({email,password}:UserSignInDto): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(getAuth(), email,password);
      return await userCredential.user.toJSON();
    } catch (error) {
      console.error('Error signing in user:', error);
      throw new Error('Failed to sign in user');
    }
  }
}
