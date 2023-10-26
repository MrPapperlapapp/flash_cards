import {Provider} from 'react-redux'

import {Router} from '@/app/router/routerConfig.tsx'
import {store} from '@/app/store/store.ts'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css'

export function App() {
    return (
        <Provider store={store}>
            <>
                <Router/>
                <ToastContainer
                    limit={1}
                    position={'top-center'}/>
            </>
        </Provider>
    )
}
