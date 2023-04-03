import React from 'react';
import { useState, useEffect, Suspense, lazy } from 'react';
import { fetchUsers } from '../Api/Api';

const Header = lazy(() => import('../components/Header/Header'));
const Hero = lazy(() => import('../components/Hero/Hero'));
const Partners = lazy(() => import('../components/Partners/Partners'));
const PostForm = lazy(() => import('../components/PostForm/PostForm'));

export default function MainPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadPartners = async () => {
      try {
        const res = await fetchUsers(page);
        const users = res.users;
        setUsers(users);
      } catch (error) {
        console.log('error', error);
      }
    };
    loadPartners();
  }, [page]);

  const postUsers = users => {
    setUsers(users);
    setPage(1);
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <main className="main">
          <Hero />
          <Partners partners={users} setPage={setPage} page={page} />
          <PostForm postUsers={postUsers} />
        </main>
      </Suspense>
    </>
  );
}
