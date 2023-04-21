import "./App.css";
//import Header from "./components/header/Header";
//import Post from "./components/posts/Post";
//IMPORTING REACT-ROUTER-DOM
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import IndexPage from "./pages/indexpage/IndexPage";
import LoginPage from "./pages/loginpage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import { UserContextProvider } from "./context api/UserContext";
import AddPost from "./pages/addpost/AddPost";
import PostPage from "./pages/postpage/PostPage";

function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<IndexPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/create" element={<AddPost />} />
              <Route path="/post/:id" element={<PostPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
