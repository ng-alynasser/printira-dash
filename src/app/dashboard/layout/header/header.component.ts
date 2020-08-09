import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NbSidebarService, NbMenuService } from "@nebular/theme";
import { LayoutService } from "../services/layout.service";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  arrow = "arrowhead-left-outline";
  logoDisplay = "inline";
  asideStatus: "expanded" | "compact";

  constructor(
    private readonly router: Router,
    private readonly sidebarService: NbSidebarService,
    private readonly layoutService: LayoutService,
    private readonly menuService: NbMenuService,
    private readonly authService: AuthService
  ) {
    this.asideStatus = "expanded";
  }

  navigateHome(): void {
    this.menuService.navigateHome();
  }

  toggleSidebar() {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    switch (this.asideStatus) {
      case "expanded":
        this.logoDisplay = "none";
        this.arrow = "arrowhead-right-outline";
        this.asideStatus = "compact";
        break;

      case "compact":
        this.logoDisplay = "inline";
        this.arrow = "arrowhead-left-outline";
        this.asideStatus = "expanded";
    }

    return false;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(["auth", "login"]);
  }
}
