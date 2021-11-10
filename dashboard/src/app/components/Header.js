import React, {useMemo} from "react";
import objectPath from "object-path";
import {useHtmlClassService} from "app/components/layout/MetronicLayout";
import {Topbar} from "app/components/Topbar";
import {HeaderMenuWrapper} from "app/components/layout/HeaderMenuWrapper";
import AnimateLoading from "app/helpers/AnimateLoading";

export function Header() {
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      headerClasses: uiService.getClasses("header", true),
      headerAttributes: uiService.getAttributes("header"),
      headerContainerClasses: uiService.getClasses("header_container", true),
      menuHeaderDisplay: objectPath.get(
        uiService.config,
        "header.menu.self.display"
      )
    };
  }, [uiService]);

  return (
    <>
      {/*begin::Header*/}
      <div
        className={`header ${layoutProps.headerClasses}`}
        id="kt_header"
        {...layoutProps.headerAttributes}
      >
        {/*begin::Container*/}
        <div className={` ${layoutProps.headerContainerClasses} d-flex align-items-stretch justify-content-between`}>
          <AnimateLoading />
          {/*begin::Header Menu Wrapper*/}
          {layoutProps.menuHeaderDisplay && <HeaderMenuWrapper />}
          {!layoutProps.menuHeaderDisplay && <div />}
          {/*end::Header Menu Wrapper*/}

          {/*begin::Topbar*/}
          <Topbar />
          {/*end::Topbar*/}
        </div>
        {/*end::Container*/}
      </div>
      {/*end::Header*/}
    </>
  );
}
