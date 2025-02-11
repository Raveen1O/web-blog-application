import './App.css';
import BlogList from './components/BlogList.jsx';
import Header from './components/Header.jsx';
import {Routes,Route} from "react-router-dom";
import Layout from './components/Layout.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import UserContextProvider from './components/UserContext.jsx';
import CreatePost from './components/CreatePost.jsx'
import BlogPage from './components/BlogPage.jsx';
import EditPost from './components/EditPost.jsx'

function App() {
  return (

    <UserContextProvider>
      <Routes>
        <Route path={'/'} element={
          <Layout></Layout>
        }>
          <Route index element={
            <BlogList></BlogList>
        }/>
        <Route path={'/edit/:id'} element={
          <EditPost></EditPost>
        }></Route>
        <Route path={'/login'} element={
          <Login></Login>
        }
        >
        </Route>
        <Route path={'/create'} element={
          <CreatePost> </CreatePost>
        } />
        <Route path = "/post/:id" element={
          <BlogPage></BlogPage>
        } />
        <Route path={'/register'} element={
          <Register></Register>
        }
        >

        </Route>
        </Route>
        
      </Routes>
    </UserContextProvider>

  );
}

export default App;
