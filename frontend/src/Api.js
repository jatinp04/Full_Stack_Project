import axios from "axios";


export default axios.create(
    {
        baseURL:`https://notesbackend-e2jf.onrender.com/api/v1`
    }
)


