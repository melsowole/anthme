import Header from "./Header.js";
import MainNav from "./MainNav.js";
import Sidebar from "./Sidebar.js";
import UserNoticeboard from "./UserNoticeboard.js";
import { generateDropdowns } from "../../utilities/dropdownUtils.js";


export default class PageLayout{

  private sidebar: HTMLElement;
  private sidebarContentContainer: HTMLElement;
  private userNoticeboard: HTMLElement;

  constructor(){}   

  public async create(main: HTMLElement):Promise<void>{
    const dropdowns = await generateDropdowns();
    this.userNoticeboard = await UserNoticeboard.create();
    this.sidebar = Sidebar.create([this.userNoticeboard]);
    this.sidebarContentContainer = this.sidebar.querySelector(".sidebar") as HTMLElement;

    document.body.append(
      await Header.create(),
      MainNav.create(dropdowns),
      main, 
      this.sidebar
    );

  }

  public repopulateSideBar(itemsArr: HTMLElement[]):void{
    this.clearSidebar();

    this.populateSidebar(itemsArr);

  }

  public populateSidebar(itemsArr: HTMLElement[]) :void{
    for (const item of itemsArr) {
      this.sidebarContentContainer.append(item);
    }
  }

  private clearSidebar(){
    this.sidebarContentContainer.innerHTML = "";
  }
}