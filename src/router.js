import { createBrowserRouter } from "react-router-dom";
import Encrypt from "./Encrypt";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Encrypt />
    },
    {
        path: "/encrypt",
        element: <div>encrypt</div>,
        children: [
            {
                path: "/encrypt/publickey",
                element: <div>encrypt public key</div>
            }
        ]
    }
]);

export default router;