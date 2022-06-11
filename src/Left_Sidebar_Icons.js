import React from 'react'
import './Left_Sidebar_Icons.css'

function Left_Sidebar_Icons({name,Icons}) {
    return (
        <div className="Sidebar_Icons">
           <Icons className="icon"/> 
           <div className="name">{name}</div>
        </div>
    )
}

export default Left_Sidebar_Icons


// import React from 'react'
// import './Left_Sidebar_Icons.css'
// import { Link } from 'react-router-dom';

// function Left_Sidebar_Icons({name,Icons}) {
//     return (
//         <div className="Sidebar_Icons">
//             {/* {name=='Profile'?<h1>Profile hai</h1>:null} */}
//             {name=='Profile'
//             ?
//                 <>
//                     <Link to={`/profile/`} >
//                         <Icons className="icon"/> 
//                         <div className="name">{name}</div>
//                     </Link>
//                 </>
//             :
//                 <>
//                         <Icons className="icon"/> 
//                         <div className="name">{name}</div>
//                 </>
//             }
          
//         </div>
//     )
// }

// export default Left_Sidebar_Icons
