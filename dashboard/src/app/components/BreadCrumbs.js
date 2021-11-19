/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Fragment} from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export function BreadCrumbs({ items }) {
  if (!items || !items.length) {
    return "";
  }

  return (
    null
    // <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-2" key={`ul01`}>
    //   <li className="breadcrumb-item" key={`li01`}>
    //     <Link to="/dashboard">
    //       <i className="flaticon2-shelter text-muted icon-1x" />
    //     </Link>
    //   </li>
    //   <li className="breadcrumb-item" key={`li02`}>
    //     <Link to="/user-profile">
    //       <i className="flaticon2-shelter text-muted icon-1x" />
    //     </Link>
    //   </li>  
    //   <li className="breadcrumb-item" key={`li03`}>
    //     <Link to="/locations-list">
    //       <i className="flaticon2-shelter text-muted icon-1x" />
    //     </Link>
    //   </li>  
    //   {items.map((item, index) => (
    //     <Fragment key={`frag${index}`}>
    //       <li key={`li${index}`}>
    //         <ArrowForwardIosIcon key={`arrow${index}`}
    //           style={{ width: '16px', height: '16px'}}
    //           className="mt-1 text-muted font-weight-bold font-size-md mb-2"
    //         />
    //       </li>
    //       <li key={`bc${index}`} className="breadcrumb-item">
    //         <Link key={`link${index}`} className="text-muted" to={{ pathname: item.pathname }}>
    //           {item.title} 
    //         </Link>
    //       </li>
    //     </Fragment>
    //   ))}
    // </ul>
  );
}
