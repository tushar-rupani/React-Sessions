import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Users } from './components/Users';
import { Post } from './components/Post';
import {UserPosts} from './components/UserPosts'
import { ValidationForm } from './components/ValidationForm';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='users' element={<Users />} />
        <Route path='users-posts' element={<UserPosts />} />
        <Route path='posts' element={<Post />} />
        <Route path='validation' element={<ValidationForm />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
