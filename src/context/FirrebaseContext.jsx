import {initializeApp} from 'firebase/app'
import { createContext, useContext, useEffect, useState } from 'react'
import {getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import {getFirestore , addDoc, getDocs,doc, deleteDoc, collection} from 'firebase/firestore'
import { getStorage, uploadBytes, ref, deleteObject ,getDownloadURL } from 'firebase/storage'

const FirebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};


const firebaseContext = createContext()

const firebaseapp = initializeApp(FirebaseConfig)



export const usefirebase  = ()=> useContext(firebaseContext)

const firebaseAuth = getAuth(firebaseapp)
const firebaseDB = getFirestore(firebaseapp)
const firebaseStorage = getStorage()
const googleAuth = new GoogleAuthProvider()


export const FirebaseProvider = (props)=>{
    const [currentUser, setCurrentUser] = useState(null)
    
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
          setCurrentUser(user);
        });
        return () => unsubscribe();
      }, []);
    

    const createUser = async(email, password, displayName )=>{
        try {
            const  userCredential = await createUserWithEmailAndPassword(firebaseAuth,  email, password)
            await updateProfile(userCredential.user, {
                displayName: displayName
            })
        } catch (error) {
            alert('Signup failed');
            throw error;
        }
    }

   
    const loginUser = async(email, password)=>{
        try {
            await signInWithEmailAndPassword(firebaseAuth, email, password)
            alert('Login success');
        } catch (error) {
            alert(' Login failed');
            throw error;
        }
    }

    const googleLogin = async()=>{
        try {
            return await signInWithPopup(firebaseAuth, googleAuth)
            
        } catch (error) {
            alert('Gettting error whilr login google',  error);
            throw error
        }
    }

    const AddBlog = async(title, blogImage , blogText)=>{
        try {
            const imageref =  ref(firebaseStorage, `uploads/image/${Date.now()}-${blogImage.name}`)
            const uploadResult = await uploadBytes(imageref, blogImage)
            const date = new Date()
            return await addDoc(collection(firebaseDB, 'blogList'),{
                title,
                imageUrl: uploadResult.ref.fullPath,
                blogText,
                userEmail: currentUser.email,
                userId : currentUser.uid,
                userName: currentUser.displayName,
                userPhoto: currentUser.photoURL,
                createdData:  date.toDateString()
                
            });

            
            
        } catch (error) {
            console.log('error in doc adding', error);
            throw error
        }
    }
    
    const getData = async()=>{
        try {
            return await getDocs(collection(firebaseDB, "blogList"));
            
        } catch (error) {
            console.log('Getting error while getting doc', error);;
            throw error
        }
    }

    const getImageUrl = async(path)=>{
        try {
          return await getDownloadURL(ref(firebaseStorage , path))  
        } catch (error) {
            alert('Getting error while  loading imageURL');
            throw error
        }
    }

    const deleteBlogPost = async (userId, docId, filePath) => {
        try {
            if (currentUser && currentUser.uid === userId) {
            
                await deleteDoc(doc(firebaseDB, 'blogList', docId));
        
                
                const fileRef = ref(firebaseStorage, filePath); 
                
                
                await deleteObject(fileRef);
        
                alert('Post and associated file deleted successfully');
            } else {
                alert('Not authorized to delete this post');
            }
        } catch (error) {
            alert('Error while deleting blog post or file');
            console.error('Error:', error);
            throw error;
        }
    };

    const logOutUser = async ()=>{
        try {
            await signOut(firebaseAuth)
            alert('log out successfuly')
        } catch (error) {
            alert('etting error while logout');
            throw error
        }
    }
    

    

    return(
        <firebaseContext.Provider value={{createUser , googleLogin ,currentUser, getData, loginUser , AddBlog , getImageUrl, deleteBlogPost , logOutUser}} >
            {props.children}
        </firebaseContext.Provider>
    )
}