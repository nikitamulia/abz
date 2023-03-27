import React from 'react';
import { useState, useEffect } from 'react';
import { fetchUsers } from '../Api/Api';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Partners from '../components/Partners/Partners';
import Form from '../components/Form/Form';

export default function MainPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadPartners = async () => {
      try {
        const res = await fetchUsers();
        const users = res.users;
        setUsers(users);
      } catch (error) {
        console.log('error', error);
      }
    };
    loadPartners();
  }, []);

  return (
    <div>
      <Header />
      <main className="main">
        <Hero />
        <Partners partners={users} />
        <Form />
      </main>
    </div>
  );
}
