import axios from "axios";

const Instance=axios.create({
    // Create: will create base url for all api end points...so we can easily append endpoints to it
    baseURL:'https://api.themoviedb.org/3'
});

 
export default Instance;