
export const LIGHT_COLOR = "#E9E2CF"
export const DARK_COLOR = "#5A7262"
export const ADD_ITEM_TO_CART_LOG = 'ADD_ITEM_CART'
export const LOGOUT_LOG = "LOGOUT"
export const Options = [
    {label:'Home',key:'', },
    {label:'Best Sellers',key:'best-sellers', },
    {label:'Favorites',key:'favorites' },
    {label:'Newsletter',key:'Newsletter' },
]

export const CATEGORIES_OPTIONS = [
    'Open Source','Mobile','Java','Software Engineering','Internet','Web Development','Miscellaneous','Microsoft .NET','Microsoft','Next Generation Databases','PowerBuilder','Client-Server','Computer Graphics','Object-Oriented Programming','S','Networking','Theory','Programming','Python','Mobile Technology','Business','P','XML','Perl','java','Microsoft/.NET','Miscella','Object-Technology Programming','internet','.NET','Algorithmic Art','PHP','SOA','Computer Graph','Client Server','In Action','Software Development'
]

export const centerObjectCSS = {
    display:'flex', 
    alignItems:'center', 
    justifyContent:'center'
}

export const ADMIN_COLUMNS = [
    {
        label: "Activity type",
        key: "type"
    },
    {
        label: "User Id",
        key: "id"
    },
    {
        label: "Time",
        key: "time"
    },
]

export const ADMIN_TITLES = {
    title: "Title",
    pageCount: "Price",
    thumbnailUrl: "Image URL",
    shortDescription: "Short description",
    longDescription: "Long description",
    authors: "Authors",
    categories: "Categories"
}

export const ADMIN_ITEM_SKELETON = {
    title: "",
    pageCount: "",
    thumbnailUrl: "",
    shortDescription: "",
    longDescription: "",
    authors: [],
    categories: [],
}
