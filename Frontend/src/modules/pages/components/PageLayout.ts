import Header from "./Header.ts";
import MainNav from "./MainNav.ts";
import Sidebar from "./Sidebar.ts";
import UserNoticeboard from "./UserNoticeboard.ts";
import { generateDropdowns } from "../../utilities/dropdownUtils.ts";


export default class PageLayout{

  private sidebar: HTMLElement;

  constructor(){}   

  public async create(main: HTMLElement):Promise<void>{
    const dropdowns = await generateDropdowns();
    this.sidebar = Sidebar.create([await UserNoticeboard.create()])

    document.body.append(
      await Header.create(),
      MainNav.create(dropdowns),
      main, 
      this.sidebar
    );
  }

  public async populateSideBar(itemsArr: HTMLElement[]):Promise<void>{

  }
}