import React, { useMemo } from "react";
import objectPath from "object-path";
import { useHtmlClassService } from "app/components/layout/MetronicLayout";
import { HeaderMenuWrapper } from "app/components/layout/HeaderMenuWrapper";
import AnimateLoading from "app/helpers/AnimateLoading";

export function Header () {
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      headerLogo: uiService.getStickyLogo(),
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
    <div
      className={ `header ${layoutProps.headerClasses}` }
      id="kt_header"
      { ...layoutProps.headerAttributes }
    >

      <div className={ ` ${layoutProps.headerContainerClasses} d-flex align-items-stretch justify-content-between` }>
        <AnimateLoading />
        { layoutProps.menuHeaderDisplay && <HeaderMenuWrapper /> }
        { !layoutProps.menuHeaderDisplay && <div /> }
      </div>
    </div>
  );
}
