import { ErrorHandler, Injectable, Injector, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../shared/services/error.service';
import { NotificationService } from '../../shared/services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    private injector = inject(Injector);
 

    handleError(error: Error | HttpErrorResponse) {
        const errorService = this.injector.get(ErrorService);
        const notifier = this.injector.get(NotificationService);
    
        let message;
        
        if (error instanceof HttpErrorResponse) {
          message = errorService.getServerErrorMessage(error);
          notifier.showError(message);
        }

    }

}