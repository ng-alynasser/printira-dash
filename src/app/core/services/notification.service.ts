import { Injectable } from "@angular/core";
import {
  NbToastrService,
  NbGlobalPosition,
  NbGlobalPhysicalPosition,
} from "@nebular/theme";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private toasterService: NbToastrService) {
    this.config = {
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
  }

  config: any;

  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;

  error(message: string) {
    return this.toasterService.danger(message, "An error occured", this.config);
  }

  success(message: string) {
    return this.toasterService.success(message, "Success", this.config);
  }

  info(message: string) {
    return this.toasterService.info(message, "Information", this.config);
  }
}
