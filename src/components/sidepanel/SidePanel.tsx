import Menu from "@/components/sidepanel/menu/Menu";
import Library from "@/components/sidepanel/library/Library";

interface ISideMenuState {

}

export default function SidePanel() {
  return (
    <>
      <Menu></Menu>
      <Library></Library>
    </>
  )
}