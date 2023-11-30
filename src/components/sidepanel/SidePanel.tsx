import Menu from "@/components/sidepanel/menu/Menu";
import Library from "@/components/sidepanel/library/Library";

interface ISideMenuState {

}

interface ISideMenuProps {
  renderMode: ISideMenuRenderMode
}

export enum ISideMenuRenderMode {
  Thin,
  Wide
}

export default function SidePanel(props: ISideMenuProps) {
  return (
    <>
      <Menu></Menu>
      <Library></Library>
    </>
  )
}