import {Routes, Route} from 'react-router-dom';

import {HomePage} from './pages/HomePage';
import {SignUpPage} from './pages/SignUpPage';
import {SignInPage} from './pages/SignInPage';
import {SignOutPage} from './pages/SignOutpage';
import {RecipesPage} from './pages/RecipesPage';

import {Layout} from './components/Layout';
import { RequireAuth } from './hoc/RequireAuth';

import './App.css';

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="signup/" element={<SignUpPage />} />
          <Route path="signin/" element={<SignInPage />} />
          <Route path="auth/*" element={
            <RequireAuth>
              <Routes>
              <Route path="recipes" element={<RecipesPage />} />
              <Route path="signout" element={<SignOutPage />} />
              </Routes>
            </RequireAuth>
          } />
        </Route>
      </Routes>
    </>
  );
}

export default App;