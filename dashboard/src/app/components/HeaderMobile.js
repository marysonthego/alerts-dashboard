import React, {useMemo} from "react";
import {Link} from "react-router-dom";
import objectPath from "object-path";
import SVG from "react-inlinesvg";
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
        {/*begin::Header Mobile*/}
        <div
            id="kt_header_mobile"
            className={`header-mobile align-items-center ${layoutProps.headerMobileCssClasses}`}
            {...layoutProps.headerMobileAttributes}
        >
          {/*begin::Logo*/}
          <Link to="/">
            <img alt="logo" src={layoutProps.headerLogo}/>
          </Link>
          {/*end::Logo*/}

          {/*begin::Toolbar*/}
          
            {layoutProps.headerMenuSelfDisplay && (
                <>
                  {/*begin::Header Menu Mobile Toggle*/}
                  <button className="btn p-0 burger-icon ml-4" id="kt_header_mobile_toggle">
                    <span/>
                  </button>
                  {/*end::Header Menu Mobile Toggle*/}
                </>
            )}

        
          </div>
          {/*end::Toolbar*/}
      </>
  );
}
