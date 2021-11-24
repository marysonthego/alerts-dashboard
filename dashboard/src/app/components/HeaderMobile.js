import React, {useMemo} from "react";
import {Link} from "react-router-dom";
import objectPath from "object-path";
import {useHtmlClassService} from "app/components/layout/MetronicLayout";

export function HeaderMobile() {
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      headerLogo: uiService.getStickyLogo(),
      asideDisplay: objectPath.get(uiService.config, "aside.self.display"),
      headerMenuSelfDisplay:
          objectPath.get(uiService.config, "header.menu.self.display") === true,
      headerMobileCssClasses: uiService.getClasses("header_mobile", true),
      headerMobileAttributes: uiService.getAttributes("header_mobile")
    };
  }, [uiService]);

  return (
      <>
        <div
            id="kt_header_mobile"
            className={`header-mobile align-items-center ${layoutProps.headerMobileCssClasses}`}
            {...layoutProps.headerMobileAttributes}>
          <Link to="/">
            <img alt="logo" src={layoutProps.headerLogo}/>
          </Link>
          
          {layoutProps.headerMenuSelfDisplay && (
              <>
                <button className="btn p-0 burger-icon mr-8" id="kt_header_mobile_toggle">
                  <span/>
                </button>
              </>
          )}
        </div>
      </>
  );
}
