import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [saldo, setSaldo] = useState(0);
  const [loading, setLoading] = useState(true);

  // Recebe agora o campo convite (pode ser código influencer ou código convite)
  const register = async (email, password, nome, convite = "") => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (nome) {
      await updateProfile(userCredential.user, { displayName: nome });
    }

    // Por defeito, user normal
    let role = "user";
    let codigoInfluencer = "";
    let saldoBonus = 0;

    // Se o código de convite começar por INF- ou tiver lógica personalizada
    if (convite && convite.trim()) {
      if (convite.startsWith("INF-")) {
        role = "influencer";
        codigoInfluencer = convite.trim();
        saldoBonus = 5;
      } else {
        // Código de convite normal (não influencer)
        saldoBonus = 5;
      }
    }

    // Guardar o user no Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      nome,
      email,
      role,
      codigoInfluencer,
      saldo: saldoBonus,
      criadoEm: new Date().toISOString(),
    });

    return userCredential.user;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  // Subscrição ao user e ao saldo do Firestore
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        const ref = doc(db, 'users', user.uid);
        // Atualiza em tempo real sempre que o saldo mudar no Firestore
        const unsubscribeSaldo = onSnapshot(ref, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setSaldo(Number(data.saldo) || 0);
          } else {
            setSaldo(0);
          }
        });
        // Cleanup ao sair
        return () => unsubscribeSaldo();
      } else {
        setSaldo(0);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, saldo, register, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
