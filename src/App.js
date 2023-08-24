
import { Home, Login, Public,Personal,Album} from './pages/public/'
import { Routes,Route } from 'react-router-dom';
import path from './ultis/path';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux'
import * as actions from './store/actions'
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.getHome())
  }, [])

  return (
  <>
    <div className="">
    <Routes>
          <Route path={path.PUBLIC} element={<Public />} >
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.MY_MUSIC} element={<Personal />} />
            <Route path={path.ALBUM_TITLE_PID} element={<Album />} />

        
            <Route path={path.STAR} element={<Home />} />
          </Route>
        </Routes>
    </div>
  </>
  )
  }

export default App;
