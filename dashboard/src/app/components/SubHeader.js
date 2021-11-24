/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useMemo, useLayoutEffect, useEffect} from "react";
import objectPath from "object-path";
import {useLocation} from "react-router-dom";
//import {QuickActions} from "app/components/QuickActions";
//import {BreadCrumbs} from "app/components/BreadCrumbs";
import { Button } from '@material-ui/core';
import {getBreadcrumbsAndTitle, useSubheader} from "app/components/layout/MetronicSubheader";
import {useHtmlClassService} from "app/components/layout/MetronicLayout"

export function SubHeader() {
  const uiService = useHtmlClassService();
  const location = useLocation();
  const subheader = useSubheader();

  const layoutProps = useMemo(() => {
    return {
      config: uiService.config,
      subheaderMobileToggle: objectPath.get(
          uiService.config,
          "subheader.mobile-toggle"
      ),
      subheaderCssClasses: uiService.getClasses("subheader", true),
      subheaderContainerCssClasses: uiService.getClasses(
          "subheader_container",
          true
      )
    };
  }, [uiService]);

  useLayoutEffect(() => {
    const aside = getBreadcrumbsAndTitle("kt_aside_menu", location.pathname);
    const header = getBreadcrumbsAndTitle("kt_header_menu", location.pathname);
    const breadcrumbs = (aside && aside.breadcrumbs.length > 0) ? aside.breadcrumbs : header.breadcrumbs;
    subheader.setBreadcrumbs(breadcrumbs);
    subheader.setTitle((aside && aside.title && aside.title.length > 0) ? aside.title : header.title);
    // eslint-disable-next-line
  }, [location.pathname]);

  // Do not remove this useEffect, need from update title/breadcrumbs outside (from the page)
  useEffect(() => {}, [subheader]);

  return (
      <div
          id="kt_subheader"
          className={`subheader py-2 py-lg-4   ${layoutProps.subheaderCssClasses}`}
      >
        <div
            className={`${layoutProps.subheaderContainerCssClasses} d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap`}
        >

            <div className="d-flex align-items-baseline mr-5">
              <h5 className="text-dark font-weight-bold my-2 mr-5">
                <>
                  {subheader.title}
                </>
                {/*<small></small>*/}
              </h5>

            </div>


          
          </div>

          {/* Toolbar */}
          <div className="d-flex align-items-center">
            <Button className="btn btn-light btn-sm font-weight-bold" id="kt_dashboard_daterangepicker"
               data-toggle="tooltip" title="Select dashboard daterange" data-placement="left">
              <span className="text-muted font-weight-bold mr-2" id="kt_dashboard_daterangepicker_title">Today</span>
              <span className="font-weight-bold" id="kt_dashboard_daterangepicker_date">{new Date().toDateString()}</span>
            </Button>
          </div>
        </div>
    
  );
}
